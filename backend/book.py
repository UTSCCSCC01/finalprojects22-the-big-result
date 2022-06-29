from flask import Blueprint, jsonify, request
from events import bookings

book_blueprint = Blueprint('book_blueprint', __name__)


# bookings for professional
@book_blueprint.route('/addBookings', methods=["POST"])
def add_bookings():
    pass

@book_blueprint.route('/getBookings', methods=["GET"])
def get_bookings():
    return jsonify(bookings)
    
