from django.db import models

# Create your models here.
class Category(models.Model):
    """
    Represents a category for grouping related skills.
    Example: "Development", "Design", "Marketing"
    """
    name = models.CharField(max_length=100, unique=True, db_index=True)
    code = models.CharField(max_length=10, unique=True, db_index=True)

    def __str__(self):
        return self.name


class Skill(models.Model):
    """
    Represents a predefined skill in the platform.
    """
    name = models.CharField(max_length=100, unique=True, db_index=True)  # Example: "Web Development", "Graphic Design"
    # category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="skills", blank=True, null=True)  # ✅ Links skill to a category
    code = models.CharField(max_length=10, unique=True, db_index=True)

    def __str__(self):
        return f"{self.name} ({self.code})"
