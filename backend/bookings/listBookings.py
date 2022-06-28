from flask import Blueprint, jsonify

list_bookings_blueprint = Blueprint('list_bookings_blueprint', __name__)

@list_bookings_blueprint.route("/customerUpcomingBookings")
def get_customer_upcoming_bookings():
    return { "bookings": [
        {
            "provider": "Mike Ross",
            "service": "Landscaping",
            "description": "Landscaper who will make your yard look pretty",
            "cost": 50,
            "picURL": "https://picsum.photos/100",
            "date": "2 July 2022",
            "time": "10 am"
        },
        {
            "provider": "Steven Adams",
            "service": "Hairstyle",
            "description": "Over 5+ years of serving satisfied customers",
            "cost": 60,
            "picURL": "https://picsum.photos/101",
            "date": "2 July 2022",
            "time": "10 am"
        },
        {
            "provider": "Alice Schulz",
            "service": "Hairstyle",
            "description": "Best in the business for all your haircutting needs",
            "cost": 70,
            "picURL": "https://picsum.photos/102",
            "date": "2 July 2022",
            "time": "10 am"
        }
        ]
    } 