from flask import Blueprint, redirect, request, jsonify
from flask_bcrypt import generate_password_hash
from DAOs import CustomersDAO, ProfessionalsDAO
signup_blueprint = Blueprint('signup_blueprint', __name__)

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
        custDao = CustomersDAO()
        # Check if email exists
        if(custDao.emailExists(email)):
            return "Email already exists", 409
        try:
            custDao.addCustomer(firstName, lastName, email, email, password)
            return {"type": type, "firstName": firstName, "lastName": lastName, "email": email, 
            "username": email}
        except:
            return "Unable to Add Customer", 500
    else:
        providerDao = ProfessionalsDAO()
        
        if(providerDao.emailExists(email)):
            return "Email already exists", 409
        try:
            providerDao.addProfessional(firstName, lastName, email, email, password, servicesProvided)
            return {"type": type, "firstName": firstName, "lastName": lastName, "email": email, 
            "username": email, "servicesProvided": servicesProvided}
        except:
            return "Unable to Add Provider", 500