from flask import Flask, jsonify
from flask_cors import CORS
import time

from dbConnection import sampleQuery

from sampleFeature.mySampleFeature import sampleBlueprint


from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.register_blueprint(sampleBlueprint, url_prefix='/example')
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




if __name__ == "__main__":
    app.run(debug=True)



