try:
    from rest_framework import viewsets
    from .models import User
    from .serializers import UserSerializer
    class UserViewSet(viewsets.ModelViewSet):
        queryset = User.objects.all()
        serializer_class = UserSerializer
except ImportError:
    pass
from rest_framework import viewsets, permissions
from .models import Member
from .serializers import MemberSerializer

class MemberViewSet(viewsets.ModelViewSet):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer
    permission_classes = [permissions.IsAuthenticated]
