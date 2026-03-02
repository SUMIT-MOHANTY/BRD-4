from datetime import timedelta
from django.utils import timezone

DEFAULT_LOAN_DAYS = 14

def calculate_due_date(loan_days: int):
    return timezone.now() + timedelta(days=loan_days)

def update_book_availability(book, available: bool):
    book.is_available = available
    book.save()

def transaction_is_overdue(transaction):
    return timezone.now() > transaction.due_date

def active_reservation_exists(book):
    return book.reservations.filter(status='active').exists()
