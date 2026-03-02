from celery import shared_task
from django.core.mail import send_mail
@shared_task
def send_reservation_available_email(member_email, book_title):
    subject = 'Book Available Notification'
    message = f'The book "{book_title}" is now available for you.'
    send_mail(subject, message, None, [member_email])
