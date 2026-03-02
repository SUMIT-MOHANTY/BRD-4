from django.db import models
from core.models import BaseModel

class Book(BaseModel):
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    isbn = models.CharField(max_length=13, unique=True)

    def __str__(self):
        return f"{self.title} by {self.author}"
