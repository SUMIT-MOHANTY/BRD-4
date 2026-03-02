from django.urls import path, include
from .router import router
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from backend.users.views import RegisterView

urlpatterns = [
    path('', include(router.urls)),
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
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
from rest_framework.routers import DefaultRouter
from tasks.views import TaskViewSet
from users.views import UserViewSet

router = DefaultRouter()
router.register(r'tasks', TaskViewSet, basename='task')
router.register(r'users', UserViewSet, basename='user')

urlpatterns = [
    path('', include(router.urls)),
]
