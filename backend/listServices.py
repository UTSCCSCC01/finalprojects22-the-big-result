from flask import Blueprint

services_blueprint = Blueprint('services_blueprint', __name__)

@services_blueprint.route('/services-list', methods=["GET"])
def services():
    list_services = {
        "services": [{"id":1, "service":"Makeup"}, {"id":2, "service":"Hairstyle"}, 
        {"id":3, "service":"Landscaping"}, {"id":4 , "service":"Nails"}]
    }
    return list_services
