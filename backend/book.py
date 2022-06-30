from flask import Blueprint, jsonify, request
from events import bookings

book_blueprint = Blueprint('book_blueprint', __name__)


# bookings for professional
@book_blueprint.route('/addBookings', methods=["POST"])
def add_bookings():
    # THEB-8
    pass

@book_blueprint.route('/getBookings', methods=["GET"])
def get_bookings():
    """
    professionalId: xikn21o9
    start: YYYY-MM-DD
    --> provide the bookings for the next 7 days
    """


    """
    {
    '0' : { // SUNDAY
            '0' : { // first time slot
               "start" : HH:MM:SS (0-24)
               "end" : HH:MM:SS (0-24)
                }


            },
        '1' : {} // Nothing on monday
    }
    """
    return jsonify(bookings)
    
