from rest_framework import generics
from .models import  Service, ServiceRequest, Skill
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q
from rest_framework.permissions import AllowAny
from .serializers import ServiceRequestSerializer, ServiceSerializer, SkillSerializer


# class SkillListView(generics.ListCreateAPIView):
#     """
#     API to list and add skills, with category filtering.
#     """
#     queryset = Skill.objects.all()
#     serializer_class = SkillSerializer

#     def get_queryset(self):
#         """
#         Allow filtering skills by category.
#         Example: /api/skills/?category_id=2
#         """
#         queryset = super().get_queryset()
#         category_id = self.request.query_params.get("category_id")
#         if category_id:
#             queryset = queryset.filter(category_id=category_id)
#         return queryset

# class MostPopularSkillsAPIView(APIView):
#     """
#     API endpoint to get most popular skills based on expert count.
#     """
#     def post(self, request):
#         limit = request.data.get('limit', 10)  # Default to top 10 skills

#         try:
#             popular_skills = Skill.most_popular_skills(limit=int(limit))
#             return Response(data=popular_skills, status=status.HTTP_200_OK)
#         except Exception as e:
#             return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class CreateSkill(APIView):
    """
    POST: Create a new skill.
    """
    def post(self, request):
        response_data = dict(status=False)
        serializer = SkillSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)  
        skill = Skill.create_skill(**serializer.validated_data)
        if skill:
            response_data.update(status=True, message="Skill created successfully")
        return Response(data=response_data, status=status.HTTP_201_CREATED)


class SkillUpdate(APIView):
    """
    POST: Update a skill.
    """
    def post(self, request):
        response_data = dict(status=False)
        skill_id = request.data.get("skill_id")
        if not skill_id:
            response_data.update(error="Missing skill_id in request body")
            return Response(data=response_data, status=status.HTTP_400_BAD_REQUEST)

        serializer = SkillSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        updated = Skill.update_skill(skill_id, **serializer.validated_data)
        
        if not updated:
            response_data.update(error="Skill not found")
            return Response(data=response_data, status=status.HTTP_404_NOT_FOUND)
    
        response_data.update(status=True, message="Skill updated successfully")
        return Response(data=response_data, status=status.HTTP_200_OK)


class SkillDelete(APIView):
    """
    POST: Delete a skill.
    """
    def post(self, request):
        response_data = dict(status=False)
        skill_id = request.data.get("skill_id")
        if not skill_id:
            response_data.update(error="Missing skill id in request body")
            return Response(data=response_data, status=status.HTTP_400_BAD_REQUEST)

        deleted = Skill.delete_skill(skill_id)
        if not deleted:
            return Response(data=response_data, status=status.HTTP_404_NOT_FOUND)
        
        response_data.update(status=True, message="Skill deleted successfully")
        return Response(data=response_data, status=status.HTTP_200_OK)
        

class PopularSkills(APIView):
    """
    POST: Retrieve the most popular skills based on the number of experts.
    """
    def post(self, request):
        limit = request.data.get("limit", 10)  # ✅ Default limit is 10 if not provided
        skills = Skill.most_popular_skills(limit=limit)
        return Response(skills, status=status.HTTP_200_OK)


class SkillList(APIView):
    """
    POST: Retrieve a list of all skills.
    """
    permission_classes = [AllowAny]  # Anyone can register
    def post(self, request):
        skills = Skill.list_all_skills()
        print("SKILLS", skills)
        return Response(data={"status":True, "data":skills}, status=status.HTTP_200_OK)


class CreateService(APIView):
    """
    POST: Create a new service.
    """
    def post(self, request):
        serializer = ServiceSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        service = Service.create_service(**serializer.validated_data)
        if service:
            return Response({"status": True, "message": "Service created successfully"}, status=status.HTTP_201_CREATED)

        return Response({"status": False, "error": "Failed to create service"}, status=status.HTTP_400_BAD_REQUEST)


class UpdateService(APIView):
    """
    POST: Update an existing service.
    """
    def post(self, request):
        service_id = request.data.get("service_id")
        if not service_id:
            return Response({"status": False, "error": "Missing service_id in request body"}, status=status.HTTP_400_BAD_REQUEST)

        serializer = ServiceSerializer(data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)

        updated = Service.update_service(service_id, **serializer.validated_data)
        if updated:
            return Response({"status": True, "message": "Service updated successfully"}, status=status.HTTP_200_OK)

        return Response({"status": False, "error": "Service not found"}, status=status.HTTP_404_NOT_FOUND)


class GetService(APIView):
    """
    POST: Retrieve a specific service by ID.
    """
    def post(self, request):
        service_id = request.data.get("service_id")
        if not service_id:
            return Response({"status": False, "error": "Missing service_id in request body"}, status=status.HTTP_400_BAD_REQUEST)

        service = Service.get_service(service_id)
        if service:
            return Response(ServiceSerializer(service).data, status=status.HTTP_200_OK)

        return Response({"status": False, "error": "Service not found"}, status=status.HTTP_404_NOT_FOUND)


class FetchServices(APIView):
    """
    POST: Retrieve a list of services with optional filters.
    """
    def post(self, request):
        filters = request.data.get("filters", {})
        # serializer.is_valid(raise_exception=True)
        # validated_data = serializer.validated_data
        and_condition = Q()

        if "date" in filters:
            filters["created_at__date"] = filters.pop("date")

        for key, value in filters.items():
            and_condition.add(Q(**{key: value}), Q.AND)

        # accounts = Account.fetch_accounts(filters=and_condition, count=count) if count else Account.fetch_accounts(filters=and_condition)
        # serialized_accounts = AccountSerializer(accounts, many=True).data

        services = Service.fetch_services(filters=and_condition)
        return Response(ServiceSerializer(services, many=True).data, status=status.HTTP_200_OK)


class DeleteService(APIView):
    """
    POST: Delete a service by ID.
    """
    def post(self, request):
        service_id = request.data.get("service_id")
        if not service_id:
            return Response({"status": False, "error": "Missing service_id in request body"}, status=status.HTTP_400_BAD_REQUEST)

        deleted = Service.delete_service(service_id)
        if deleted:
            return Response({"status": True, "message": "Service deleted successfully"}, status=status.HTTP_200_OK)

        return Response({"status": False, "error": "Service not found"}, status=status.HTTP_404_NOT_FOUND)


class ToggleServiceStatus(APIView):
    """
    POST: Toggle a service's active status.
    """
    def post(self, request):
        service_id = request.data.get("service_id")
        if not service_id:
            return Response({"status": False, "error": "Missing service_id in request body"}, status=status.HTTP_400_BAD_REQUEST)

        new_status = Service.toggle_service_status(service_id)
        if new_status is not None:
            return Response({"status": True, "message": f"Service is now {'active' if new_status else 'inactive'}"}, status=status.HTTP_200_OK)

        return Response({"status": False, "error": "Service not found"}, status=status.HTTP_404_NOT_FOUND)
    

class CreateClientServiceRequest(APIView):
    """
    POST: Create a new service request.
    """
    def post(self, request):
        serializer = ServiceRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        service_request = ServiceRequest.create_request(**serializer.validated_data)
        if service_request:
            return Response({"status": True, "message": "Service request created successfully"}, status=status.HTTP_201_CREATED)
        
        return Response({"status": False, "error": "Failed to create request or request already exists"}, status=status.HTTP_400_BAD_REQUEST)


class MarkExpertCompleted(APIView):
    """
    POST: Expert marks a service as completed.
    """
    def post(self, request):
        service_id = request.data.get("service_id")
        if not service_id:
            return Response({"status": False, "error": "Missing service_id"}, status=status.HTTP_400_BAD_REQUEST)

        success = ServiceRequest.mark_expert_completed(service_id)
        if success:
            return Response({"status": True, "message": "Service marked as completed, awaiting client confirmation"}, status=status.HTTP_200_OK)

        return Response({"status": False, "error": "Service request not found or invalid status"}, status=status.HTTP_400_BAD_REQUEST)


class ConfirmService(APIView):
    """
    POST: Client confirms service completion, triggering payment release.
    """
    def post(self, request):
        service_id = request.data.get("service_id")
        if not service_id:
            return Response({"status": False, "error": "Missing service_id"}, status=status.HTTP_400_BAD_REQUEST)

        service_request = ServiceRequest.objects.filter(id=service_id).first()
        if not service_request:
            return Response({"status": False, "error": "Service request not found"}, status=status.HTTP_404_NOT_FOUND)

        success = ServiceRequest.confirm_service(service_request)
        if success:
            return Response({"status": True, "message": "Service confirmed successfully"}, status=status.HTTP_200_OK)

        return Response({"status": False, "error": "Service request could not be confirmed"}, status=status.HTTP_400_BAD_REQUEST)


class AutoConfirmService(APIView):
    """
    POST: Manually triggers auto-confirmation of completed services.
    """
    def post(self, request):
        ServiceRequest.auto_confirm_services()
        return Response({"status": True, "message": "Auto-confirmation triggered"}, status=status.HTTP_200_OK)


