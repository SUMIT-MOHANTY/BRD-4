from django.urls import include, path
from rest_framework import routers
from users.views import UserViewSet
from catalog.views import ItemViewSet

router = routers.DefaultRouter()
router.register(r'users', UserViewSet, basename='user')
router.register(r'items', ItemViewSet, basename='item')

urlpatterns = [
    path('', include(router.urls)),
]
