from flask import Blueprint, jsonify

list_providers_blueprint = Blueprint('list_providers_blueprint', __name__)

@list_providers_blueprint.route("/listServiceProviders")
def get_service_provider_list():
    return { "providers": [
        {
            "name": "Mike Ross",
            "service": "Landscaping",
            "description": "Landscaper who will make your yard look pretty",
            "price": 50,
            "profilePicURL": "https://picsum.photos/100"
        },
        {
            "name": "Steven Adams",
            "service": "Hairstyle",
            "description": "Over 5+ years of serving satisfied customers",
            "price": 60,
            "profilePicURL": "https://picsum.photos/101"
        },
        {
            "name": "Alice Schulz",
            "service": "Hairstyle",
            "description": "Best in the business for all your haircutting needs",
            "price": 70,
            "profilePicURL": "https://picsum.photos/102"
        }
        ]
    } 