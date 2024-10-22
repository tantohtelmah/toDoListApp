#!/usr/bin/python
""" holds class user"""


from sqlalchemy import Column, String, Integer
from models.baseModel import BaseModel, Base

class User(BaseModel, Base):
   __tablename__ = 'user'
   id = Column(Integer, primary_key=True)
   email = Column(String(128), nullable=False)
   password = Column(String(128), nullable=False)
   first_name = Column(String(128), nullable=True)
   last_name = Column(String(128), nullable=True)
   
   
   def __init__(self, name, email, password, first_name, last_name, *args, **kwargs):
        """ initializes Tags"""
        self.name = name
        self.email = email
        self.password = password
        self.first_name = first_name
        self.last_name = last_name
        super().__init__(*args, **kwargs)
        
