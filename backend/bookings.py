from flask import Blueprint, jsonify

bookingsBlueprint = Blueprint("bookings", __name__)

@bookingsBlueprint.route("/upcomingBookings")
def getUpcomingBookings():
    return jsonify({ "upcoming bookings": [
            {
                "customer": "Jason Brown",
                "provider": "Steven Adams",
                "serviceTime": "10:15",
                "location": "72 Windrush Trail Toronto, Ontario",
                "price": "10.00",
                "serviceType": "Hairstyling"
            },
            {
                "customer": "Emily Williams",
                "provider": "Steven Adams",
                "serviceTime": "9:30",
                "location": "39 Griffen Dr. Toronto, Ontario",
                "price": "10.00",
                "serviceType": "Makeup"
            }
        ]
    })
