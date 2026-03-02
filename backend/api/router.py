from rest_framework.routers import DefaultRouter
from backend.library.views import BookViewSet, MemberViewSet, TransactionViewSet, ReservationViewSet

router = DefaultRouter()
router.register(r'books', BookViewSet, basename='book')
router.register(r'members', MemberViewSet, basename='member')
router.register(r'transactions', TransactionViewSet, basename='transaction')
router.register(r'reservations', ReservationViewSet, basename='reservation')
