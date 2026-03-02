import os
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
SECRET_KEY = 'test-secret-key'
DEBUG = True
ALLOWED_HOSTS = []
INSTALLED_APPS = [
    'django.contrib.contenttypes',
    'django.contrib.auth',
    'rest_framework',
]
MIDDLEWARE = []
ROOT_URLCONF = 'backend.urls'
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}
