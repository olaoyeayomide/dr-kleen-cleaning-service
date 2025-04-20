from django.urls import path
from .views import (
    login,
    register,
    create_admin_user,
    delete_admin_user,
    request_password_reset,
    reset_password,
)

urlpatterns = [
    path("login/", login, name="login"),
    path("register/", register, name="register"),
    path("admin/create/", create_admin_user, name="create_admin_user"),
    path("admin/delete/<int:user_id>/", delete_admin_user, name="delete_admin_user"),
    path(
        "password-reset/request/", request_password_reset, name="request_password_reset"
    ),
    path(
        "password-reset/<str:uidb64>/<str:token>/",
        reset_password,
        name="reset_password",
    ),
]
