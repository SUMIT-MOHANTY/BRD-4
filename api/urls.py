from django.urls import path, include
from rest_framework import routers
from users.urls import router as users_router
from books.urls import router as books_router
from reservations.urls import router as reservations_router

router = routers.DefaultRouter()
# Register sub-routers' viewsets under main router
router.registry.extend(users_router.registry)
router.registry.extend(books_router.registry)
router.registry.extend(reservations_router.registry)

urlpatterns = [path('', include(router.urls))]
