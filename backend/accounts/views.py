from django.contrib.auth import get_user_model
from django.core.mail import send_mail
from django.conf import settings
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserSerializer
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes

User = get_user_model()


@api_view(["POST"])
@permission_classes([IsAdminUser])
def create_admin_user(request):
    # Check if we've reached the admin limit
    admin_count = User.objects.filter(is_staff=True).count()
    if admin_count >= 3:
        return Response(
            {"error": "Maximum number of admin users reached (3)"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save(is_staff=True)

        # Send welcome email
        send_mail(
            "Welcome to DrKleen Admin Panel",
            f"Your admin account has been created successfully. You can now log in to the admin panel.",
            settings.EMAIL_HOST_USER,
            [user.email],
            fail_silently=False,
        )

        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["DELETE"])
@permission_classes([IsAdminUser])
def delete_admin_user(request, user_id):
    try:
        user = User.objects.get(id=user_id, is_staff=True)
        # Prevent deleting the last admin
        if User.objects.filter(is_staff=True).count() <= 1:
            return Response(
                {"error": "Cannot delete the last admin user"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except User.DoesNotExist:
        return Response(
            {"error": "Admin user not found"}, status=status.HTTP_404_NOT_FOUND
        )


@api_view(["POST"])
def request_password_reset(request):
    email = request.data.get("email")
    try:
        user = User.objects.get(email=email)
        token = default_token_generator.make_token(user)
        uid = urlsafe_base64_encode(force_bytes(user.pk))

        reset_url = f"{settings.FRONTEND_URL}/reset-password/{uid}/{token}/"

        send_mail(
            "Password Reset Request",
            f"Click the following link to reset your password: {reset_url}",
            settings.EMAIL_HOST_USER,
            [email],
            fail_silently=False,
        )

        return Response(
            {"message": "Password reset email sent"}, status=status.HTTP_200_OK
        )
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)


@api_view(["POST"])
def reset_password(request, uidb64, token):
    try:
        uid = force_bytes(urlsafe_base64_encode(uidb64))
        user = User.objects.get(pk=uid)

        if default_token_generator.check_token(user, token):
            new_password = request.data.get("new_password")
            user.set_password(new_password)
            user.save()

            return Response(
                {"message": "Password reset successful"}, status=status.HTTP_200_OK
            )
        return Response({"error": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        return Response({"error": "Invalid user"}, status=status.HTTP_400_BAD_REQUEST)
