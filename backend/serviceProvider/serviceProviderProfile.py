from flask import request
from flask import Blueprint, jsonify
from DAOs import ProfessionalsDAO, CustomersDAO

serviceProviderBlueprint = Blueprint("serviceProvider", __name__)

@serviceProviderBlueprint.route("/serviceProvider")
def getServiceProviderProfile():

    dao = ProfessionalsDAO()
    print(request.args.get("id"))
    professional = dao.getProfessionalOnId(request.args.get("id"))

    return {
            "name": professional.firstName + " " + professional.lastName,
            "rating": professional.ratings,
            "description": professional.description,
            "services": getServices(professional.services),
            "profilePictureLink": "https://picsum.photos/200",
            "calendar": "Some calendar stuff here that we would probably need later on",
            "reviews": getReviews(dao.getAllReviewsForProfesional(professional.id))
        }

def getServices(services):
    result = ""
    for service in services:
        if result == "":
            result = service.serviceName
        else:
            result = result + "," + service.serviceName
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
