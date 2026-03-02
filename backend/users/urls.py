from django.urls import path
from . import views

urlpatterns = [
    path('', views.UserViewSet().list, name='user-list'),
]
