from datetime import date, datetime, timedelta, time

from flask import Blueprint, jsonify, request
from DAOs import BookingsDAO, CustomersDAO

list_bookings_blueprint = Blueprint('list_bookings_blueprint', __name__)
bookingDAO = BookingsDAO()
customerDAO = CustomersDAO()

@list_bookings_blueprint.route("/professionalUpcomingBookings", methods=["GET"])
def get_professional_upcoming_bookings():
    professional_id = int(request.headers.get("professionalId", None))

    output = {'bookings': []}

    # get list of upcoming bookings
    bookings = bookingDAO.getBookingsFromStatusForProf(professional_id, "BOOKED")

    # put into output
    for booking in bookings:
        customer = customerDAO.getCustomerOnID(booking.customerID)
        customer_name = customer.firstName + " " + customer.lastName
        date = booking.beginServiceDateTime.strftime("%B %d, %Y")
        start_time = booking.beginServiceDateTime.strftime("%I:%M %p")
        end_time = booking.endServiceDateTime.strftime("%I:%M %p")

        single_booking = {
            "customer": customer_name,
            "service": booking.serviceName,
            "date": date,
            "startTime": start_time,
            "endTime": end_time,
            "location": booking.location,
            "price": booking.price,
            "picURL": "https://picsum.photos/100"
        }
        output['bookings'].append(single_booking)

    # return output
    return jsonify(output)



# @list_bookings_blueprint.route("/professionalUpcomingBookings")
# def get_professional_upcoming_bookings():
#     return jsonify({ "bookings": [
#             {
#                 "customer": "Jason Brown",
#                 "service": "Hairstyling",
#                 "date": "2 August 2022",
#                 "time": "10:15am",
#                 "location": "72 Windrush Trail Toronto, Ontario",
#                 "price": "10.00",
#                 "picURL": "https://picsum.photos/100"
#             },
#             {
#                 "customer": "Emily Williams",
#                 "service": "Hairstyling",
#                 "date": "2 August 2022",
#                 "time": "10:15am",
#                 "location": "39 Griffen Dr. Toronto, Ontario",
#                 "price": "10.00",
#                 "picURL": "https://picsum.photos/100"
#             },
#             {
#                 "customer": "Paige Johnson",
#                 "service": "Hairstyling",
#                 "date": "2 August 2022",
#                 "time": "10:15am",
#                 "location": "5 Snowhill Crescent Toronto, Ontario",
#                 "price": "10.00",
#                 "picURL": "https://picsum.photos/100"
#             }
#         ]
#     })

@list_bookings_blueprint.route("/professionalPastBookings")
def get_professional_past_bookings():
    return jsonify({ "bookings": [
            {
                "customer": "Jason Brown",
                "service": "Hairstyling",
                "date": "6 April 2022",
                "time": "11:15am",
                "location": "72 Windrush Trail Toronto, Ontario",
                "price": "10.00",
                "picURL": "https://picsum.photos/100"
            },
            {
                "customer": "Emily Williams",
                "service": "Hairstyling",
                "date": "25 April 2022",
                "time": "2:15pm",
                "location": "39 Griffen Dr. Toronto, Ontario",
                "price": "10.00",
                "picURL": "https://picsum.photos/100"
            },
            {
                "customer": "Paige Johnson",
                "service": "Hairstyling",
                "date": "12 May 2022",
                "time": "3:15pm",
                "location": "5 Snowhill Crescent Toronto, Ontario",
                "price": "10.00",
                "picURL": "https://picsum.photos/100"
            }
        ]
    })
