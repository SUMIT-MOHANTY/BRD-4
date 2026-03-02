from django.db import models
from django.conf import settings

class Token(models.Model):
    key = models.CharField(max_length=40, primary_key=True)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='auth_token'
    )
    created = models.DateTimeField(auto_now_add=True)

    def __repr__(self):
        return f'<Token key={self.key!r} user={self.user!r}>'
