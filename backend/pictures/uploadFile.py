import boto3
from flask import Blueprint
import os, io
from flask import Flask, flash, request, redirect, url_for
from werkzeug.utils import secure_filename

picture_blueprint = Blueprint('picture_blueprint', __name__)

ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}

UPLOAD_FOLDER = '/pictures/uploadedPics'

client = boto3.client('s3'
                          ,aws_access_key_id=os.environ.get("AWS_ACCESS_KEY_ID"),
                          aws_secret_access_key=os.environ.get("AWS_SECRET_ACCESS_KEY"))

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@picture_blueprint.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return {"Error":"File DNE!"}

    file = request.files['file']
    file.save('test_file.jpg')
    print(file.filename) # This gets the name of the file properly.
    file.seek(0)
    client.upload_fileobj(file, "csc-c01-pictures", file.filename)
    return {"Status":"Sucess!"}

