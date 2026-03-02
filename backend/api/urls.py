from django.urls import path
from .swagger import get_schema_view
from django.urls import path, include
from backend.users import urls as users_urls

schema_view = get_schema_view()
urlpatterns = [
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
]
from django.urls import path, include
from rest_framework.routers import DefaultRouter
router = DefaultRouter()
# Registrations - placeholder names; actual viewsets are defined in each app
router.register(r'users', None, basename='user')
router.register(r'books', None, basename='book')
router.register(r'reservations', None, basename='reservation')
urlpatterns = [path('', include(router.urls))]
    path('users/', include(users_urls)),
]
