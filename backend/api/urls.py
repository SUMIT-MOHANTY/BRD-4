from django.urls import path, include
from rest_framework.routers import DefaultRouter
from users.views import UserViewSet
from tasks.views import BookViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'books', BookViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
