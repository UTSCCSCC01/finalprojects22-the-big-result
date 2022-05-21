from flask import Flask, jsonify
from flask_cors import CORS
import time

app = Flask(__name__)
CORS(app)

@app.route("/")
def hello_world():
    return {"hello":'5'}

@app.route("/time", methods=['GET'])
def get_time():
    return jsonify({'time': time.time()})


if __name__ == "__main__":
    app.run(debug=True)
