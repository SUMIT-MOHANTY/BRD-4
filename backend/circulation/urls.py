from django.urls import path
from .views import CheckoutView, CheckinView, ReserveView, TransactionListView, ReservationListView

app_name = 'circulation'

urlpatterns = [
    path('checkout/', CheckoutView.as_view(), name='checkout'),
    path('checkin/', CheckinView.as_view(), name='checkin'),
    path('reserve/', ReserveView.as_view(), name='reserve'),
    path('transactions/', TransactionListView.as_view(), name='transactions'),
    path('reservations/', ReservationListView.as_view(), name='reservations'),
]
