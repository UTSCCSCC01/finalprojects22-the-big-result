import json
from flask import request
from flask import Blueprint, jsonify
from DAOs import ProfessionalsDAO, CustomersDAO, ProfessionalServicesDAO

serviceProviderBlueprint = Blueprint("serviceProvider", __name__)

@serviceProviderBlueprint.route("/serviceProvider", methods=["GET"])
def getServiceProviderProfile():

    dao = ProfessionalsDAO()
    profId = request.args.get("id")
    print(profId)
    professional = dao.getProfessionalOnId(profId)
    servicelst = getServices(professional.services)

    res = {
            "name": professional.firstName + " " + professional.lastName,
            "rating": professional.ratings,
            "description": professional.description,
            "services": servicelst,
            "profilePictureLink": "https://picsum.photos/200",
            "location": professional.location,
            "calendar": "Some calendar stuff here that we would probably need later on", # TODO (A): remove this?
            "reviews": getReviews(dao.getAllReviewsForProfesional(professional.id).all()),
            "serviceDescriptions": getDescriptions(int(profId), servicelst)
        }
    print(res)
    return jsonify(res)

@serviceProviderBlueprint.route("/serviceProvider", methods=["PUT"])
def updateServiceProviderProfile():

    json_object = request.json
    id = json_object.get("id")
    profilePictureLink = json_object.get("profilePictureLink")
    description = json_object.get("description")
    services = json_object.get("services")
    # location = json_object.get("location")
    servicesDesc = json_object.get("servicesDesc")

    # print (servicesDesc[0].get("price"))
    # print (services)
    # print(id, description, services)

    dao = ProfessionalsDAO()
    dao.updateDescForProfessional(id, description)
    cur_services = getServices(dao.getAllServicesForProfessional(id))

    delete_services = [service for service in cur_services if service not in services]
    # add_services = [service for service in services if service not in cur_services]
    add_services = []
    for serviceDesc in servicesDesc:
        if serviceDesc.get("service") not in cur_services:
            add_services.append(serviceDesc)

    dao_service = ProfessionalServicesDAO()
    for service in add_services:
        dao_service.addServiceProvidedByProfessional(id, service.get("service"), 
                                                    service.get("price"), service.get("desc"))
        
    for service in delete_services:
        dao_service.removeServiceProvidedByProfessional(id, service)

    return {"status": 200}

# def getServices(services):
#     result = ""
#     for service in services:
#         if result == "":
#             result = service.serviceName
#         else:
#             result = result + "," + service.serviceName
#     return result
def getServices(services) -> list:
    result = []
    for service in services:
        result.append(service.serviceName)
    return result

def getReviews(reviews, numRevs = 3) -> list:
    reviewList = []
    custDAO = CustomersDAO()

    for i in range(min(len(reviews), numRevs)):
        customer = custDAO.getCustomerOnID(reviews[i].customerID)
        reviewList.append({
            "service": reviews[i].booking.serviceName,
            "reviewedBy": customer.firstName + " " + customer.lastName,
            "rating": reviews[i].ratings,
            "imageLink": "https://picsum.photos/100",
            "reviewDescription": reviews[i].description
        })
    return reviewList

def getDescriptions(id, services) -> list:
  profDao = ProfessionalServicesDAO()
  descriptions = {}
  for service in services:
    descriptions[service] = profDao.getDescriptionOfServicesByProfessional(id, service)
  return descriptions