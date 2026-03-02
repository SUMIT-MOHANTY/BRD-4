from django.urls import path, include
from rest_framework.routers import DefaultRouter
router = DefaultRouter()
# Registrations - placeholder names; actual viewsets are defined in each app
router.register(r'users', None, basename='user')
router.register(r'books', None, basename='book')
router.register(r'reservations', None, basename='reservation')
urlpatterns = [path('', include(router.urls))]
