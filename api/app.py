from flask import Flask
from config import ApplicationConfig
from models import db, seed_database

app = Flask(__name__)
app.config.from_object(ApplicationConfig)

db.init_app(app)

with app.app_context():
    db.create_all()
    seed_database()
    


if __name__ == "__main__":
    app.run(debug=True)