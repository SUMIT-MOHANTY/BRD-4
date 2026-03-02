from django.db import models
from django.conf import settings

class Book(models.Model):
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    isbn = models.CharField(max_length=13, unique=True)
    category = models.CharField(max_length=100)
    AVAILABILITY_CHOICES = [('available', 'Available'), ('checked_out', 'Checked Out')]
    availability_status = models.CharField(max_length=20, choices=AVAILABILITY_CHOICES)
    published_date = models.DateField()
    description = models.TextField(blank=True)

class Member(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    phone = models.CharField(max_length=20)
    address = models.TextField()
    membership_date = models.DateField(auto_now_add=True)
    membership_expiry = models.DateField()

class Transaction(models.Model):
    book = models.ForeignKey(Book, on_delete=models.PROTECT)
    member = models.ForeignKey(Member, on_delete=models.PROTECT)
    checkout_date = models.DateTimeField(auto_now_add=True)
    due_date = models.DateTimeField()
    return_date = models.DateTimeField(null=True, blank=True)
    STATUS_CHOICES = [('ongoing','Ongoing'),('returned','Returned'),('overdue','Overdue')]
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    fine = models.DecimalField(max_digits=6, decimal_places=2, default=0.00)

class Reservation(models.Model):
    book = models.ForeignKey(Book, on_delete=models.PROTECT)
    member = models.ForeignKey(Member, on_delete=models.PROTECT)
    reserved_date = models.DateTimeField(auto_now_add=True)
    STATUS_CHOICES = [('active','Active'),('cancelled','Cancelled'),('fulfilled','Fulfilled')]
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
