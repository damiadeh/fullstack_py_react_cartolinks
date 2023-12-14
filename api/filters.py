from flask import Flask,  request, jsonify, session
from utils import handle_response

#custom filters 

def authenticate_required(func):
    def wrapper(*args, **kwargs):
        user_id = session.get('user_id')
        if not user_id:
            return handle_response(None,message="Authentication required", status=401)

        # You may perform additional checks here  
        # For example, check if the user exists in the database
        # IP Address Checking
        # User-Agent checking etc

        return func(*args, **kwargs)

    return wrapper