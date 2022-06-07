from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, unset_jwt_cookies, jwt_required, decode_token

login_blueprint = Blueprint('login_blueprint', __name__)
global access_token 

# mock hardcoded profile data
customer_data = [
  {
    "id": 0,
    "first_name": "cust",
    "last_name": "one",
    "email": "custone@utoronto.ca",
    "password": "1234",
  },
  {
    "id": 1,
    "first_name": "cust",
    "last_name": "two",
    "email": "custtwo@utoronto.ca",
    "password": "5678",
  }
]
provider_data = [
  {
    "id": 0,
    "first_name": "prov",
    "last_name": "one",
    "email": "provone@utoronto.ca",
    "password": "1234",
  },
  {
    "id": 1,
    "first_name": "prov",
    "last_name": "two",
    "email": "provtwo@utoronto.ca",
    "password": "5678",
  }
]

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
      if user['email']==email and user['password']==password:
        access_token = create_access_token(identity=str(user['id']) + user_type) # use email or username as id?
        response = { "access_token" : access_token }
        return response

    err_response = {"msg": "Wrong email or password" }, 401
    return err_response


@login_blueprint.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response


# prevent un-authenticated users from making reqs to endpoints - 
@login_blueprint.route('/profile', methods=["GET"])
@jwt_required()
def my_profile():
    global access_token
    # TODO: check if access_token is not set?
    print(decode_token(access_token)["sub"])   

    user_type = decode_token(access_token)["sub"][-1]
    user_id = decode_token(access_token)["sub"][:-1] # dont include user_type char
    print(user_type, user_id)

    data_to_query = customer_data if user_type == 'c' else provider_data
    for user in data_to_query:
      print('user id in database:', user['id'], user_id , type(user['id']), type(user_id))
      if str(user['id']) == user_id:
        return { "first_name": user['first_name'], "last_name": user['last_name'] } 
        
    response_body = { "first_name": "no match...", "last_name": "no match..." }
    return response_body
