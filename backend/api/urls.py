from django.urls import path, include
from rest_framework import routers
from reservations.views import ReservationViewSet

router = routers.DefaultRouter()
router.register(r'reservations', ReservationViewSet, basename='reservation')

urlpatterns = [
    path('', include(router.urls)),
]
