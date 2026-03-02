from django.contrib.auth.models import AbstractUser
from core.models import BaseModel
class Member(AbstractUser, BaseModel):
    email = models.EmailField(unique=True)
    def __str__(self):
        return self.username
