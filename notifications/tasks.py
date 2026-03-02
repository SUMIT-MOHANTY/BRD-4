from celery import shared_task

@shared_task
def send_reservation_available_email(reservation_id):
    # Placeholder - in real code load reservation, render email template, send email
    return f'Email sent for reservation {reservation_id}'
