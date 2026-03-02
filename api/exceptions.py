from core.exceptions import APIException

class NotFound(APIException):
    status_code = 404
    default_detail = 'Resource not found.'
