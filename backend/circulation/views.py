from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics, permissions
from django.shortcuts import get_object_or_404
from .models import CirculationTransaction, Reservation
from .serializers import CirculationTransactionSerializer, ReservationSerializer
from .services import calculate_due_date, update_book_availability, transaction_is_overdue, active_reservation_exists
from books.models import Book

class CheckoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        book_id = request.data.get('book_id')
        member_id = request.data.get('member_id')
        loan_days = int(request.data.get('loan_days', 14))
        book = get_object_or_404(Book, pk=book_id)
        if not getattr(book, 'is_available', True):
            return Response({'detail': 'Book not available for checkout.'}, status=status.HTTP_400_BAD_REQUEST)
        transaction = CirculationTransaction.objects.create(
            book=book,
            member_id=member_id,
            due_date=calculate_due_date(loan_days),
        )
        update_book_availability(book, False)
        serializer = CirculationTransactionSerializer(transaction)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class CheckinView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        tx_id = request.data.get('transaction_id')
        transaction = get_object_or_404(CirculationTransaction, pk=tx_id)
        transaction.checkin_date = timezone.now()
        if transaction_is_overdue(transaction):
            transaction.status = 'overdue'
        else:
            transaction.status = 'returned'
        transaction.save()
        update_book_availability(transaction.book, True)
        serializer = CirculationTransactionSerializer(transaction)
        return Response(serializer.data, status=status.HTTP_200_OK)

class ReserveView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        book_id = request.data.get('book_id')
        member_id = request.data.get('member_id')
        book = get_object_or_404(Book, pk=book_id)
        if getattr(book, 'is_available', True):
            return Response({'detail': 'Book is available; no need to reserve.'}, status=status.HTTP_400_BAD_REQUEST)
        if active_reservation_exists(book):
            return Response({'detail': 'Active reservation already exists for this book.'}, status=status.HTTP_400_BAD_REQUEST)
        reservation = Reservation.objects.create(book=book, member_id=member_id)
        serializer = ReservationSerializer(reservation)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class TransactionListView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CirculationTransactionSerializer

    def get_queryset(self):
        return CirculationTransaction.objects.filter(member=self.request.user)

class ReservationListView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ReservationSerializer

    def get_queryset(self):
        return Reservation.objects.filter(member=self.request.user)
