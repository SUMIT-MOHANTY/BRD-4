from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Reservation, Book
from .serializers import ReservationSerializer

class ReservationViewSet(viewsets.ModelViewSet):
    serializer_class = ReservationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Reservation.objects.filter(member=self.request.user)

    def perform_create(self, serializer):
        book = serializer.validated_data['book']
        # If no copies available, create pending reservation
        if book.available_copies < 1:
            serializer.save(member=self.request.user, status=Reservation.STATUS_PENDING)
        else:
            # Reserve immediately and decrement copy count
            book.available_copies -= 1
            book.save()
            serializer.save(member=self.request.user, status=Reservation.STATUS_FULFILLED)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.status == Reservation.STATUS_FULFILLED:
            # Return the copy to stock
            book = instance.book
            book.available_copies += 1
            book.save()
        instance.status = Reservation.STATUS_CANCELLED
        instance.save()
        return Response(status=status.HTTP_204_NO_CONTENT)
