from rest_framework import viewsets
from .models import User
from .serializers import UserSerializer

class UserViewSet(viewsets.ModelViewSet):
    """Basic CRUD for the custom User model."""
    queryset = User.objects.all()
    serializer_class = UserSerializer
