from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Reservation
from .serializers import ReservationSerializer

class ReservationViewSet(viewsets.ModelViewSet):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer

    def get_queryset(self):
        member_id = self.request.query_params.get('member')
        if member_id:
            return self.queryset.filter(member_id=member_id)
        return self.queryset

    @action(detail=True, methods=['post'])
    def cancel(self, request, pk=None):
        reservation = self.get_object()
        reservation.status = 'canceled'
        reservation.save()
        return Response({'status': 'canceled'}, status=status.HTTP_200_OK)
