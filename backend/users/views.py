from rest_framework import viewsets
from .models import User
from .serializers import UserSerializer

class UserViewSet(viewsets.ModelViewSet):
    """Basic CRUD for the custom User model."""
    queryset = User.objects.all()
    serializer_class = UserSerializer
from .models import Member
from .serializers import MemberSerializer
class MemberViewSet(viewsets.ModelViewSet):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer
from rest_framework.viewsets import ViewSet

class UserViewSet(ViewSet):
    def list(self, request):
        return None
