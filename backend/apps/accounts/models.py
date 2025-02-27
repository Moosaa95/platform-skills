# python imports
import datetime
import random

# Django

from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils.timezone import now

# third parties
from cloudinary.models import CloudinaryField

# local
from apps.accounts.manager import CustomUserManager
from apps.services.models import Skill
from commons.mixins import ModelMixin
from .enums import UserRoles
# Create your models here.



class CustomUser(AbstractBaseUser, PermissionsMixin, ModelMixin):
    """
    Custom user model that extends Django's AbstractBaseUser and PermissionsMixin.

    This model replaces Django's default User model and supports:
    - Email-based authentication
    - Role-based user management (Normal User, Skilled User, Staff, Admin)
    - Account approval system for skilled users
    - Cloudinary profile picture storage
    - Foreign key relationships to Country and State

    Attributes:
        email (EmailField): Unique email address used for authentication.
        first_name (CharField): User's first name.
        last_name (CharField): User's last name.
        date_joined (DateTimeField): Timestamp when the user registered.
        is_active (BooleanField): Indicates whether the account is active. Activated via email.
        is_staff (BooleanField): Grants access to staff-level admin functionalities.
        is_superuser (BooleanField): Grants full admin privileges.
        profile_picture (CloudinaryField): Stores the user's profile image on Cloudinary.
        role (CharField): Defines the user's role (Normal, Skilled, Staff, Admin).
        is_approved (BooleanField): Approval flag for skilled users (set by an admin). Only applicable for skilled users.
        country (ForeignKey): Links the user to a country.
        state (ForeignKey): Links the user to a state.

    Methods:
        __str__: Returns the user's email address as a string representation.
    """
     
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    date_joined = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    profile_picture = CloudinaryField('image', null=True, blank=True)
    role = models.CharField(max_length=20, choices=UserRoles.choices, default=UserRoles.NORMAL_USER)
    is_approved = models.BooleanField(default=False)
    country = models.ForeignKey('Country', on_delete=models.SET_NULL, null=True)
    state = models.ForeignKey('State', on_delete=models.SET_NULL, null=True)

    
    objects = CustomUserManager()
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']
    
    def __str__(self):
        return self.email
    


class OTPVerification(ModelMixin):
    """
    Model to store OTP for user verification.
    """
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name="otp_verification")
    otp = models.CharField(max_length=6, blank=True, null=True)
    is_verified = models.BooleanField(default=False)
    last_sent_at = models.DateTimeField(null=True, blank=True)


    @classmethod
    def get_user_otp(cls, email):
        """
        Get the OTP for a given user.
        """
        try:
            user = OTPVerification.objects.select_related("user").get(user__email=email)
            return user
        
        except cls.DoesNotExist:
            return None
        
    @classmethod
    def generate_otp(cls, user):
        """
        Generate a new OTP for a given user. If an OTP already exists, update it.
        """
        otp_instance, created = cls.objects.get_or_create(user=user)
        otp_instance.otp = str(random.randint(100000, 999999))
        otp_instance.created_at = now()  # Update timestamp when OTP is refreshed
        otp_instance.last_sent_at = now()
        otp_instance.save(update_fields=['otp', 'created_at', 'last_sent_at'])
        OTPLog.objects.create(user=user, event_type='sent')
        return otp_instance.otp  # Return the OTP for further processing (e.g., email sending)

    @classmethod
    def is_expired(cls, user, expiry_minutes=10):
        """
        Check if the OTP for a user has expired.
        Default expiration time is 10 minutes.
        """
        try:
            otp_instance = cls.objects.get(user=user)
            expiry_time = otp_instance.created_at + datetime.timedelta(minutes=expiry_minutes)
            return now() > expiry_time
        except cls.DoesNotExist:
            return True  # If no OTP exists, consider it expired

    @classmethod
    def verify_otp(cls, user, otp):
        """
        Verify the OTP for a user and mark them as verified.
        """
        otp_log = OTPLog.create_otp_log(user, 'failed')
        try:
            otp_instance = cls.objects.get(user=user)

            if cls.is_expired(user):
                return False, "OTP has expired."

            if otp_instance.otp != otp:
                
                return False, "Invalid OTP."

            otp_instance.is_verified = True
            otp_instance.otp = None  # Clear OTP after successful verification
            otp_instance.save(update_fields=['is_verified', 'otp'])

            user.is_active = True  # Update user verification status
            user.save(update_fields=['is_active'])
            
            OTPLog.update_otp_log(otp_log.id, 'success')

            return True, "OTP verified successfully."

        except cls.DoesNotExist:
            return False, "OTP not found. Please request a new OTP."

    @classmethod
    def can_resend_otp(cls, user, cooldown_minutes=2):
        """
        Check if the user can request a new OTP.
        """
        otp_log = OTPLog.create_otp_log(user, 'failed')
        try:
            otp_instance = cls.objects.get(user=user)
            if otp_instance.last_sent_at and (now() - otp_instance.last_sent_at).seconds < cooldown_minutes * 60:
                return False  # OTP was sent too recently

            OTPLog.update_otp_log(otp_log.id, 'success')
            return True
        except cls.DoesNotExist:
            return True
        
    def __str__(self):
        return f"OTP for {self.user.email} - Verified: {self.is_verified}"



class UserProfile(ModelMixin):
    """
    UserProfile model extends the CustomUser with additional personal details.

    Attributes:
        user (OneToOneField): Link to the CustomUser.
        phone_number (CharField): Contact number.
        address (TextField): Residential address.
        date_of_birth (DateField): Date of birth.
        bio (TextField, optional): Brief description or portfolio summary.
    """
    user = models.OneToOneField('CustomUser', on_delete=models.CASCADE, related_name="profile")
    phone_number = models.CharField(max_length=20)
    address = models.TextField(blank=True, null=True)
    date_of_birth = models.DateField(blank=True, null=True)
    bio = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.user.email


class SkilledUserProfile(ModelMixin):
    """
    Profile for skilled users (freelancers).
    """
    user = models.OneToOneField("CustomUser", on_delete=models.CASCADE, related_name="freelancer_profile")
    skills = models.ManyToManyField(Skill, related_name="freelancers")  # ✅ Connect freelancer to multiple skills
    experience_years = models.IntegerField(default=0)
    bio = models.TextField(blank=True, null=True)
    rating = models.FloatField(default=0.0)  # ✅ Average rating from client reviews
    completed_jobs = models.PositiveIntegerField(default=0)
    hourly_rate = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    portfolio = models.JSONField(default=list, blank=True, null=True)  # ✅ Store images, links, etc.
    is_profile_complete = models.BooleanField(default=False)  # ✅ Flag to indicate profile completion

    def __str__(self):
        return f"{self.user.email} - {self.rating}⭐"


    def calculate_profile_completion(self):
        """
        Calculate the percentage of profile completion.
        """
        required_fields = ["experience_years", "bio", "hourly_rate"]
        optional_fields = ["portfolio"]
        many_to_many_fields = ["skills"]

        filled_fields = sum(1 for field in required_fields if getattr(self, field))
        filled_fields += sum(1 for field in optional_fields if getattr(self, field))  # Optional but contributes to score
        filled_fields += 1 if self.skills.exists() else 0  # ✅ Check if at least one skill is added

        total_fields = len(required_fields) + len(optional_fields) + len(many_to_many_fields)
        completion_percentage = int((filled_fields / total_fields) * 100)

        return completion_percentage

    def update_profile_completion_status(self):
        """
        Update the profile completion flag based on required fields.
        """
        if self.calculate_profile_completion() == 100:
            self.is_profile_complete = True
        else:
            self.is_profile_complete = False
        self.save(update_fields=["is_profile_complete"])

    def save(self, *args, **kwargs):
        """
        Override save method to update profile completion status automatically.
        """
        self.update_profile_completion_status()
        super().save(*args, **kwargs)
    

# TODO: to be moved to general.modelss
class Country(ModelMixin):
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=10)

    def __str__(self):
        return self.name
    

class State(ModelMixin):
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=10)
    country = models.ForeignKey(Country, on_delete=models.CASCADE)

    def __str__(self):
        return self.name
    

class OTPLog(ModelMixin):
    """
    Log OTP events (sent, verified, failed, etc.).
    """
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    event_type = models.CharField(max_length=50, choices=[('sent', 'Sent'), ('verified', 'Verified'), ('failed', 'Failed')])
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.email} - {self.event_type} at {self.timestamp}"
    

    @classmethod
    def create_otp_log(cls, user, event_type):
        """
        Create a new OTP log entry for the user.
        """
        cls.objects.create(user=user, event_type=event_type)
    
    @classmethod
    def get_otp_logs(cls, user):
        """
        Get all OTP logs for a user.
        """
        return cls.objects.filter(user=user)
    
    @classmethod
    def update_otp_log(cls, otp_log_id, event_type):
        """
        Update the OTP log for a user.
        """
        try:
            otp_log = cls.objects.filter(id=otp_log_id).update(event_type=event_type)
            return otp_log
    
        except cls.DoesNotExist:
            return None