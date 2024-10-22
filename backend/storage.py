#!/usr/bin/python3
"""
Contains storage elements
"""


from sqlalchemy import create_engine, inspect
from sqlalchemy.orm import sessionmaker, scoped_session
from models.baseModel import Base
from models.tasks import Tasks
from models.tags import Tags
from models.user import User

DATABASE_URL = 'sqlite:///your_database.db'
engine = create_engine(DATABASE_URL)
Session = scoped_session(sessionmaker(bind=engine))

def init_db():
    Base.metadata.create_all(engine)
    print("Tables created", Base.metadata.tables.keys())
    
# Verify tables
def list_tables():
    inspector = inspect(engine)
    print("Tables in the database:")
    for table_name in inspector.get_table_names():
        print
