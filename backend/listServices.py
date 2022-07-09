from flask import Blueprint
from DAOs import ServicesDAO

services_blueprint = Blueprint('services_blueprint', __name__)

@services_blueprint.route('/getServices', methods=["GET"])
def services():
    services = ServicesDAO().getAllServices();

    temp = []
    for i in range(len(services)):
        temp.append({
            "id": i,
            "service": services[i].serviceName
        })
    
    list_services = {
        "services": temp
    }

    return list_services
