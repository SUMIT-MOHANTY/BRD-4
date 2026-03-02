import os
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
SECRET_KEY = os.getenv('DJANGO_SECRET_KEY', 'insecure-secret')
DEBUG = True
ALLOWED_HOSTS = ['*']
INSTALLED_APPS = [
    'django.contrib.contenttypes',
    'django.contrib.auth',
    'rest_framework',
    'drf_yasg',
    'core',
    'users',
    'catalog',
    'api',
]
MIDDLEWARE = [
    'django.middleware.common.CommonMiddleware',
    'core.middleware.GlobalExceptionMiddleware',
]
ROOT_URLCONF = 'core.urls'
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}
DEFAULT_AUTO_FIELD = 'django.db.models.AutoField'
