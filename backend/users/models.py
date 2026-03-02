from django.contrib.auth.models import AbstractUser
from django.db import models
from core.models import BaseModel

class Member(BaseModel, AbstractUser):
    # Additional fields can be added here later
    pass
