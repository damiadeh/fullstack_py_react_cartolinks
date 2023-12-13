from uuid import uuid4
import bcrypt
from flask import Flask, request, jsonify, session, Blueprint
from flask_bcrypt import Bcrypt
from models import User, Directory, File
from utils import handle_response

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

