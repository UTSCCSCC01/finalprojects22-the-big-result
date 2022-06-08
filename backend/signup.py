from flask import Blueprint, redirect, request, jsonify
signup_blueprint = Blueprint('signup_blueprint', __name__)


customer_data = []
provider_data = []

@signup_blueprint.route('/signup/<type>', methods=["POST"])
def signup(type):
    #TODO: Add to DB instead
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    firstName = request.json.get("firstName", None)
    lastName = request.json.get("lastName", None)
    location = request.json.get("location", None)
    servicesProvided = request.json.get("servicesProvided", None)
    if(type == "customer"):
        customer = {"email": email, "password": password, "firstName": firstName, "lastName": lastName}
        customer_data.append(customer)
        if customer in customer_data: 
            return "Customer Successfully Added", 200
        else:
            return "Unable to Add Customer", 500
    else:
        provider = {"email": email, "password": password, "firstName": firstName, "lastName": lastName, "location":location, "servicesProvided": servicesProvided}
        provider_data.append(provider)
        if provider in provider_data: 
            return "Provider Successfully Added", 200
        else:
            return "Unable to Add Provider", 500