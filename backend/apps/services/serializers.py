from rest_framework import serializers
from .models import Category, Skill

class CategorySerializer(serializers.ModelSerializer):
    """
    Serializer for the Category model.
    """
    class Meta:
        model = Category
        fields = ["id", "name"]


class SkillSerializer(serializers.ModelSerializer):
    """
    Serializer for the Skill model.
    """
    category = CategorySerializer(read_only=True)  # ✅ Show category details
    category_id = serializers.IntegerField(write_only=True)  # ✅ Allow setting category by ID

    class Meta:
        model = Skill
        fields = ["id", "name", "category", "category_id"]
