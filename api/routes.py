from uuid import uuid4
import bcrypt
from flask import Flask, request, jsonify, session, Blueprint
from flask_bcrypt import Bcrypt
from models import User, Directory, File
from utils import handle_response
from filters import authenticate_required

api = Blueprint('api', __name__)


@api.route("/ping", methods=['POST', 'GET'])
def ping():
    return handle_response({ }, message = "API is up and running. ") 

@api.route("/login", methods=["POST"])
def login_user():
    email = request.json["email"]
    password = request.json["password"]

    user = User.query.filter_by(email=email).first()

    if user is None:
        return handle_response(None , message="Incorrect email or password") 
    bcrypt = Bcrypt()
    if not bcrypt.check_password_hash(user.password, password):
        return handle_response(None , message="Incorrect email or password") 

    session["user_id"] = str(user.id)
    # we are keeping the seesion on the server, 
    # we could return a jwt token using 
    # a JWT package and also implement refresh token 
    # to make it more secured
    return handle_response({
        "id": user.id,
        "email": user.email
    } , message="Login successful")  

@api.route("/folder")
@authenticate_required 
def get_folder_content():
    parent_id = request.args["parent_id"]
    print("parent_id")
    print(parent_id)
    directory = Directory.query.filter_by(id=parent_id).first()
    if parent_id and directory is None:
        return handle_response(None,message= "Folder not found", status=404)
    
    directories,files = [],[]
    if parent_id:
        directories = Directory.query.filter_by(parent_id=parent_id).all()
        files = File.query.filter_by(directory_id=parent_id).all()
    else:
        directories = Directory.query.filter_by(parent_id=None).all()
        files = File.query.filter_by(directory_id=None).all()
    
    dirList = [{'id': dir.id,'name': dir.name, 'type': 'dir', "size": 0} for dir in directories]
    fileList = [{'id': file.id,'name': file.name, 'type': 'file', "size": file.size} for file in files]

    response = {
        "id": directory.id if directory is not None else None,
        "name": directory.name if directory is not None else ".",
        "type": "dir",
        "size": 0,
        "contents": [*dirList , *fileList ]
    }
    return handle_response(response, message="content fetched successfully")


