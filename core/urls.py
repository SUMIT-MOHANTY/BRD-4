from django.contrib import admin
from django.urls import path, include
from backend.api.router import urlpatterns as api_urlpatterns

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include((api_urlpatterns, 'api'), namespace='api')),
]
