import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
SECRET_KEY = 'test-secret-key'

# Minimal installed apps - include only what the project needs for tests
INSTALLED_APPS = [
    'django.contrib.auth',
    'django.contrib.contenttypes',
    # Add project apps here, e.g., 'backend.myapp'
]

# Use an in‑memory SQLite DB for speed & isolation
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': ':memory:',
    }
}

USE_TZ = True
DEFAULT_AUTO_FIELD = 'django.db.models.AutoField'

# Minimal logging to avoid NoHandler warnings
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
        },
    },
    'root': {
        'handlers': ['console'],
        'level': 'WARNING',
    },
}
