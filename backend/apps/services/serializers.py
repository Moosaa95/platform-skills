from commons.validators import validate_amount
from rest_framework import serializers

# class CategorySerializer(serializers.ModelSerializer):
#     """
#     Serializer for the Category model.
#     """
#     class Meta:
#         model = Category
#         fields = ["id", "name"]


# class SkillSerializer(serializers.ModelSerializer):
#     """
#     Serializer for the Skill model.
#     """
#     category = CategorySerializer(read_only=True)  # ✅ Show category details
#     category_id = serializers.IntegerField(write_only=True)  # ✅ Allow setting category by ID

#     class Meta:
#         model = Skill
#         fields = ["id", "name", "category", "category_id"]

class SkillSerializer(serializers.Serializer):
    id = serializers.UUIDField(read_only=True)
    name = serializers.CharField(max_length=100)
    code = serializers.CharField(max_length=10)


class ServiceSerializer(serializers.Serializer):
    id = serializers.UUIDField(read_only=True)
    # expert_id = serializers.UUIDField()
    skill_id = serializers.UUIDField()
    title = serializers.CharField()
    description = serializers.CharField()
    price = serializers.DecimalField(max_digits=10, decimal_places=2, validators=[validate_amount])
    # is_active = serializers.BooleanField(default=False, required=False)


class ServiceRequestSerializer(serializers.Serializer):
    id = serializers.UUIDField()
    client_id = serializers.UUIDField()
    expert_id = serializers.UUIDField()
    service_id = serializers.UUIDField()
    service_title = serializers.CharField()  
    expert_name = serializers.CharField()  
    service_description = serializers.CharField()
    agreed_price = serializers.DecimalField(max_digits=10, decimal_places=2)
    end_date = serializers.DateField()
    status = serializers.CharField()
    created_at = serializers.DateTimeField()

    def validate_agreed_price(self, value):
        """Ensure the agreed price is valid."""
        if value <= 0:
            raise serializers.ValidationError("Agreed price must be positive.")
        return value