class Celery:
    def __init__(self, name, broker=None, backend=None):
        self.name = name
        self.conf = {}
    def config_from_object(self, obj, namespace=None):
        pass
    def task(self, func=None, **kwargs):
        def decorator(f):
            return f
        return decorator if func is None else func
