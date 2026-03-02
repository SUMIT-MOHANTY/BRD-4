from django.urls import path, include
from rest_framework import routers
from backend.books.views import BookViewSet
from backend.members.views import MemberViewSet
from backend.transactions.views import TransactionViewSet
from backend.users.views import RegisterView, UserViewSet

router = routers.DefaultRouter()
router.register(r'books', BookViewSet)
router.register(r'members', MemberViewSet)
router.register(r'transactions', TransactionViewSet)
router.register(r'users', UserViewSet, basename='user')

urlpatterns = [
    path('v1/', include(router.urls)),
    path('v1/auth/register/', RegisterView.as_view(), name='auth-register'),
]
