
from django.conf import settings
from django.contrib.auth import get_user_model


from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from accounts.enums import UserRoles
from accounts.serializers import ApproveSkilledUserSerializer, CustomTokenObtainPairSerializer, PasswordResetRequestSerializer, PasswordResetVerifySerializer, ResendOTPSerializer, UserCreateSerializer, VerifyOTPSerializer




User = get_user_model()


    

class UserRegisterView(generics.CreateAPIView):
    """
    API endpoint to register a new user.
    """
    serializer_class = UserCreateSerializer
    permission_classes = [AllowAny]  # Anyone can register

    def create(self, request):
        """
        Handle user registration.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        return Response(
            {"message": "User registered successfully!", "user_id": user.id},
            status=status.HTTP_201_CREATED
        )



class ResendOTPView(generics.GenericAPIView):
    """
    API endpoint to resend OTP to a user's email.
    """
    serializer_class = ResendOTPSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        """
        Handle OTP resending.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        return Response(serializer.validated_data, status=status.HTTP_200_OK)


class VerifyOTPView(generics.GenericAPIView):
    """
    API endpoint to verify OTP and activate the user's account.
    """
    serializer_class = VerifyOTPSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        """
        Handle OTP verification.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        return Response(serializer.validated_data, status=status.HTTP_200_OK)
    

class ApproveSkilledUserView(generics.UpdateAPIView):
    """
    API endpoint for approving skilled users.
    """
    queryset = User.objects.filter(role=UserRoles.SKILLED_USER, is_approved=False)
    serializer_class = ApproveSkilledUserSerializer
    # permission_classes = [permissions.IsAdminUser] 


class PasswordResetRequestView(generics.GenericAPIView):
    """
    API to request a password reset OTP.
    """
    serializer_class = PasswordResetRequestSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({"message": "Password reset OTP sent to your email."}, status=status.HTTP_200_OK)


class PasswordResetVerifyView(generics.GenericAPIView):
    """
    API to verify OTP and reset password.
    """
    serializer_class = PasswordResetVerifySerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({"message": "Password reset successful. You can now log in with your new password."}, status=status.HTTP_200_OK)