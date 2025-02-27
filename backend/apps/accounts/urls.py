from django.urls import path

from accounts.views import (
    CustomTokenObtainView, 
    CustomTokenRefreshView, 
    CustomTokenVerifyView
)

from .endpoints import (
    ApproveSkilledUserView,
    PasswordResetRequestView,
    PasswordResetVerifyView,
    ResendOTPView,
    UserRegisterView,
    VerifyOTPView
)


# url patterns for auth
AUTH_URLPATTERNS = [
    path('jwt/create', CustomTokenObtainView.as_view(), name='token_obtain_pair'),
    path('jwt/refresh', CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('jwt/verify', CustomTokenVerifyView.as_view(), name='token_verify'),
]

USER_URLPATTERNS = [
    path("approve-skilled-user/<int:pk>/", ApproveSkilledUserView.as_view(), name="approve-skilled-user"),
    path("register/", UserRegisterView.as_view(), name="register"),
    path("password-reset/request/", PasswordResetRequestView.as_view(), name="password-reset-request"),
    path("password-reset/verify/", PasswordResetVerifyView.as_view(), name="password-reset-verify"),
    path("resend-otp/", ResendOTPView.as_view(), name="resend-otp"),
    path("verify-otp/", VerifyOTPView.as_view(), name="verify-otp"),
]

urlpatterns = AUTH_URLPATTERNS + USER_URLPATTERNS 

