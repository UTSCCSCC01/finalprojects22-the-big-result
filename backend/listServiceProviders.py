# from urllib import request
from flask import request
from flask import Blueprint, jsonify
from DAOs import CustomersDAO, ProfessionalsDAO, ServicesDAO

list_providers_blueprint = Blueprint('list_providers_blueprint', __name__)

@list_providers_blueprint.route("/listServiceProviders")
def get_service_provider_list():

    rate = int(request.args.get('rating'))
    price_low = int(request.args.get('pricelow'))
    price_high = int(request.args.get('pricehigh'))
    location = request.args.get('location')
    service = request.args.get('service')

    # TODO Rating on Card (frontend)
    # TODO Get rid of apply filters button
    all_providers= { "providers": [
        {
            "name": "Mike Ross",
            "service": "Landscaping",
            "description": "Landscaper who will make your yard look pretty",
            "price": 50,
            "rating": 3,
            "location": "Toronto, Ontario",
            "profilePicURL": "https://picsum.photos/100"
        },
        {
            "name": "Steven Adams",
            "service": "Hairstyle",
            "description": "Over 5+ years of serving satisfied customers",
            "price": 60,
            "rating": 4,
            "location": "Waterloo, Ontario",
            "profilePicURL": "https://picsum.photos/101"
        },
        {
            "name": "Alice Schulz",
            "service": "Hairstyle",
            "description": "Best in the business for all your haircutting needs",
            "price": 70,
            "rating": 5,
            "location": "Toronto, Ontario",
            "profilePicURL": "https://picsum.photos/102"
        }
        ]
    } 


    profDAO = ProfessionalsDAO()
    serviceDAO = ServicesDAO()
    filterByRating = set(profDAO.getProfessionalsWithMinRating(minRating=rate))
    filterByPrice = set(profDAO.getProfessionalsByAvgPriceRange(minPrice=price_low, maxPrice=price_high))
    # filterByLocation = profDAO.getProfessionalsByLocation(location)
    # filterByServices = serviceDAO.getProfessionalsForService(service)

    results = filterByRating.intersection(filterByPrice)
    results_formatted = []
    for i in results:
        results_formatted.append({ 
            "name": i.firstName + " " + i.lastName,
            "service": i.description.strip('][').split(',')[0],
            "price": i.averageCost,
            "rating": i.ratings,
            "location": "Toronto, Ontario",
            "profilePicURL": "https://picsum.photos/102"
        })
        
    # arr = []
    # # TODO Should rating display providers with rating and up or just rating? (4 = 4 & 5 or just 4?)
    # for i in all_providers["providers"]:
    #     print(i["service"])
    #     if (rate == 0 or i["rating"] >= rate) and price_low <= i["price"] and price_high >= i["price"] and \
    #         (service == "" or i["service"] == service) and (location == "" or location == i["location"]):
    #         arr.append(i)

    some_providers = {
        "providers": results_formatted
    }

    return some_providers