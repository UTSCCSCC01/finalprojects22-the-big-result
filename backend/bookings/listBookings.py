from flask import Blueprint, jsonify

list_bookings_blueprint = Blueprint('list_bookings_blueprint', __name__)

@list_bookings_blueprint.route("/professionalUpcomingBookings")
def getUpcomingBookings():
    return jsonify({ "bookings": [
            {
                "customer": "Jason Brown",
                "serviceType": "Hairstyling",
                "serviceDate": "2 July 2022",
                "serviceTime": "10:15",
                "location": "72 Windrush Trail Toronto, Ontario",
                "price": "10.00",
                "picURL": "https://picsum.photos/100"
            },
            {
                "customer": "Emily Williams",
                "serviceType": "Hairstyling",
                "serviceDate": "2 July 2022",
                "serviceTime": "10:15",
                "location": "39 Griffen Dr. Toronto, Ontario",
                "price": "10.00",
                "picURL": "https://picsum.photos/100"
            }
        ]
    })
