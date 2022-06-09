from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, unset_jwt_cookies, \
                               jwt_required, decode_token, \
                               get_jwt_identity, get_jwt, verify_jwt_in_request, set_access_cookies
# from flask_bcrypt import check_password_hash
from mockData import customer_data, provider_data

login_blueprint = Blueprint('login_blueprint', __name__)
global access_token 

# for refreshing token
from datetime import datetime, timedelta, timezone

# user submits login request, the email/pass and compared with the hardcoded email/pass
@login_blueprint.route('/token/<type>', methods=["POST"])
def create_token(type):
    global access_token
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    # query db based on type and check if email/pass match
    user_type = 'c' if type == 'customer' else 'p'
    data_to_query = customer_data if type=='customer' else provider_data
    for user in data_to_query:
      #Check if password stored for the user is the salt + hash version of the passed in password
      if user['email']==email and user['password']==password:
        access_token = create_access_token(identity=str(user['id']) + user_type) # use email or username as id?
        res = { "access_token" : access_token }
        return res

    err_res = {"msg": "Wrong email or password" }, 401
    return err_res


# parts of refresh_token function taken from with some modifications: 
# https://flask-jwt-extended.readthedocs.io/en/stable/refreshing_tokens/
@login_blueprint.after_request
def refresh_expiring_jwts(res):
    try:
        verify_jwt_in_request(optional=True)
        expiration_time = get_jwt()["exp"] # expirary time 
        now = datetime.now(timezone.utc)
        target_time = datetime.timestamp(now + timedelta(seconds=5))
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


# prevent un-authenticated users from making reqs to endpoints - 
@login_blueprint.route('/profile', methods=["GET"])
@jwt_required()
def my_profile():
    global access_token

    user_type = decode_token(access_token)["sub"][-1]
    user_id = decode_token(access_token)["sub"][:-1] # dont include user_type char

    data_to_query = customer_data if user_type == 'c' else provider_data
    for user in data_to_query:
      if str(user['id']) == user_id:
        return { "first_name": user['first_name'], "last_name": user['last_name'] } 
        
    res_body = { "first_name": "no match...", "last_name": "no match..." }
    return res_body
