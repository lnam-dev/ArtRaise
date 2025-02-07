from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView, TokenVerifyView, TokenObtainPairView
from .views import RegisterView, LoginView

urlpatterns = [
    path('api/v2/register/', RegisterView.as_view(), name='register'),
    path('api/v2/login/', LoginView.as_view(), name='login'),
    path('api/v2/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/v2/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/v2/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
]
