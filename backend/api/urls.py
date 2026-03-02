from django.urls import path
from .swagger import get_schema_view

schema_view = get_schema_view()
urlpatterns = [
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
]
