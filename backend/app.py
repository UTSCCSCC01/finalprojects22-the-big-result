from flask import Flask, jsonify
from flask_cors import CORS
import time
from dotenv import load_dotenv
import os

from dbConnection import sampleQuery
from models import runDBQueries
from models import db

from sampleFeature.mySampleFeature import sampleBlueprint


def getDBURL() -> str:
    load_dotenv(f".{os.sep}config{os.sep}.env")
    DB_password = os.environ.get("DATABASE_PASSWORD")
    return f"mssql+pyodbc://masterUsername:{DB_password}@my-database-csc-c01.database.windows.net:1433/my-database-csc-c01?driver=ODBC+Driver+17+for+SQL+Server"


def createApp():
    app = Flask(__name__)
    app.register_blueprint(sampleBlueprint, url_prefix='/example')

    CORS(app)

    app.config['SQLALCHEMY_DATABASE_URI'] = getDBURL()
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

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
    app.run(debug=True)