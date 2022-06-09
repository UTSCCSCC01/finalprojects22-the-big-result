from flask import Blueprint, redirect, request, jsonify
from flask_bcrypt import generate_password_hash
signup_blueprint = Blueprint('signup_blueprint', __name__)

customer_data = []
provider_data = []

@signup_blueprint.route('/signup/<type>', methods=["POST"])
def signup(type):
    #TODO: Add to DB instead
    email = request.json.get("email", None)
    #hash + salt the password before adding to the db
    password = generate_password_hash(request.json.get("password", None), 10).decode("utf-8")
    firstName = request.json.get("firstName", None)
    lastName = request.json.get("lastName", None)
    location = request.json.get("location", None)
    servicesProvided = request.json.get("servicesProvided", None)
    if(type == "customer"):
        customer = {"email": email, "password": password, "first_name": firstName, "last_name": lastName}
        customer_data.append(customer)
        if customer in customer_data: 
            return {"type": type, "firstName": firstName, "lastName": lastName, "email": email}
        else:
            return "Unable to Add Customer", 500
    else:
        provider = {"email": email, "password": password, "first_name": firstName, "last_name": lastName, 
        "location": location, "services_provided": servicesProvided}
        provider_data.append(provider)
        if provider in provider_data: 
            return {"type": type, "firstName": firstName, "lastName": lastName, "email": email, 
            "location": location, "servicesProvided": servicesProvided}
        else:
            return "Unable to Add Provider", 500