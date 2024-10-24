#!/usr/bin/python
""" holds class tasks"""

from sqlalchemy import Column, Enum, String, Date
from models.baseModel import BaseModel
from models import db

class Tasks(BaseModel):
    __tablename__ = 'tasks'
    name = db.Column(String(128), nullable=False)
    title = db.Column(String(128), nullable=False)
    description = db.Column(String(1024), nullable=False)
    due_date = db.Column(db.Date, nullable=True)
    status = db.Column(
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

