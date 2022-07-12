from datetime import date, datetime, timedelta, time

from flask import Blueprint, jsonify, request
from DAOs import BookingsDAO, CustomersDAO, ProfessionalsDAO

list_bookings_blueprint = Blueprint('list_bookings_blueprint', __name__)
bookingDAO = BookingsDAO()
customerDAO = CustomersDAO()
professionalDAO = ProfessionalsDAO()

def past_future_bookings(bookings):
    past = []
    future = []
    today = datetime.today()
    for booking in bookings:
        date = booking.beginServiceDateTime
        if(today > date):
            # date = "FALSE " + date.strftime("%B %d, %Y") 
            # TODO DELETE
            past.append(booking)
            bookingDAO.resolveBooking(booking.id)
        else:
            # date = "TRUE " + date.strftime("%B %d, %Y")
            future.append(booking)

    return (past, future)

@list_bookings_blueprint.route("/customerUpcomingBookings", methods=["GET"])
def get_customer_upcoming_bookings():
    customer_id = int(request.headers.get("customerId", None))
    output = {'bookings': []}

    bookings = past_future_bookings(bookingDAO.getBookingsFromStatusForCust(customer_id, "BOOKED"))[1]

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

@list_bookings_blueprint.route("/customerPastBookings", methods=["GET"])
def get_customer_past_bookings():
    customer_id = int(request.headers.get("customerId", None))
    output = {'bookings': []}

    bookings = bookingDAO.getBookingsFromStatusForCust(customer_id, "RESOLVED")
    bookings += past_future_bookings(bookingDAO.getBookingsFromStatusForCust(customer_id, "BOOKED"))[0]

    for booking in bookings:
        provider = professionalDAO.getProfessionalOnId(booking.professionalID)
        provider_name = provider.firstName + " " + provider.lastName
        date = booking.beginServiceDateTime.strftime("%B %d, %Y")
        start_time = booking.beginServiceDateTime.strftime("%I:%M %p")
        end_time = booking.endServiceDateTime.strftime("%I:%M %p")

        if (booking.review is None):
            review = ""
        else:
            review = booking.review.description


        single_booking = {
            "provider": provider_name,
            "service": booking.serviceName,
            "review": review,
            "cost": booking.price,
            "picURL": "https://picsum.photos/100",
            "date": date,
            "startTime": start_time,
            "endTime": end_time
        }
        output['bookings'].append(single_booking)

    return jsonify(output)

@list_bookings_blueprint.route("/professionalUpcomingBookings", methods=["GET"])
def get_professional_upcoming_bookings():
    professional_id = int(request.headers.get("professionalId", None))
    output = {'bookings': []}

    # get list of upcoming bookings
    bookings = past_future_bookings(bookingDAO.getBookingsFromStatusForProf(professional_id, "BOOKED"))[1]

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

@list_bookings_blueprint.route("/professionalPastBookings", methods=["GET"])
def get_professional_past_bookings():
    professional_id = int(request.headers.get("professionalId", None))
    output = {'bookings': []}

    bookings = bookingDAO.getBookingsFromStatusForProf(professional_id, "RESOLVED")
    bookings += past_future_bookings(bookingDAO.getBookingsFromStatusForProf(professional_id, "BOOKED"))[0]

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

    return jsonify(output)