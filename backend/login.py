import os

from dotenv import load_dotenv
from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, unset_jwt_cookies, \
                               jwt_required, decode_token, \
                               get_jwt_identity, get_jwt, verify_jwt_in_request, set_access_cookies
from flask_bcrypt import check_password_hash
from sqlalchemy import create_engine

# new dao
from DAOs import CustomersDAO, ProfessionalsDAO
# new dao

# from mockData import customer_data, provider_data
from datetime import datetime, timedelta, timezone # for refreshing token

invalidLogin = 'invalid_login'

load_dotenv(f".{os.sep}config{os.sep}.env")
DB_password = os.environ.get("DATABASE_PASSWORD")
localEngine = create_engine(
    f"mssql+pyodbc://masterUsername:{DB_password}@my-database-csc-c01.database.windows.net:1433/my-database-csc-c01?driver=ODBC+Driver+17+for+SQL+Server")

singleQuote = "'"

# new dao
custDAO = CustomersDAO()
profDAO = ProfessionalsDAO()
# new dao

# def loginWithEmailPassword(email, password, userType):
#     try:
#         userTypeStr = 'Customer' if userType == 'c' else "Professional"
#         return localEngine.execute("SELECT * from [User] where email = "+ singleQuote+ email + singleQuote +" AND password =  "+singleQuote + password + singleQuote+ " AND userType = " +singleQuote+  userTypeStr + singleQuote).fetchone()
#     except Exception as e:
#         return invalidLogin

# def getUserInfoOnID(id):
#     try:
#         return localEngine.execute("SELECT * from [User] where id = '"+ id + "'" ).fetchone()
#     except Exception as e:
#         return invalidLogin



login_blueprint = Blueprint('login_blueprint', __name__)
global access_token 


# user submits login request, the email/pass and compared with the hardcoded email/pass
# @login_blueprint.route('/token/<type>', methods=["POST"])
# def create_token(type):
#     global access_token
#     email = request.json.get("em
# user submits login request, the email/pass and compared with the hardcoded email/pass
# @login_blueprint.route('/token/<type>', methods=["POST"])
# def create_token(type):
#     global access_token
#     email = request.json.get("ail", None)
#     password = request.json.get("password", None)
#
#     # query db based on type and check if email/pass match
#     user_type = 'c' if type == 'customer' else 'p'
#     data_to_query = customer_data if type=='customer' else provider_data
#     for user in data_to_query:
#       #Check if password stored for the user is the salt + hash version of the passed in password
#       if user['email']==email and user['password']==password:
#         access_token = create_access_token(identity=str(user['id']) + user_type) # use email or username as id?
#         res = { "access_token" : access_token }
#         return res
#
#     err_res = {"msg": "Wrong email or password" }, 401
#     return err_res


@login_blueprint.route('/token/<type>', methods=["POST"])
def create_token(type):
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
        access_token = create_access_token(identity=str(customer.id) + user_type) # use email or username as id?
        return { "access_token" : access_token }
      return err_res

    # provider user_type == 'p'
    provider = profDAO.getProfessionalOnUsername(email)
    if not provider: 
      return err_res
    check_pass = check_password_hash(provider.password, request.json.get("password", None))
    if check_pass:
      access_token = create_access_token(identity=str(provider.id) + user_type) # use email or username as id?
      return { "access_token" : access_token }
    return err_res



# parts of refresh_token function taken from with some modifications: 
# https://flask-jwt-extended.readthedocs.io/en/stable/refreshing_tokens/
@login_blueprint.after_request
def refresh_expiring_jwts(res):
    try:
        verify_jwt_in_request(optional=True)
        expiration_time = get_jwt()["exp"] # expirary time 
        now = datetime.now(timezone.utc)
        target_time = datetime.timestamp(now + timedelta(seconds=60))
        # create new token, and send that as response if expired
        if target_time > expiration_time:
            access_token = create_access_token(identity=get_jwt_identity())
            set_access_cookies(res, access_token)
        return res
    # case where there is not a valid jwt return original respone
    except (RuntimeError, KeyError) as ex:
        return res


@login_blueprint.route("/logout", methods=["POST"])
def logout():
    res = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(res)
    return res

@login_blueprint.route("/verify-loggedin", methods=["GET"])
def verify_loggedin():
    if verify_jwt_in_request(optional=True):
      return {"success": "yes"}
    return {"success": "no"}, 500

# prevent un-authenticated users from making reqs to endpoints - 
@login_blueprint.route('/successlogin', methods=["GET"]) # NEW: changed endpoint
@jwt_required()
def get_user_info_on_success_login():
    global access_token

    err_res = {"first_name": "no match...", "last_name": "no match..."}, 404

    user_type = decode_token(access_token)["sub"][-1]
    user_id = decode_token(access_token)["sub"][:-1] # dont include user_type char
    print(user_type, user_id)

    type = 'Customer' if user_type=='c' else 'Provider'

    # customer get info
    if user_type == 'c':
      cust_info = custDAO.getCustomerOnID(user_id)
      if cust_info == None:
        return err_res
      return { "first_name": cust_info.firstName, "last_name": cust_info.lastName, "user_type": type}
    
    # provider get info
    prov_info = profDAO.getProfessionalOnId(user_id)
    if prov_info == None:
      return err_res
    return { "first_name": prov_info.firstName, "last_name": prov_info.lastName, "user_type": type}

