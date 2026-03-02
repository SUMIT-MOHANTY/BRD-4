from django.db import models
from core.models import BaseModel
from books.models import Book
from users.models import Member

class Reservation(BaseModel):
    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('ACTIVE', 'Active'),
        ('COMPLETED', 'Completed'),
    ]
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='reservations')
    member = models.ForeignKey(Member, on_delete=models.CASCADE, related_name='reservations')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')
    reserved_at = models.DateTimeField(auto_now_add=True)
