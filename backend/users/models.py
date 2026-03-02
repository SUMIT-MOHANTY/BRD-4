from django.contrib.auth.models import AbstractUser
from core.models import BaseModel
class Member(AbstractUser, BaseModel):
    pass
