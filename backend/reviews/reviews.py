from flask import Blueprint, request
from DAOs import ReviewsDAO

review_blueprint = Blueprint("review_blueprint", __name__)
reviewDAO = ReviewsDAO()

@review_blueprint.route("/addReview", methods=["POST"])
def add_review():
    json_object = request.json
    booking_id = int(json_object.get("bookingId", None))
    professional_id = int(json_object.get("professionalId", None))
    customer_id = int(json_object.get("customerId", None))
    description = json_object.get("description", None)
    rating = int(json_object.get("rating", None))

    print(booking_id, professional_id, customer_id, description, rating)

    reviewDAO.addReview(booking_id, professional_id, customer_id, description, rating)

    return {"success": "yes"}
