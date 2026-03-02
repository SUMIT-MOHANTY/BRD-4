from django.urls import path
from .views import RegisterView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')

urlpatterns = [
    path('', include(router.urls)),
]
