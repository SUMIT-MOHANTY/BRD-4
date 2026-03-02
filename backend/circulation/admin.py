from django.contrib import admin
from .models import CirculationTransaction, Reservation

admin.site.register(CirculationTransaction)
admin.site.register(Reservation)
