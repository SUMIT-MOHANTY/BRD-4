from django.contrib.auth.models import AbstractUser
from django.db import models
from core.models import BaseModel

class Member(BaseModel, AbstractUser):
    phone = models.CharField(max_length=20, blank=True)
