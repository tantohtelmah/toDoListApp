#!/usr/bin/python
""" holds class user"""

from sqlalchemy import Column, String, Integer
from models.baseModel import BaseModel
from models import db

class User(BaseModel):
   __tablename__ = 'user'
   id = db.Column(Integer, primary_key=True)
   email = db.Column(String(128), nullable=False)
   password = db.Column(String(128), nullable=False)
   first_name = db.Column(String(128), nullable=True)
   last_name = db.Column(String(128), nullable=True)
   
   
   def __init__(self, name, email, password, first_name, last_name, *args, **kwargs):
        """ initializes Tags"""
        self.name = name
        self.email = email
        self.password = password
        self.first_name = first_name
        self.last_name = last_name
        super().__init__(*args, **kwargs)
        
