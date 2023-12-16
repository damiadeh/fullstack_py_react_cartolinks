from flask import Flask
from config import ApplicationConfig
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from models import db
from db import seed_database
from routes import api
from werkzeug.exceptions import HTTPException
import traceback
from utils import handle_response

app = Flask(__name__)
app.config.from_object(ApplicationConfig)

@app.errorhandler(Exception)
def handle_global_exception(error):
    message = 'Internal Server Error'
    status_code = 500

    if isinstance(error, HTTPException):
        message = error.description
        status_code = error.code
    #We can check for other instance of exception and handle as needed

    # Print the exception to the console for debugging
    # We can also logging servive to log the error
    traceback.print_exc()  

    return handle_response(None, message= message, status=status_code)

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