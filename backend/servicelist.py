from flask import Blueprint

services_blueprint = Blueprint('services_blueprint', __name__)

@services_blueprint.route('/services-list', methods=["GET"])
def services():
    list_services = {
        "services": ["Makeup", "Hairstyle", "Landscaping", "Nail Care"]
    }
    return list_services
