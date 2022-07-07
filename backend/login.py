import os

from dotenv import load_dotenv
from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from flask_jwt_extended import create_access_token, create_refresh_token, unset_jwt_cookies, \
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
global access_token 

#Upon successful login, this returns back a new access token
@login_blueprint.route('/login/<type>', methods=["POST"])
def create_token(type):
    #TODO: Fix global access_token stuff
    global access_token
    email = request.json.get("email", None)
    err_res = {"msg": "Wrong email or password"}, 401
    
    # customer
    user_type = 'c' if type == 'customer' else 'p'
    
    if user_type == 'c':
      customer = custDAO.getCustomerOnUsername(email)
      if not customer: 
        return err_res
      check_pass = check_password_hash(customer.password, request.json.get("password", None))
      if check_pass:
        access_token = create_access_token(identity=str(customer.id) + user_type)
        # refresh_token = create_refresh_token(identity=customer.id)
        return jsonify({ "type": "customer", "access_token" : access_token }), 200
      return err_res

    # provider user_type == 'p'
    provider = profDAO.getProfessionalOnUsername(email)
    if not provider: 
      return err_res
    check_pass = check_password_hash(provider.password, request.json.get("password", None))
    if check_pass:
      # refresh_token = create_refresh_token(identity=provider.id)
      access_token = create_access_token(identity=str(provider.id) + user_type)
      return jsonify({ "type": "provider", "access_token" : access_token }), 200
    return err_res



# # parts of refresh_token function taken from with some modifications: 
# # https://flask-jwt-extended.readthedocs.io/en/stable/refreshing_tokens/
# @login_blueprint.after_request
# def refresh_expiring_jwts(res):
#     try:
#         verify_jwt_in_request(optional=True)
#         expiration_time = get_jwt()["exp"] # expirary time 
#         now = datetime.now(timezone.utc)
#         target_time = datetime.timestamp(now + timedelta(minutes=30))
#         # create new token, and send that as response if expired
#         if target_time > expiration_time:
#             access_token = create_access_token(identity=get_jwt_identity())
#             set_access_cookies(res, access_token)
#         return res
#     # case where there is not a valid jwt return original respone
#     except (RuntimeError, KeyError) as ex:
#         return res


@login_blueprint.route("/logout", methods=["POST"])
def logout():
    res = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(res)
    return res

#get the current user, return 401 if there is no current user ie not logged in
@login_blueprint.route("/users/me")
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
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
  if id[-1] == "p":
    user_type = "provider"
    person = profDAO.getProfessionalOnId(id[:len(id)-1])
  if person == None:
    return err_res
  else:
    return jsonify({"first_name": person.firstName, "last_name": person.lastName, "type": user_type}), 200