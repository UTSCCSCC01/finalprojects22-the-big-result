from flask import Blueprint, request
from DAOs import ProfessionalsDAO
from flask_jwt_extended import jwt_required

deactivate_blueprint = Blueprint('deactivate_blueprint', __name__)

@deactivate_blueprint.route('/provider', methods=["DELETE"])
@jwt_required(optional=True)
def deactivate():
    id = request.json.get("id", None)
    if(not id): return {"errors": "must supply provider id"}, 400
    ProfessionalsDAO().updateProfessionalStatus(id, "DEACTIVATED")
    return {"status": "OK"}, 200
