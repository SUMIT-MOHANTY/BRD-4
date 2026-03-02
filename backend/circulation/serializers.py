from rest_framework import serializers
from .models import CirculationTransaction, Reservation

class CirculationTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CirculationTransaction
        fields = '__all__'
        read_only_fields = ('checkout_date', 'status')

class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = '__all__'
        read_only_fields = ('reservation_date', 'status')
