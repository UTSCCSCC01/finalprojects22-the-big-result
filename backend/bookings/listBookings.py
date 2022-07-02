from datetime import date, datetime, timedelta, time

from flask import Blueprint, jsonify, request
from DAOs import BookingsDAO, ProfessionalsDAO

list_bookings_blueprint = Blueprint('list_bookings_blueprint', __name__)
bookingDAO = BookingsDAO()
professionalDAO = ProfessionalsDAO()

@list_bookings_blueprint.route("/customerUpcomingBookings", methods=["GET"])
def get_customer_upcoming_bookings():
    customer_id = int(request.headers.get("customerId", None))
    output = {'bookings': []}

    bookings = bookingDAO.getBookingsFromStatusForCust(customer_id, "BOOKED")

    for booking in bookings:
        provider = professionalDAO.getProfessionalOnId(booking.professionalID)
        provider_name = provider.firstName + " " + provider.lastName
        date = booking.beginServiceDateTime.strftime("%B %d, %Y")
        start_time = booking.beginServiceDateTime.strftime("%I:%M %p")
        end_time = booking.endServiceDateTime.strftime("%I:%M %p")

        single_booking = {
            "provider": provider_name,
            "service": booking.serviceName,
            "description": booking.specialInstructions,
            "cost": booking.price,
            "picURL": "https://picsum.photos/100",
            "date": date,
            "startTime": start_time,
            "endTime": end_time
        }
        output['bookings'].append(single_booking)

    return jsonify(output)

# @list_bookings_blueprint.route("/customerPastBookings", methods=["GET"])
# def get_customer_past_bookings():
#     customer_id = int(request.headers.get("customerId", None))
#     output = {'bookings': []}

#     bookings = bookingDAO.getBookingsFromStatusForCust(customer_id, "RESOLVED")

#     for booking in bookings:
#         provider = professionalDAO.getProfessionalOnId(booking.professionalID)
#         provider_name = provider.firstName + " " + provider.lastName
#         date = booking.beginServiceDateTime.strftime("%B %d, %Y")
#         start_time = booking.beginServiceDateTime.strftime("%I:%M %p")
#         end_time = booking.endServiceDateTime.strftime("%I:%M %p")


#         single_booking = {
#             "provider": provider_name,
#             "service": booking.serviceName,
#             "review": "",
#             "cost": booking.price,
#             "picURL": "https://picsum.photos/100",
#             "date": date,
#             "startTime": start_time,
#             "endTime": end_time
#         }
#         output['bookings'].append(single_booking)

#     return jsonify(output)


@list_bookings_blueprint.route("/customerPastBookings")
def get_customer_past_bookings():
    return { "bookings": [
        {
            "provider": "Mike Ross",
            "service": "Landscaping",
            "review": "Sample long review to test how it looks after wrapping around",
            "cost": 50,
            "picURL": "https://picsum.photos/100",
            "date": "2 July 2022",
            "time": "10 am"
        },
        {
            "provider": "Steven Adams",
            "service": "Hairstyle",
            "review": "Sample long review to test how it looks after wrapping around",
            "cost": 60,
            "picURL": "https://picsum.photos/101",
            "date": "2 July 2022",
            "time": "10 am"
        },
        {
            "provider": "Alice Schulz",
            "service": "Hairstyle",
            "review": "",
            "cost": 70,
            "picURL": "https://picsum.photos/102",
            "date": "2 July 2022",
            "time": "10 am"
        }
        ]
    }