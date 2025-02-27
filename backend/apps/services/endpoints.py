from rest_framework import generics
from .models import Category, Skill
from .serializers import CategorySerializer, SkillSerializer

class CategoryListView(generics.ListCreateAPIView):
    """
    API to list and add categories.
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class SkillListView(generics.ListCreateAPIView):
    """
    API to list and add skills, with category filtering.
    """
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer

    def get_queryset(self):
        """
        Allow filtering skills by category.
        Example: /api/skills/?category_id=2
        """
        queryset = super().get_queryset()
        category_id = self.request.query_params.get("category_id")
        if category_id:
            queryset = queryset.filter(category_id=category_id)
        return queryset
