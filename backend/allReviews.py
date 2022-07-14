from flask import Blueprint

from flask import request
from DAOs import ProfessionalsDAO, CustomersDAO, ProfessionalServicesDAO

reviews_blueprint = Blueprint('reviews_blueprint', __name__)

@reviews_blueprint.route('/getAllReviews', methods=["GET"])
def reviews():
    id = request.args.get('id')

    profDAO = ProfessionalsDAO()
    # getReviews(profDAO.getAllReviewsForProfesional(id))
    return {"reviews": getReviews(profDAO.getAllReviewsForProfesional(id))} # First n? All?


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
    print(reviewList)
    return reviewList