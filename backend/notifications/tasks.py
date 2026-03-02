from celery import shared_task
@shared_task
def send_reservation_available_email(reservation_id):
    # placeholder implementation - real email logic would go here
    return f'Notification sent for reservation {reservation_id}'
