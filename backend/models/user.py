#!/usr/bin/python
""" holds class user"""

from sqlalchemy import Column, ForeignKey, String, Integer
from models.baseModel import BaseModel
from models import db, Tasks, Tags

class User(BaseModel):
   __tablename__ = 'user'
   email = db.Column(String(128), nullable=False)
   password = db.Column(String(128), nullable=False)
   first_name = db.Column(String(128), nullable=True)
   last_name = db.Column(String(128), nullable=True)
   tasks = db.relationship('Tasks', secondary='user_tasks', backref='users')
   tags = db.relationship('Tags', secondary='user_tags', backref='users')
   
   
   def __init__(self, email, password, first_name, last_name, tasks=None, tags=None, *args, **kwargs):
        """ initializes Tags"""
        self.email = email
        self.password = password
        self.first_name = first_name
        self.last_name = last_name
        self.tasks = tasks if tasks else []
        self.tags = tags if tags else []
        super().__init__(*args, **kwargs)
        
        
class UserTasks(BaseModel):
    __tablename__ = 'user_tasks'
    user_id = Column(Integer, ForeignKey('user.id'))
    task_id = Column(Integer, ForeignKey('tasks.id'))
   
class UserTags(BaseModel):
    __tablename__ = 'user_tags'
    user_id = Column(Integer, ForeignKey('user.id'))
    tag_id = Column(Integer, ForeignKey('tags.id'))
