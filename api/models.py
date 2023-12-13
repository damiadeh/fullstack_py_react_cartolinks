from flask_sqlalchemy import SQLAlchemy
from typing import Union
from flask_bcrypt import Bcrypt
from sqlalchemy.ext.declarative import declarative_base
from seed import users_data, directories_data, files_data

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True, index=True)
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

def seed_users(db_session):
    existing_users = db_session.query(User).first()
    if not existing_users:
        for user_data in users_data:
            create_user(db_session, user_data["email"], user_data["password"])
        
        print("Seeded users into the database.")
    else:
        print("Database already contains users. No need to seed.")
   
def create_file(db_session, name: str, size: int, directory_id: Union[int, None] = None):
    file = File(name=name, size=size, directory_id=directory_id)
    db_session.add(file)
    db_session.commit()
    return file

def seed_files(db_session):
    existing_files = db_session.query(File).first()
    
    if not existing_files:
        for file_data in files_data :
            create_file(db_session, file_data["name"], file_data["size"], file_data["directory_id"])
        
        print("Seeded users into the database.")
    else:
        print("Database already contains users. No need to seed.")

def create_directory(db_session, name: str, parent_id: Union[int, None] = None):
    directory = Directory(name=name, parent_id=parent_id)
    db_session.add(directory)
    db_session.commit()
    return directory

def seed_directories(db_session):
    existing_directory = db_session.query(Directory).first()
    
    if not existing_directory:
        for directory_data in directories_data:
            create_directory(db_session, directory_data["name"], directory_data["parent_id"])
        
        print("Seeded users into the database.")
    else:
        print("Database already contains users. No need to seed.")

def seed_database():
    session = db.session()
    seed_users(session)
    seed_directories(session)
    seed_files(session)