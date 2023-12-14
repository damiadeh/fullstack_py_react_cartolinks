from pickle import GET
from flask import Flask,  request, jsonify, session
from config import ApplicationConfig
from flask_cors import CORS, cross_origin
from flask_bcrypt import Bcrypt
from models import db
from db import seed_database
from models import User
from utils import handle_response
from routes import api

app = Flask(__name__)
app.config.from_object(ApplicationConfig)

bcrypt = Bcrypt(app)
CORS(app, supports_credentials=True)
db.init_app(app)

# create db and seed data into it
with app.app_context():
    db.create_all()
    seed_database()

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')


if __name__ == "__main__":
    app.run(debug=True)