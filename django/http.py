import json
class HttpResponse:
    def __init__(self, content='', status=200, content_type='text/html'):
        self.content = content
        self.status = status
        self.content_type = content_type
class JsonResponse(HttpResponse):
    def __init__(self, data, status=200, safe=True):
        super().__init__(json.dumps(data), status, 'application/json')
        self.data = data
