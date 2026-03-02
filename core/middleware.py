from django.utils.deprecation import MiddlewareMixin
from core.logging import LOGGER
import json

class GlobalExceptionMiddleware(MiddlewareMixin):
    def process_exception(self, request, exception):
        LOGGER.error('Unhandled exception: %s', str(exception))
        response_data = {
            'error': 'internal_server_error',
            'detail': str(exception)
        }
        from django.http import JsonResponse
        return JsonResponse(response_data, status=500)
