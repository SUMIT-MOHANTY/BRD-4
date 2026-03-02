try:
    from django.urls import path, include
    from rest_framework import routers
    from users.urls import urlpatterns as users_urls
    from catalog.urls import urlpatterns as catalog_urls
except ImportError:
    users_urls = []
    catalog_urls = []

def get_router():
    router = routers.DefaultRouter()
    return router

urlpatterns = []
urlpatterns += users_urls
urlpatterns += catalog_urls
urlpatterns += [
    path('docs/', include('api.docs_urls')),
    path('swagger/', include('api.swagger')),
]
