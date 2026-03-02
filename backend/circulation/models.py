from django.db import models
from django.utils import timezone

class CirculationTransaction(models.Model):
    book = models.ForeignKey('books.Book', on_delete=models.PROTECT, related_name='transactions')
    member = models.ForeignKey('users.CustomUser', on_delete=models.PROTECT, related_name='transactions')
    checkout_date = models.DateTimeField(auto_now_add=True)
    due_date = models.DateTimeField()
    checkin_date = models.DateTimeField(null=True, blank=True)
    status = models.CharField(
        max_length=20,
        choices=[('checked_out', 'Checked Out'), ('returned', 'Returned'), ('overdue', 'Overdue')],
        default='checked_out'
    )

class Reservation(models.Model):
    book = models.ForeignKey('books.Book', on_delete=models.PROTECT, related_name='reservations')
    member = models.ForeignKey('users.CustomUser', on_delete=models.PROTECT, related_name='reservations')
    reservation_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(
        max_length=20,
        choices=[('active', 'Active'), ('fulfilled', 'Fulfilled'), ('cancelled', 'Cancelled')],
        default='active'
    )
