from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions

def get_schema_view():
    return get_schema_view(
        openapi.Info(
            title="Project API",
            default_version='v1',
            description="Auto‑generated OpenAPI schema",
        ),
        public=True,
        permission_classes=(permissions.AllowAny,),
    )
