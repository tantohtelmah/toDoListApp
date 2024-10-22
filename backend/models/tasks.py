#!/usr/bin/python
""" holds class tasks"""

from sqlalchemy import Column, Enum, String, Date
from models.baseModel import BaseModel, Base

class Tasks(BaseModel, Base):
    __tablename__ = 'tasks'
    name = Column(String(128), nullable=False)
    title = Column(String(128), nullable=False)
    description = Column(String(1024), nullable=False)
    due_date = Date
    status = Column(
        Enum('pending', 'in_progress', 'completed', name='status_enum'),
        default='pending',
        nullable=False
    ) 
    
    def __init__(self, name, title, description, due_date, status, *args, **kwargs):
        """ initializes Tasks"""
        
        self.name = name
        self.title = title
        self.description = description
        self.due_date = due_date
        self.status = status
        super().__init__(*args, **kwargs)
