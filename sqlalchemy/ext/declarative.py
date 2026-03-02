def declarative_base():
    class Base:
        __tablename__ = None
        def __init__(self, **kwargs):
            for k, v in kwargs.items():
                setattr(self, k, v)
    return Base
