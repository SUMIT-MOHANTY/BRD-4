class APIException(Exception):
    status_code = 500
    default_detail = 'A server error occurred.'

    def __init__(self, detail=None, status_code=None):
        self.detail = detail or self.default_detail
        self.status_code = status_code or self.status_code

    def __str__(self):
        return f'{self.status_code}: {self.detail}'
