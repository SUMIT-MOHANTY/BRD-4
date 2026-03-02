import pytest
from rest_framework.test import APIClient

@pytest.fixture
def api_client():
    """Provide a DRF APIClient instance for integration tests."""
    return APIClient()
