#!/usr/bin/python
""" holds class tags"""

from sqlalchemy import Column, String, Integer
from models.baseModel import BaseModel
from models import db

class Tags(BaseModel):
    __tablename__ = 'tags'
    id = db.Column(Integer, primary_key=True)
    name = db.Column(String(128), nullable=False)
    
    def __init__(self, name, *args, **kwargs):
        """ initializes Tags"""
        
        self.name = name
        super().__init__(*args, **kwargs)
