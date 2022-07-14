# # from urllib import request
# from flask import request
# from flask import Blueprint, jsonify
# from jinja2 import Undefined
# from DAOs import CustomersDAO, ProfessionalsDAO, ServicesDAO

# list_providers_blueprint = Blueprint('list_providers_blueprint', __name__)

# profDAO = ProfessionalsDAO()
# serviceDAO = ServicesDAO()
# custDAO = CustomersDAO()

# @list_providers_blueprint.route("/priceRange")
# def get_price_range():
#     res = jsonify({"priceLow": profDAO.getLowestAveragePrice(), "priceHigh": profDAO.getHighestAveragePrice()})
#     return res

# @list_providers_blueprint.route("/listServiceProviders")
# def get_service_provider_list():
#     rate = float(request.args.get('rating'))
#     price_low = float(request.args.get('pricelow', profDAO.getLowestAveragePrice()))
#     price_high = float(request.args.get('pricehigh', profDAO.getHighestAveragePrice()))
#     location = request.args.get('location')
#     service = request.args.get('service').lower()

#     filterByRating = set(profDAO.getProfessionalsWithMinRating(minRating=rate))
#     filterByPrice = set(profDAO.getProfessionalsByAvgPriceRange(minPrice=price_low, maxPrice=price_high))

#     results = filterByRating.intersection(filterByPrice)
#     if location != "":
#         filterByLocation = profDAO.getProfessionalsByLocation(location) 
#         results = results.intersection(filterByLocation)
#     if service != "":
#         filterByServices = serviceDAO.getProfessionalsForService(service)
#         results = results.intersection(filterByServices)
#     results_formatted = []
#     for i in results:
#         if service != "":
#             svc = service
#         elif i.services:
#             svc = i.services[0].serviceName
#         else:
#             svc = ""
#         # review = profDAO.getFirstNReviewsForProfesional(i.id)
#         review = profDAO.getAllReviewsForProfesional(i.id)
#         if len(review) == 0:
#             description = "No Reviews for now!"
#         else:
#             customer = custDAO.getCustomerOnID(review[0].customerID)
#             description = customer.firstName + " " + customer.lastName + " said: " + review[0].description
#         results_formatted.append({ 
#             "id": i.id,
#             "name": i.firstName + " " + i.lastName,
#             "service": svc,
#             "price": i.averageCost,
#             "rating": i.ratings,
#             "location": i.location,
#             "review": description,
#             "profilePicURL": "https://picsum.photos/102"
#         })
#     some_providers = {
#         "providers": results_formatted
#     }

#     return some_providers


# from urllib import request
from flask import request
from flask import Blueprint, jsonify
from jinja2 import Undefined
from DAOs import CustomersDAO, ProfessionalsDAO, ServicesDAO

list_providers_blueprint = Blueprint('list_providers_blueprint', __name__)

profDAO = ProfessionalsDAO()
serviceDAO = ServicesDAO()
custDAO = CustomersDAO()

@list_providers_blueprint.route("/priceRange")
def get_price_range():
    res = jsonify({"priceLow": profDAO.getLowestAveragePrice(), "priceHigh": profDAO.getHighestAveragePrice()})
    return res

@list_providers_blueprint.route("/listServiceProviders")
def get_service_provider_list():
    rate = float(request.args.get('rating'))
    price_low = float(request.args.get('pricelow', profDAO.getLowestAveragePrice()))
    price_high = float(request.args.get('pricehigh', profDAO.getHighestAveragePrice()))
    location = request.args.get('location')
    service = request.args.get('service').lower()

    filterByRating = set(profDAO.getProfessionalsWithMinRating(minRating=rate))
    filterByPrice = set(profDAO.getProfessionalsByAvgPriceRange(minPrice=price_low, maxPrice=price_high))

    results = filterByRating.intersection(filterByPrice)
    if location != "":
        filterByLocation = profDAO.getProfessionalsByLocation(location) 
        results = results.intersection(filterByLocation)
    if service != "":
        filterByServices = serviceDAO.getProfessionalsForService(service)
        results = results.intersection(filterByServices)
    results_formatted = []
    for i in results:
        if service != "":
            svc = service
        elif i.services:
            svc = i.services[0].serviceName
        else:
            svc = ""
        review = profDAO.getFirstNReviewsForProfesional(i.id)
        if len(review) == 0:
            description = "No Reviews for now!"
        else:
            customer = custDAO.getCustomerOnID(review[0].customerID)
            description = customer.firstName + " " + customer.lastName + " said: " + review[0].description
        results_formatted.append({ 
            "id": i.id,
            "name": i.firstName + " " + i.lastName,
            "service": svc,
            "price": i.averageCost,
            "rating": i.ratings,
            "location": i.location,
            "review": description,
            "profilePicURL": "https://picsum.photos/102"
        })
    some_providers = {
        "providers": results_formatted
    }

    return some_providers