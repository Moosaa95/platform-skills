from django.contrib.auth import get_user_model
from django.core import exceptions
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


from rest_framework import serializers

from accounts.models import (
    OTPVerification
)

from accounts.tasks import send_otp_email_task
from apps.accounts.enums import UserRoles
# from djoser.serializers import UserCreateSerializer as DjoserUserCreateSerializer
# from .models import UserProfile

User = get_user_model() #dynamically fetches the user model (whether default or custom)


class UserCreateSerializer(serializers.Serializer):
    email = serializers.EmailField(help_text="User's email address")
    password = serializers.CharField(help_text="User's password", write_only=True)
    first_name = serializers.CharField(help_text="User's first name")
    last_name = serializers.CharField(help_text="User's last name")
    role = serializers.ChoiceField(choices=UserRoles, help_text="User's role")

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'first_name', 'last_name', 'role')
        read_only_fields = ('email', 'role')


class ResendOTPSerializer(serializers.Serializer):
    """
    Serializer to resend OTP to the user's email.
    """
    email = serializers.EmailField()

    def validate(self, data):
        """
        Validate email and resend a new OTP.
        """
        email = data.get("email")

        try:
            otp_instance = OTPVerification.objects.select_related("user").get(user__email=email)
        except OTPVerification.DoesNotExist:
            raise serializers.ValidationError("User not found or OTP not generated.")

        
        if otp_instance.is_verified:
            raise serializers.ValidationError("User is already verified.")
        
        if not OTPVerification.can_resend_otp(otp_instance.user):
            raise serializers.ValidationError("You can request a new OTP in 2 minutes.")


        new_otp = OTPVerification.generate_otp(otp_instance.user)

        send_otp_email_task(otp_instance.user, new_otp)

        return {"message": "A new OTP has been sent to your email."}
    

class VerifyOTPSerializer(serializers.Serializer):
    """
    Serializer to verify OTP and activate user account.
    """
    email = serializers.EmailField()
    otp = serializers.CharField(max_length=6)

    def validate(self, data):
        """
        Validate OTP and activate the user if correct.
        """
        email = data.get("email")
        otp = data.get("otp")

        try:
            user_otp = OTPVerification.get_user_otp(email=email)
        except OTPVerification.DoesNotExist:
            raise serializers.ValidationError("User not found or OTP not generated.")

        success, message = OTPVerification.verify_otp(user_otp.user, otp)

        if not success:
            raise serializers.ValidationError(message)

        return {"message": message}
    

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """
    Custom token serializer that ensures tokens are only issued if the user is verified.
    """
    def validate(self, attrs):
        data = super().validate(attrs)
        
        # Fetch user verification status from OTPVerification model
        if not hasattr(self.user, "otp_verification") or not self.user.otp_verification.is_verified:
            raise serializers.ValidationError("User is not verified. Please verify your account using the OTP sent to your email.")
        
        return data


class ApproveSkilledUserSerializer(serializers.Serializer):
    """
    Serializer for approving skilled users.
    """
    id = serializers
    class Meta:
        model = User
        fields = ["id", "is_approved"]

    def update(self, instance, validated_data):
        if instance.role != "skilled_user":
            raise serializers.ValidationError("Only skilled users can be approved.")

        if instance.is_approved:
            raise serializers.ValidationError("User is already approved.")

        instance.is_approved = True
        instance.save(update_fields=["is_approved"])

        otp = OTPVerification.generate_otp(instance)
        send_otp_email_task.delay(instance.email, instance.first_name, otp)

        return instance



class PasswordResetRequestSerializer(serializers.Serializer):
    """
    Serializer for requesting an OTP-based password reset.
    """
    email = serializers.EmailField()

    def validate_email(self, value):
        """
        Check if user exists and send OTP.
        """
        user = User.objects.get(email=value)
        if not user:
            raise serializers.ValidationError("No user found with this email.")

        #  Generate OTP for password reset
        otp = OTPVerification.generate_otp(user)
        send_otp_email_task.delay(user.email, user.first_name, otp)
        return value


class PasswordResetVerifySerializer(serializers.Serializer):
    """
    Serializer for verifying OTP and setting a new password.
    """
    email = serializers.EmailField()
    otp = serializers.CharField(max_length=6)
    new_password = serializers.CharField(write_only=True)

    def validate(self, data):
        """
        Validate OTP and reset password.
        """
        user = User.objects.filter(email=data["email"]).first()
        if not user:
            raise serializers.ValidationError("User not found.")

        otp_instance = OTPVerification.get_user_otp(email=user.email)

        if not otp_instance or otp_instance.otp != data["otp"]:
            raise serializers.ValidationError("Invalid or expired OTP.")

        #  Reset password
        user.password = make_password(data["new_password"])
        user.save(update_fields=["password"])

        #  Clear OTP after successful reset
        otp_instance.otp = None
        otp_instance.is_verified = True
        otp_instance.save(update_fields=["otp", "is_verified"])

        return data