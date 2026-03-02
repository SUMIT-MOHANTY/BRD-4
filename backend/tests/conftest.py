import os, django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

import pytest
from rest_framework.test import APIClient

@pytest.fixture
def api_client():
    return APIClient()

@pytest.fixture
def create_user():
    from django.contrib.auth import get_user_model
    User = get_user_model()
    def _create(**kwargs):
        defaults = {'password': 'testpass123'}
        defaults.update(kwargs)
        return User.objects.create_user(**defaults)
    return _create
