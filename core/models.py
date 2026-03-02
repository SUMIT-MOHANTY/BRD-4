from datetime import datetime
from sqlalchemy import Column, Integer, String
from sqlalchemy.types import DateTime
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class BaseModel(Base):
    __abstract__ = True
    id = Column(Integer, primary_key=True, autoincrement=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __repr__(self):
        cls = self.__class__.__name__
        return f"<{cls} id={self.id}>"
