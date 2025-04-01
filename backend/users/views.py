from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.contrib.auth import login, get_user_model
from django.shortcuts import redirect
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import UserSerializer


class RegisterView(generics.CreateAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()

            # Логін користувача після реєстрації
            login(request, user)

            # Повертаємо відповідь, де користувач автоматично перенаправляється на сторінку логіну
            return Response({
                "message": "User created successfully. Redirecting to login...",
            }, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        # Перевірка користувача по email
        user = get_user_model().objects.filter(email=email).first()
        if user and user.check_password(password):
            return super().validate(attrs)
        else:
            raise AuthenticationFailed('Invalid credentials, please try again.')

class LoginView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer