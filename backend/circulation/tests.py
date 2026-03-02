from django.urls import reverse
from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from django.utils import timezone
from books.models import Book
from users.models import CustomUser
from .models import CirculationTransaction, Reservation

class BaseTest(APITestCase):
    def setUp(self):
        self.user = CustomUser.objects.create_user(username='testuser', password='testpass')
        self.book = Book.objects.create(title='Test Book', is_available=True)
        self.client = APIClient()
        login_url = reverse('auth:login')
        resp = self.client.post(login_url, {'username': 'testuser', 'password': 'testpass'}, format='json')
        token = resp.data['access']
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + token)

class CheckoutTests(BaseTest):
    def test_successful_checkout(self):
        url = reverse('circulation:checkout')
        data = {'book_id': self.book.id, 'member_id': self.user.id, 'loan_days': 7}
        resp = self.client.post(url, data, format='json')
        self.assertEqual(resp.status_code, status.HTTP_201_CREATED)
        tx = CirculationTransaction.objects.get(id=resp.data['id'])
        self.assertFalse(Book.objects.get(id=self.book.id).is_available)
        expected_due = tx.checkout_date + timezone.timedelta(days=7)
        self.assertEqual(tx.due_date.date(), expected_due.date())

class CheckinTests(BaseTest):
    def setUp(self):
        super().setUp()
        self.tx = CirculationTransaction.objects.create(
            book=self.book, member=self.user, due_date=timezone.now() + timezone.timedelta(days=5)
        )
        update_book_availability(self.book, False)

    def test_on_time_checkin(self):
        url = reverse('circulation:checkin')
        resp = self.client.post(url, {'transaction_id': self.tx.id}, format='json')
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.tx.refresh_from_db()
        self.assertEqual(self.tx.status, 'returned')

    def test_overdue_checkin(self):
        self.tx.due_date = timezone.now() - timezone.timedelta(days=1)
        self.tx.save()
        url = reverse('circulation:checkin')
        resp = self.client.post(url, {'transaction_id': self.tx.id}, format='json')
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.tx.refresh_from_db()
        self.assertEqual(self.tx.status, 'overdue')

class ReservationTests(BaseTest):
    def test_reserve_unavailable_book(self):
        self.book.is_available = False
        self.book.save()
        url = reverse('circulation:reserve')
        resp = self.client.post(url, {'book_id': self.book.id, 'member_id': self.user.id}, format='json')
        self.assertEqual(resp.status_code, status.HTTP_201_CREATED)
        self.assertEqual(resp.data['status'], 'active')

    def test_reserve_already_reserved(self):
        self.book.is_available = False
        self.book.save()
        Reservation.objects.create(book=self.book, member=self.user)
        url = reverse('circulation:reserve')
        resp = self.client.post(url, {'book_id': self.book.id, 'member_id': self.user.id}, format='json')
        self.assertEqual(resp.status_code, status.HTTP_400_BAD_REQUEST)
