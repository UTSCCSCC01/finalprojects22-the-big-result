from flask import Blueprint

from flask import request
from DAOs import ProfessionalsDAO, CustomersDAO, ProfessionalServicesDAO

allReviews_blueprint = Blueprint('allReviews_blueprint', __name__)

@allReviews_blueprint.route('/getAllReviews', methods=["GET"])
def reviews():
    id = request.args.get('id')

    profDAO = ProfessionalsDAO()
    professional = profDAO.getProfessionalOnId(id)
    reviewList = {"reviews": getReviews(profDAO.getAllReviewsForProfesional(id).all()),  # TODO (F) .all() needed?
                    "name": professional.firstName + " " + professional.lastName,}
    print(reviewList)
    return reviewList


def getReviews(reviews) -> list:
    reviewList = []
    custDAO = CustomersDAO()

    for i in range(len(reviews)):
        customer = custDAO.getCustomerOnID(reviews[i].customerID)
        reviewList.append({
            "id": reviews[i].id,
            "service": reviews[i].booking.serviceName,
            "reviewedBy": customer.firstName + " " + customer.lastName,
            "rating": reviews[i].ratings,
            "imageLink": "https://picsum.photos/100",
            "reviewDescription": reviews[i].description
        })
    return reviewList