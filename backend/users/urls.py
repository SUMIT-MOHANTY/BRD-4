from django.urls import include, path
from .views import UserViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'', UserViewSet, basename='user')

urlpatterns = [
    path('', include(router.urls)),
]
from django.urls import path, include
urlpatterns = []  # placeholder - actual routes are added via router in api/urls.py
