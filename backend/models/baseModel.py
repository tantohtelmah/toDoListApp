#!/usr/bin/python3
"""
Contains class BaseModel
"""

from datetime import datetime
import uuid
from sqlalchemy import Column, String, DateTime
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class BaseModel(Base):
    """The BaseModel class from which future classes will be derived"""
    __abstract__ = True  # Ensure this class is not mapped to a table
    id = Column(String(60), primary_key=True, default=str(uuid.uuid4()))
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow)
    
    def __init__(self, *args, **kwargs):
        if kwargs:
            for key, value in kwargs.items():
                if key != "__class__":
                    setattr(self, key, value)
            if kwargs.get("created_at") and isinstance(self.created_at, str):
                self.created_at = datetime.strptime(kwargs["created_at"], "%Y-%m-%dT%H:%M:%S.%f")
            else:
                self.created_at = datetime.utcnow()
            if kwargs.get("updated_at") and isinstance(self.updated_at, str):
                self.updated_at = datetime.strptime(kwargs["updated_at"], "%Y-%m-%dT%H:%M:%S.%f")
            else:
                self.updated_at = datetime.utcnow()
            if kwargs.get("id") is None:
                self.id = str(uuid.uuid4())
        else:
            self.id = str(uuid.uuid4())
            self.created_at = datetime.utcnow()
            self.updated_at = self.created_at

    def __str__(self):
        return "[{:s}] ({:s}) {}".format(self.__class__.__name__, self.id, self.__dict__)

    def save(self):
        self.updated_at = datetime.utcnow()
        from storage import Session
        session = Session()
        session.add(self)
        session.commit()

    def to_dict(self):
        new_dict = self.__dict__.copy()
        if "created_at" in new_dict:
            new_dict["created_at"] = new_dict["created_at"].strftime("%Y-%m-%dT%H:%M:%S.%f")
        if "updated_at" in new_dict:
            new_dict["updated_at"] = new_dict["updated_at"].strftime("%Y-%m-%dT%H:%M:%S.%f")
        new_dict["__class__"] = self.__class__.__name__
        if "_sa_instance_state" in new_dict:
            del new_dict["_sa_instance_state"]
        return new_dict

    def delete(self):
        from storage import Session
        session = Session()
        session.delete(self)
        session.commit()
