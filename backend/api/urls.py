from django.urls import include, path
from rest_framework import routers
from reservations.views import ReservationViewSet
router = routers.DefaultRouter()
router.register(r'reservations', ReservationViewSet)
urlpatterns = [
    path('', include(router.urls)),
]
