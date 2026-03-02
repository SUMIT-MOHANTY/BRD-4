from django.contrib import admin
from .models import Book, Member, Transaction, Reservation

admin.site.register(Book)
admin.site.register(Member)
admin.site.register(Transaction)
admin.site.register(Reservation)
