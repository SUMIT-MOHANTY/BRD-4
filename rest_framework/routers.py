class DefaultRouter:
    def __init__(self):
        self.registry = []
    def register(self, prefix, viewset, basename=None):
        self.registry.append((prefix, viewset, basename))
    @property
    def urls(self):
        return []
