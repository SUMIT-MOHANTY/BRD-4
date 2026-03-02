from django.db import models
from core.models import BaseModel
from books.models import Book
from users.models import Member

class Reservation(BaseModel):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('available', 'Available'),
        ('canceled', 'Canceled'),
        ('fulfilled', 'Fulfilled'),
    ]
    member = models.ForeignKey(Member, on_delete=models.CASCADE, related_name='reservations')
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='reservations')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')

    def __str__(self):
        return f"{self.member} - {self.book} ({self.status})"
