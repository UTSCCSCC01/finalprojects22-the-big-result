import boto3
from flask import Blueprint, send_from_directory, send_file
import os, io
from flask import Flask, flash, request, redirect, url_for
from flask_jwt_extended import jwt_required, get_jwt_identity
from werkzeug.utils import secure_filename

from DAOs import PicturesDAO

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

    userID = int(request.form.get("userid"))
    file = request.files['file']
    # file.save('test_file.jpg')
    # print(file.filename) # This gets the name of the file properly.
    # file.seek(0)
    # client.upload_fileobj(file, "csc-c01-pictures", file.filename)
    pictureDao = PicturesDAO()
    pictureDao.uploadProfilePictureByUserID(file,userID)
    return {"Status":"Sucess!"}

@picture_blueprint.route('/getphoto',methods=['GET'])
def getSamplePhoto():
    # test_image = client.get_object(Bucket="csc-c01-pictures",Key='test_photo.jpg')
    # print(test_image)
    # test_image_body = test_image['Body']
    picdao = PicturesDAO()
    test_image_body = picdao.getProfilePictureByUserID(34)
    return send_file(test_image_body, mimetype='image/*')
    # return send_from_directory('.','test_file.jpg')



@picture_blueprint.route('/getProfilePicture', methods=['GET'])
@jwt_required(optional=False)
def getProfilePicture():
    id = get_jwt_identity()
    userID = int(id[:-1])

    picturesDao = PicturesDAO()
    profilePic = picturesDao.getProfilePictureByUserID(userID)
    return send_file(profilePic,mimetype='image/jpeg')




# @picture_blueprint.route('/runonce',methods=['GET'])
# def runOnce():
#     userIdList = [
#         34,
#         35,
#         36,
#         37,
#         38,
#         39,
#         40,
#         41,
#         42,
#         43,
#         44,
#         45,
#         46,
#         47,
#         48,
#         50,
#         51,
#         52,
#         53,
#         54,
#         55,
#         60,
#         61,
#         62,
#         63,
#         64,
#         67,
#         68,
#         69,
#         70,
#         71,
#         72,
#         74,
#         75,
#         76,
#         77,
#         78,
#         80,
#         81,
#         82,
#         83,
#         85,
#         86,
#         87,
#         88,
#         89,
#         90,
#         91,
#         92,
#         93,
#         94,
#         95,
#         96,
#         97
#
#     ]
#
#     for id in userIdList:
#         with open("test_file.jpg", "rb") as f:
#             client.upload_fileobj(f, "csc-c01-pictures", str(id) + '.jpg')
#

