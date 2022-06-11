from flask import Blueprint

services_blueprint = Blueprint('services_blueprint', __name__)

@services_blueprint.route('/services-list', methods=["GET"])
def services():
    list_services = {
        "services": ["Makeup", "Hairstyling", "Landscaping", "Nails"]
    }
    return list_services
