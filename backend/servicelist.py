from flask import Blueprint
from mockData import list_of_services

services_blueprint = Blueprint('services_blueprint', __name__)
 
@services_blueprint.route('/services-list', methods=["GET"])
def services():
    return list_of_services


