from flask_sqlalchemy import SQLAlchemy
from typing import Union
from flask_bcrypt import Bcrypt
from uuid import uuid4

db = SQLAlchemy()

def get_uuid():
    return uuid4().hex

class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    email = db.Column(db.String(150), unique=True, index=True,nullable=False)
    password = db.Column(db.String,nullable=False)

class File(db.Model):
    __tablename__ = "file"
    id= db.Column(db.Integer, primary_key=True, index=True)
    name= db.Column(db.String(length=100))
    size= db.Column(db.Integer)
    directory_id= db.Column(db.Integer, db.ForeignKey('directories.id'), nullable=True)
    directory= db.relationship("Directory", back_populates="files")

class Directory(db.Model):
    __tablename__ = "directories"
    id= db.Column(db.Integer, primary_key=True, index=True)
    name= db.Column(db.String(length=50))
    parent_id= db.Column(db.Integer, db.ForeignKey('directories.id'), nullable=True)
    files = db.relationship("File", back_populates="directory")

def create_user(db_session, email: str, password: str):
    bcrypt = Bcrypt()
    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(email=email, password= hashed_password)
    db_session.add(new_user)
    db_session.commit()
    return new_user
   
def create_file(db_session, name: str, size: int, directory_id: Union[int, None] = None):
    file = File(name=name, size=size, directory_id=directory_id)
    db_session.add(file)
    db_session.commit()
    return file

def create_directory(db_session, name: str, parent_id: Union[int, None] = None):
    directory = Directory(name=name, parent_id=parent_id)
    db_session.add(directory)
    db_session.commit()
    return directory

