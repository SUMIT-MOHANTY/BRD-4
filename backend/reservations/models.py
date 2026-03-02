from core.models import BaseModel
from django.db import models
from books.models import Book
from users.models import Member
class Reservation(BaseModel):
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='reservations')
    member = models.ForeignKey(Member, on_delete=models.CASCADE, related_name='reservations')
    reserved_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    def __str__(self):
        return f"{self.member} reserves {self.book}"
