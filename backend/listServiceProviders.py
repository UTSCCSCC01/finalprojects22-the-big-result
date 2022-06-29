# from urllib import request
from flask import request
from flask import Blueprint, jsonify

list_providers_blueprint = Blueprint('list_providers_blueprint', __name__)

@list_providers_blueprint.route("/listServiceProviders")
def get_service_provider_list():


    
    rate = request.args.get('rating')
    price = request.args.get('price')

    # TODO Rating on Card
    all_providers= { "providers": [
        {
            "name": "Mike Ross",
            "service": "Landscaping",
            "description": "Landscaper who will make your yard look pretty",
            "price": 50,
            "rating": 3,
            "profilePicURL": "https://picsum.photos/100"
        },
        {
            "name": "Steven Adams",
            "service": "Hairstyle",
            "description": "Over 5+ years of serving satisfied customers",
            "price": 60,
            "rating": 4,
            "profilePicURL": "https://picsum.photos/101"
        },
        {
            "name": "Alice Schulz",
            "service": "Hairstyle",
            "description": "Best in the business for all your haircutting needs",
            "price": 70,
            "rating": 5,
            "profilePicURL": "https://picsum.photos/102"
        }
        ]
    } 

    arr = []
    for i in all_providers["providers"]:
        if (int(rate) == 0 or i["rating"] >= int(rate)):
            arr.append(i)
        
    some_providers = {
        "providers": arr
    }



    return some_providers