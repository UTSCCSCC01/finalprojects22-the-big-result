import json
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import create_access_token, unset_jwt_cookies, jwt_required, JWTManager
import time
from dotenv import load_dotenv
import os

from dbConnection import sampleQuery

from sampleFeature.mySampleFeature import sampleBlueprint
from flask_sqlalchemy import SQLAlchemy


def getDBURL() -> str:
    load_dotenv(f".{os.sep}config{os.sep}.env")
    DB_password = os.environ.get("DATABASE_PASSWORD")
    return f"mssql+pyodbc://masterUsername:{DB_password}@my-database-csc-c01.database.windows.net:1433/my-database-csc-c01?driver=ODBC+Driver+17+for+SQL+Server"


app = Flask(__name__)
app.register_blueprint(sampleBlueprint, url_prefix='/example')
CORS(app)


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



app.config["JWT_SECRET_KEY"] = "a-random-password-that-needs-changing"
jwt = JWTManager(app)

# user submits login request, the email/pass and compared with the hardcoded email/pass
@app.route('/token', methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    print(email, password)
    if email != "test@utoronto.ca" or password != "1234":
        err_response = {"msg": "Wrong email or password", "status": 401 }
        return err_response

    # acess token is returned to user if details are correct
    access_token = create_access_token(identity = email) # use email or username as id?
    response = { "access_token" : access_token }
    print(response)
    return response


@app.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response


# prevent un-authenticated users from making reqs to endpoints - 
@app.route('/profile', methods=["GET"])
@jwt_required() 
def my_profile():
    # no need to jsonify this, a dict is turned to JSON in flask
    response_body = { "name": "ANGELA WATSON", "about": "stuff about angela" }
    return response_body



if __name__ == "__main__":
    # print(getDBURL())
    app.run(debug=True)


