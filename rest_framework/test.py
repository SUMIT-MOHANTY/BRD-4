class APIClient:
    """Very small stand‑in for DRF's APIClient.
    It can be attached to a Flask app (or any object exposing a
    `.test_client()` method) and forwards the common HTTP verbs.
    """
    def __init__(self, app=None):
        self._client = None
        if app is not None:
            # Flask apps expose a `test_client` method.
            try:
                self._client = app.test_client()
            except Exception:
                raise RuntimeError(
                    "APIClient requires a Flask app (or compatible) "
                    "object with a .test_client() method"
                )

    def _ensure_client(self):
        if self._client is None:
            raise RuntimeError(
                "APIClient was not given an application to bind to"
            )

    def get(self, path, **kwargs):
        self._ensure_client()
        return self._client.get(path, **kwargs)

    def post(self, path, data=None, json=None, **kwargs):
        self._ensure_client()
        return self._client.post(path, data=data, json=json, **kwargs)

    def put(self, path, data=None, **kwargs):
        self._ensure_client()
        return self._client.put(path, data=data, **kwargs)

    def delete(self, path, **kwargs):
        self._ensure_client()
        return self._client.delete(path, **kwargs)
