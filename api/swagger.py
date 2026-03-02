try:
    from django.urls import path
    from drf_yasg.views import get_schema_view
    from drf_yasg import openapi
    schema_view = get_schema_view(
        openapi.Info(
            title='My API',
            default_version='v1',
            description='Auto‑generated API docs',
        ),
        public=True,
    )
    urlpatterns = [
        path('', schema_view.with_ui('swagger', cache_timeout=0), name='swagger-ui'),
    ]
except ImportError:
    urlpatterns = []
