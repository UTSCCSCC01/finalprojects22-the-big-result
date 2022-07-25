import os

from dotenv import load_dotenv
from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from flask_jwt_extended import create_access_token, create_refresh_token, set_refresh_cookies, unset_jwt_cookies, \
                               jwt_required, decode_token, \
                               get_jwt_identity, get_jwt, verify_jwt_in_request, set_access_cookies
from flask_bcrypt import check_password_hash
from sqlalchemy import create_engine

from DAOs import CustomersDAO, ProfessionalsDAO
from datetime import datetime, timedelta, timezone # for refreshing token

invalidLogin = 'invalid_login'

load_dotenv(f".{os.sep}config{os.sep}.env")
DB_password = os.environ.get("DATABASE_PASSWORD")
localEngine = create_engine(
    f"mssql+pyodbc://masterUsername:{DB_password}@my-database-csc-c01.database.windows.net:1433/my-database-csc-c01?driver=ODBC+Driver+17+for+SQL+Server")

singleQuote = "'"

custDAO = CustomersDAO()
profDAO = ProfessionalsDAO()

login_blueprint = Blueprint('login_blueprint', __name__)

#Upon successful login, this returns back a new access token, and sets a cookie for a refresh token
@login_blueprint.route('/token/<type>', methods=["POST"])
def create_token(type):
    email = request.json.get("email", None)
    err_res = {"msg": "Wrong email or password"}, 401
  
    user_type = 'c' if type == 'customer' else 'p'
    
    if user_type == 'c':
      person = custDAO.getCustomerOnUsername(email)
    elif user_type == 'p':
      person = profDAO.getProfessionalOnUsername(email)
    if not person: 
        return err_res
    check_pass = check_password_hash(person.password, request.json.get("password", None))
    if check_pass:
      access_token = create_access_token(identity=str(person.id) + user_type)
      res = jsonify({ "type": type, "access_token" : access_token })
      #Store the access token in memory in the frontend, so you only return the access token
      #Then store the refresh token in a cookie, so that once the state of the access token changes in the frontend
      #We can just get the refresh token (This is the safest way)
      refresh_token = create_refresh_token(identity=str(person.id) + user_type)
      set_refresh_cookies(res, refresh_token)
      return res, 200
    return err_res

#Send the refresh token to this endpoint to get a new access_token
@login_blueprint.route("/token/refresh", methods=["POST"])
@cross_origin(origin='http://localhost:3000',headers=['Content-Type','Authorization'])
#Only allows refresh token to get here
@jwt_required(refresh=True)
def refresh():
  user = get_jwt_identity()
  access_token = create_access_token(identity=user)
  print(user, access_token)
  if user[-1] == "c":
    user_type="customer"
  elif user[-1] == "p":
    user_type="provider"
  response = jsonify({ "type": user_type, "access_token" : access_token })
  response.headers.add('Access-Control-Allow-Credentials', 'true')
  return response, 200


@login_blueprint.route("/logout", methods=["POST"])
def logout():
    res = jsonify({"msg": "logout successful"})
    #unsets the refresh token in cookies,as well as the csrf token
    unset_jwt_cookies(res)
    return res

#get the current user, return 401 if there is no current user ie not logged in
@login_blueprint.route("/users/me")
# @cross_origin(origin='http://localhost:3000',headers=['Content-Type','Authorization'])
@jwt_required(optional=True)
def get_current_user():
  id = get_jwt_identity()
  if not id:
    return jsonify({"error": "No logged in user"}), 401
  err_res = {"first_name": "no match...", "last_name": "no match..."}, 404
  #customer type
  if id[-1] == "c":
    user_type = "customer"
    person = custDAO.getCustomerOnID(id[:len(id)-1])
  elif id[-1] == "p":
    user_type = "provider"
    person = profDAO.getProfessionalOnId(id[:len(id)-1])
  if person == None:
    return err_res
  else:
    response = jsonify({"first_name": person.firstName, "last_name": person.lastName, "type": user_type, "id": person.id})
    return response, 200
