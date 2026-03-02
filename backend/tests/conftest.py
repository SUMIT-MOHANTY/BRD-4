import pytest
from rest_framework.test import APIClient
from django.urls import reverse
from backend.users.models import User

@pytest.fixture
def api_client():
    return APIClient()

@pytest.fixture
def create_user():
    def _create(username="testuser", password="testpass123", **extra):
        return User.objects.create_user(username=username, password=password, **extra)
    return _create

@pytest.fixture
def auth_token(api_client, create_user):
    user = create_user()
    url = reverse('auth-login')
    resp = api_client.post(url, {"username": user.username, "password": "testpass123"}, format='json')
    return resp.data.get('access')
