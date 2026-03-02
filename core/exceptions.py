class APIException(Exception):
    status_code = 400
    default_detail = 'A server error occurred.'

    def __init__(self, detail=None, status_code=None):
        self.detail = detail or self.default_detail
        if status_code is not None:
            self.status_code = status_code

    def __str__(self):
        return self.detail
