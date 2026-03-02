from django.urls import path, include
from backend.users import urls as users_urls

urlpatterns = [
    path('users/', include(users_urls)),
]
