from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy
import time
from dotenv import load_dotenv
import os
from caching import cache

from DAOs import runDAOQueries
from dbConnection import sampleQuery
from models import runDBQueries
from models import db
from profile.userSettingsProfile import profileBluePrint

from signup import signup_blueprint
from listServices import services_blueprint
from serviceProvider.serviceProviderProfile import serviceProviderBlueprint
from allReviews import allReviews_blueprint

from login import login_blueprint
from datetime import timedelta
from listServiceProviders import list_providers_blueprint
from bookings.listBookings import list_bookings_blueprint
from calender import calender_blueprint # new
from book import book_blueprint # new
from reviews.reviews import review_blueprint


def getDBURL() -> str:
    load_dotenv(f".{os.sep}config{os.sep}.env")
    DB_password = os.environ.get("DATABASE_PASSWORD")
    return f"mssql+pyodbc://masterUsername:{DB_password}@my-database-csc-c01.database.windows.net:1433/my-database-csc-c01?driver=ODBC+Driver+17+for+SQL+Server"

def createApp():
    app = Flask(__name__)
    app.register_blueprint(signup_blueprint)
    app.register_blueprint(services_blueprint)
    app.register_blueprint(serviceProviderBlueprint)
    app.register_blueprint(list_providers_blueprint)
    app.register_blueprint(login_blueprint)
    app.register_blueprint(list_bookings_blueprint)
    app.register_blueprint(calender_blueprint) # new
    app.register_blueprint(book_blueprint) # new
    app.register_blueprint(review_blueprint) # deals with creating a review (theb-15)
    app.register_blueprint(profileBluePrint, url_prefix='/profile')
    app.register_blueprint(allReviews_blueprint) # deals with getting all reviews (theb-6)

    CORS(app, origins=['http://localhost:3000'], supports_credentials=True)
    # JWTManager(app)

    Bcrypt(app)
    JWTManager(app)

    app.config['SQLALCHEMY_DATABASE_URI'] = getDBURL()
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config["JWT_SECRET_KEY"] = "a-random-password-that-needs-changing"
    #Need to enable jwt location in both headers and cookies as refresh tokens will be in an httponly cookie
    app.config['JWT_TOKEN_LOCATION'] = ["headers", "cookies"]
    app.config['JWT_REFRESH_COOKIE_PATH'] = '/token/refresh'
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(minutes=60)
    app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(days=1)
    app.config["JWT_COOKIE_CSRF_PROTECT"] = False

    db.init_app(app)
    cache.init_app(app)

    app.app_context().push()
    return app

app = createApp()

if __name__ == "__main__":
    # runDAOQueries()
    app.run(debug=True)
