from flask_jwt_extended import jwt_required, get_jwt_identity
from jsonschema import validate

from flask import Blueprint, request, jsonify
from DAOs import SettingsDAO, UserDAO
import json

from models import User, Settings

profileBluePrint = Blueprint("profile", __name__)

billingSchema = {
    "type": "object",
    "properties": {
        "cardType": {"type":"string"},
        "cardNumber": {"type": "number"},
        "cardHolderName": {"type": "string"},
        "expiryDate": {"type": "string"}
    },
    "required": ["cardType", "cardNumber", "cardHolderName", "expiryDate"]

}

# TODO: Change the type of expirydate to date.


# Validates throws an error, but doesn't return anything.
# validate(instance={"cardType": "MASTERCARD","cardNumber" : 312831208, "cardHolderName" : "Bob Ross","expiryDate": "09/05" }, schema=schema)


def buildSettingsResponse(user: User, settings: Settings, settingsExist=True) -> dict:
    return {
        "fullName": f"{user.firstName} {user.lastName}",
        "email": user.email,
        "userType": user.userType,
        "billingInfo":  json.loads(settings.billing) if settingsExist else "N/A"
    }


# BAD CODE!!!
@profileBluePrint.route('/')
@jwt_required(optional=False)
def doStuff():
    id = get_jwt_identity()
    # userID: int = request.args.get("userId", default=36, type=int)

    userID = int(id[:-1])
    print(userID)

    userDao = UserDAO()
    settingsDao = SettingsDAO()

    userObject: User = userDao.getUserById(userID)
    userSettings: Settings = settingsDao.getSettingsByUserID(userID)

    if userSettings is None:
        return jsonify(buildSettingsResponse(userObject, userSettings,settingsExist=False))

    validate(instance=json.loads(userSettings.billing), schema=billingSchema)

    return jsonify(buildSettingsResponse(userObject,userSettings))




