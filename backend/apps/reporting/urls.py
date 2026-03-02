from django.urls import path, include
from . import views

urlpatterns = [
    path('report/', views.ReportingViewSet().list, name='reporting-list'),
]
