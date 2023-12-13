
from models import db, User, Directory, File, create_user, create_directory, create_file
from seed_data import users_data, directories_data, files_data

def seed_users(db_session):
    existing_users = db_session.query(User).first()
    if not existing_users:
        for user_data in users_data:
            create_user(db_session, user_data["email"], user_data["password"])
        
        print("Seeded users into the database.")
    else:
        print("Database already contains users. No need to seed.")

def seed_directories(db_session):
    existing_directory = db_session.query(Directory).first()
    
    if not existing_directory:
        for directory_data in directories_data:
            create_directory(db_session, directory_data["name"], directory_data["parent_id"])
        
        print("Seeded users into the database.")
    else:
        print("Database already contains users. No need to seed.")

def seed_files(db_session):
    existing_files = db_session.query(File).first()
    
    if not existing_files:
        for file_data in files_data :
            create_file(db_session, file_data["name"], file_data["size"], file_data["directory_id"])
        
        print("Seeded users into the database.")
    else:
        print("Database already contains users. No need to seed.")

def seed_database():
    session = db.session()
    seed_users(session)
    seed_directories(session)
    seed_files(session)