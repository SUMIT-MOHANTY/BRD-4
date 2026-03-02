from sqlalchemy import Column, Integer
from sqlalchemy.types import DateTime

class BaseModel:
    """Minimal declarative base model for tests.
    Provides an integer primary key and a timestamp.
    """
    id = Column(Integer, primary_key=True)
    created_at = Column(DateTime)

__all__ = ["BaseModel"]
