
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView

from accounts.models import ExpertUserProfile, ClientProfile
from accounts.serializers import  (
    ClientProfilePhotoSerializer,
    ClientProfileSerializer, 
    ClientProfileSetupResponseSerializer, 
    ClientRequestSerializer,
    ExpertDetailRequestSerializer,
    ExpertFilterRequestSerializer,
    ExpertProfileSetupResponseSerializer,
    ExpertUserProfileSerializer, 
    UploadClientProfilePhotoSerializer, 
)
from django.db.models import Q


# CLIENT

class GetClientProfileView(APIView):
    

    def post(self, request):
        data = dict(status=False, message="can get user")
        serializer = ClientRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        validated_data = serializer.validated_data
        client_detail = ClientProfile.get_client_profile(**validated_data, obj=True)
        if client_detail:
            data.update(status=True, message="User Found")

        serializer = ClientProfileSetupResponseSerializer(client_detail)
        return Response(serializer.data)


class UpdateClientProfileView(APIView):
    
    
    def post(self, request):
        """Update client profile details."""
        response_data = dict(status=False)
        serializer = ClientProfileSerializer(data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)

        validated_data = serializer.validated_data

        client_id = validated_data.pop("client_id")
        updated_profile = ClientProfile.update_client_profile(client_id, **serializer.validated_data)
        result = ClientProfileSerializer(updated_profile)
        return Response(result.data)
            

class UploadClientProfilePhotoView(APIView):
    """API view for profile photo operations."""
    
    def post(self, request):
        serializer = UploadClientProfilePhotoSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        client_id = serializer.validated_data.get("client_id")
        profile_picture = serializer.validated_data.get("profile_picture")
        profile = ClientProfile.update_photo(client_id, profile_picture)
            
        if not profile:
            return Response({"error": "Profile not found"}, status=status.HTTP_404_NOT_FOUND)
                
        serializer = ClientProfilePhotoSerializer(profile)
        return Response(serializer.data)


# EXPERTS
class GetExpertProfile(APIView):
    

    def post(self, request):
        print("EXPERT RESULTS", request.data)
        data = dict(status=False, message="can get user")
        serializer = ExpertDetailRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        validated_data = serializer.validated_data
        expert_detail = ExpertUserProfile.get_expert_profile(**validated_data, obj=True)
        if expert_detail:
            data.update(status=True, message="User Found")
        print("EXPERT DETAILS", expert_detail)
        serializer = ExpertProfileSetupResponseSerializer(expert_detail)
        return Response(serializer.data)


class UpdateExpertProfile(APIView):
    
    
    def post(self, request):
        """Update expert profile details."""
        print("REQUEST", request.data)
        response_data = dict(status=False)
        serializer = ExpertUserProfileSerializer(data=request.data, partial=True)
        print("SERIALZIER", serializer)
        serializer.is_valid(raise_exception=True)

        validated_data = serializer.validated_data
        print("=====VOOODOOOO======")
        print(validated_data)

        expert_id = validated_data.get("expert_id")
        updated_profile = ExpertUserProfile.update_profile(expert_id, **serializer.validated_data)
        if not updated_profile:
            response_data.update(message="can not update")
            return Response(data=response_data, status=status.HTTP_404_NOT_FOUND)

        response_data.update(status=True)
        return Response(data=response_data, status=status.HTTP_200_OK)
            

class UploadExpertProfilePhoto(APIView):
    """API view for profile photo operations."""
    
    def post(self, request):
        serializer = UploadClientProfilePhotoSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        client_id = serializer.validated_data.get("client_id")
        profile_picture = serializer.validated_data.get("profile_picture")
        profile = ClientProfile.update_photo(client_id, profile_picture)
            
        if not profile:
            return Response({"error": "Profile not found"}, status=status.HTTP_404_NOT_FOUND)
                
        serializer = ClientProfilePhotoSerializer(profile)
        return Response(serializer.data)
        
    
    # def delete(self, request, user_id):
    #     """Remove profile photo."""
    #     try:
    #         # Update with None to remove photo
    #         profile = ClientProfile.update_photo(user_id, None)
            
    #         if not profile:
    #             return Response({"error": "Profile not found"}, status=status.HTTP_404_NOT_FOUND)
                
    #         return Response({"message": "Profile photo removed successfully"})
            
        # except Exception as e:
        #     return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class TopExpertsAPIView(APIView):
    """
    API endpoint to get top experts sorted by rating, completed jobs, earnings, or reviews.
    """
    permission_classes = [AllowAny]
    def post(self, request):
        limit = request.data.get('limit', 10)  # Default to top 10 experts
        order_by_field = request.data.get('order_by', 'rating')  # Default sort by rating

        try:
            top_experts = ExpertUserProfile.top_experts(limit=int(limit), order_by_field=order_by_field)
            return Response(data=top_experts, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        


class FetchExperts(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        serializer = ExpertFilterRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        validated_data = serializer.validated_data
        # expert_id = serializer.validated_data.get("expert_id")
        count = serializer.validated_data.pop("count")

        and_condition = Q()

        
        for key, value in validated_data.items():
            and_condition.add(Q(**{key: value}), Q.AND)

        experts = ExpertUserProfile.fetch_experts(conditions=and_condition, count=count)
        print("EXPERTS", experts)
        return Response(
            data=dict(status=True, message="Experts retrieved successfully", data=experts),
            status=status.HTTP_200_OK,
        )





# TODO: registration should show already exist email in the frontend