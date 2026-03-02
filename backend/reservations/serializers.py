from rest_framework import serializers
from .models import Reservation

class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = ('id', 'member', 'book', 'status', 'created_at', 'expires_at')
        read_only_fields = ('member', 'status')
