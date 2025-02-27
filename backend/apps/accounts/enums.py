from django.db import models

class UserRoles(models.TextChoices):
    """Defines the different user roles in the system."""
    NORMAL_USER = "normal", "Normal User"
    SKILLED_USER = "skilled", "Skilled User"
    STAFF = "staff", "Staff"
    ADMIN = "admin", "Admin"