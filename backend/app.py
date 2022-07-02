from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy
import time
from dotenv import load_dotenv
import os

from DAOs import runDAOQueries
from dbConnection import sampleQuery
from models import runDBQueries
from models import db

from sampleFeature.mySampleFeature import sampleBlueprint
from signup import signup_blueprint
from listServices import services_blueprint
from serviceProvider.serviceProviderProfile import serviceProviderBlueprint

from login import login_blueprint
from datetime import timedelta
from listServiceProviders import list_providers_blueprint
from bookings.listBookings import list_bookings_blueprint
from calender import calender_blueprint # new
from book import book_blueprint # new


def getDBURL() -> str:
    load_dotenv(f".{os.sep}config{os.sep}.env")
    DB_password = os.environ.get("DATABASE_PASSWORD")
    return f"mssql+pyodbc://masterUsername:{DB_password}@my-database-csc-c01.database.windows.net:1433/my-database-csc-c01?driver=ODBC+Driver+17+for+SQL+Server"


def createApp():
    app = Flask(__name__)
    app.register_blueprint(sampleBlueprint, url_prefix='/example')
    app.register_blueprint(signup_blueprint)
    app.register_blueprint(services_blueprint)
    app.register_blueprint(serviceProviderBlueprint, url_prefix="/serviceProvider")
    app.register_blueprint(list_providers_blueprint)
    app.register_blueprint(login_blueprint)
    app.register_blueprint(list_bookings_blueprint)
    app.register_blueprint(calender_blueprint) # new
    app.register_blueprint(book_blueprint) # new

    CORS(app)
    # JWTManager(app)

    Bcrypt(app)
    # app.config["JWT_SECRET_KEY"] = "a-random-password-that-needs-changing"
    JWTManager(app)

    app.config['SQLALCHEMY_DATABASE_URI'] = getDBURL()
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config["JWT_SECRET_KEY"] = "a-random-password-that-needs-changing"
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(seconds=60)

    CORS(app)
    
    db.init_app(app)
    app.app_context().push()

    return app


app = createApp()


@app.route("/")
def hello_world():
    return {"hello": '5'}


@app.route("/time", methods=['GET'])
def get_time():
    return jsonify({'time': time.time()})


@app.route("/db", methods=['GET'])
def getSampleQuery():
    return sampleQuery()


@app.route("/stuff", methods=['GET'])
def databaseTestingStuff():
    return str(db.engine.execute("SELECT * from Persons").fetchall())


if __name__ == "__main__":
    # runDBQueries()
    # runDAOQueries()
    app.run(debug=True)
