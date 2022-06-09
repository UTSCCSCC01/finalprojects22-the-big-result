from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy
import time
from dotenv import load_dotenv
import os

from dbConnection import sampleQuery

from sampleFeature.mySampleFeature import sampleBlueprint
from signup import signup_blueprint

app = Flask(__name__)
bcrypt = Bcrypt(app)
app.register_blueprint(sampleBlueprint, url_prefix='/example')
app.register_blueprint(signup_blueprint)

CORS(app)

app.config["JWT_SECRET_KEY"] = "a-random-password-that-needs-changing"
jwt = JWTManager(app)


def getDBURL() -> str:
    load_dotenv(f".{os.sep}config{os.sep}.env")
    DB_password = os.environ.get("DATABASE_PASSWORD")
    return f"mssql+pyodbc://masterUsername:{DB_password}@my-database-csc-c01.database.windows.net:1433/my-database-csc-c01?driver=ODBC+Driver+17+for+SQL+Server"


app.config['SQLALCHEMY_DATABASE_URI'] = getDBURL()
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)


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
    # print(getDBURL())
    app.run(debug=True)
