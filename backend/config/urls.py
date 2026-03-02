from django.urls import path, include
urlpatterns = [
    path('api/', include('backend.apps.reporting.urls')),
]
