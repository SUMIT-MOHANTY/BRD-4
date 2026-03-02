from datetime import date, timedelta
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from backend.apps.circulation.models import Loan
from backend.apps.catalog.models import Book
from backend.apps.members.models import Member

class TestCirculationStats(APITestCase):
    def setUp(self):
        self.book = Book.objects.create(title='Test', author='Auth')
        self.member = Member.objects.create(first_name='A', last_name='B')
        Loan.objects.create(book=self.book, member=self.member, checkout_date=date.today(), due_date=date.today()+timedelta(days=7))
    def test_success(self):
        url = '/api/report/circulation-stats/?start_date=2020-01-01&end_date=2030-01-01'
        resp = self.client.get(url)
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
    def test_missing_param(self):
        resp = self.client.get('/api/report/circulation-stats/')
        self.assertEqual(resp.status_code, status.HTTP_400_BAD_REQUEST)

class TestPopularBooks(APITestCase):
    def setUp(self):
        self.book = Book.objects.create(title='T', author='A')
        self.member = Member.objects.create(first_name='X', last_name='Y')
        Loan.objects.create(book=self.book, member=self.member, checkout_date=date.today(), due_date=date.today())
    def test_success(self):
        url = '/api/report/popular-books/?start_date=2020-01-01&end_date=2030-01-01'
        resp = self.client.get(url)
        self.assertEqual(resp.status_code, status.HTTP_200_OK)

class TestOverdueItems(APITestCase):
    def setUp(self):
        self.book = Book.objects.create(title='B', author='A')
        self.member = Member.objects.create(first_name='M', last_name='N')
        Loan.objects.create(book=self.book, member=self.member, checkout_date=date.today()-timedelta(days=10), due_date=date.today()-timedelta(days=5))
    def test_success(self):
        resp = self.client.get('/api/report/overdue-items/')
        self.assertEqual(resp.status_code, status.HTTP_200_OK)

class TestMemberSummary(APITestCase):
    def setUp(self):
        self.book = Book.objects.create(title='B', author='A')
        self.member = Member.objects.create(first_name='F', last_name='L')
        Loan.objects.create(book=self.book, member=self.member, checkout_date=date.today(), due_date=date.today())
    def test_success(self):
        url = f'/api/report/member-summary/?member_id={self.member.id}'
        resp = self.client.get(url)
        self.assertEqual(resp.status_code, status.HTTP_200_OK)

class TestLibraryStats(APITestCase):
    def test_success(self):
        resp = self.client.get('/api/report/library-stats/')
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
