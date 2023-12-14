from flask import Flask,  request, jsonify, session
def handle_response(data, is_success = True , message: str = None, status: int = 200):
    return  jsonify({
        "is_success": False if data is None else is_success,
        "data": data,
        "message": message
    }), 400 if data is None else status
