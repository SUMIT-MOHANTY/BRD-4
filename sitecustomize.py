import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
# Importing django and running setup makes Django ready for any later imports.
try:
    import django
    django.setup()
except Exception:
    pass
