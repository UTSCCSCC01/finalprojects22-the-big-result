from flask import Blueprint, jsonify

list_bookings_blueprint = Blueprint('list_bookings_blueprint', __name__)

@list_bookings_blueprint.route("/professionalUpcomingBookings")
def getUpcomingBookings():
    return jsonify({ "bookings": [
            {
                "customer": "Jason Brown",
                "service": "Hairstyling",
                "date": "2 July 2022",
                "time": "10:15am",
                "location": "72 Windrush Trail Toronto, Ontario",
                "price": "10.00",
                "picURL": "https://picsum.photos/100"
            },
            {
                "customer": "Emily Williams",
                "service": "Hairstyling",
                "date": "2 July 2022",
                "time": "10:15am",
                "location": "39 Griffen Dr. Toronto, Ontario",
                "price": "10.00",
                "picURL": "https://picsum.photos/100"
            },
            {
                "customer": "Paige Johnson",
                "service": "Hairstyling",
                "date": "2 July 2022",
                "time": "10:15am",
                "location": "5 Snowhill Crescent Toronto, Ontario",
                "price": "10.00",
                "picURL": "https://picsum.photos/100"
            }
        ]
    })
