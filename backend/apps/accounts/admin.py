from django.contrib import admin
from .models import (
        CustomUser, Country, 
        State, UserProfile,
        OTPVerification,
        SkilledUserProfile
    )

# Register your models here.

@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ['email', 'is_staff', 'is_active', 'is_superuser']
    search_fields = ['email']
    list_filter = ['is_staff', 'is_active', 'is_superuser']
    ordering = ['email']
    filter_horizontal = []

    # actions = ["approve_skilled_users"]

    # def approve_skilled_users(self, request, queryset):
    #     """
    #     Admin action to approve selected skilled users and trigger OTP sending.
    #     """
    #     for user in queryset:
    #         if user.role == "skilled_user" and not user.is_approved:
    #             user.is_approved = True
    #             user.save(update_fields=["is_approved"])

    #             # ✅ Generate OTP and send via email
    #             # otp = OTPVerification.generate_otp(user)
    #             # send_otp_email_task.delay(user.email, user.first_name, otp)

    #     self.message_user(request, "Selected skilled users have been approved and OTP sent.")
    
    # approve_skilled_users.short_description = "Approve skilled users and send OTP"

@admin.register(Country)
class CountryAdmin(admin.ModelAdmin):
    list_display = ['name', 'code']
    search_fields = ['name', 'code']
    ordering = ['name']

@admin.register(State)
class StateAdmin(admin.ModelAdmin):
    list_display = ['name', 'code', 'country']
    search_fields = ['name', 'code', 'country']
    ordering = ['name']


@admin.register(UserProfile)
class UserProfile(admin.ModelAdmin):
    list_display = ['user', 'phone_number', 'address', 'date_of_birth']
    search_fields = ['user', 'phone_number', 'address', 'date_of_birth']
    ordering = ['user']
    filter_horizontal = [] # This is used to display many-to-many fields in a horizontal manner.


@admin.register(OTPVerification)
class OTPVerificationAdmin(admin.ModelAdmin):
    list_display = ['user', 'otp', 'is_verified', 'created_at']
    search_fields = ['user', 'otp', 'is_verified', 'created_at']
    ordering = ['user']
    filter_horizontal = []


@admin.register(SkilledUserProfile)
class SkilledUserProfileAdmin(admin.ModelAdmin):
    list_display = ['user']
    search_fields = ['user']
    ordering = ['user']
    filter_horizontal = []