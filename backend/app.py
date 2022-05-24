from flask import Flask, jsonify
from flask_cors import CORS
import time
from sqlalchemy import create_engine
import urllib
from dotenv import load_dotenv
import os

from backend.dbConnection import sampleQuery




from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app)

@app.route("/")
def hello_world():
    return {"hello":'5'}

@app.route("/time", methods=['GET'])
def get_time():
    return jsonify({'time': time.time()})

@app.route("/db", methods= ['GET'])
def getSampleQuery():
    return sampleQuery()


# app.config['SQLALCHEMY_DATABASE_URI'] = ''
# server = "my-database-csc-c01.database.windows.net"
# database = "csc-c01-db"
# username = "masterUsername"
# password = "cscc01isawesome!!"
#
# driver = '{ODBC Driver 17 for SQL Server}'
#
# odbc_str = 'DRIVER='+driver+';SERVER='+server+';PORT=1433;UID='+username+';DATABASE='+ database + ';PWD='+ password
# connect_str = 'mssql+pyodbc:///?odbc_connect=' + urllib.parse.quote(odbc_str)
#
# print (connect_str)

# engine = create_engine("mssql+pyodbc://masterUsername:cscc01isawesome!!@my-database-csc-c01.database.windows.net:1433/csc-c01-db?driver=ODBC+Driver+17+for+SQL+Server")

# engine = create_engine(connect_str)



# db = SQLAlchemy(app)




if __name__ == "__main__":
    app.run(debug=True)



