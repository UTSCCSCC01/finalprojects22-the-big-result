# from datetime import date, datetime, timedelta, time

# from flask import Blueprint, jsonify, request
# from DAOs import BookingsDAO, CustomersDAO, ProfessionalsDAO

# list_bookings_blueprint = Blueprint('list_bookings_blueprint', __name__)
# bookingDAO, customerDAO, professionalDAO = BookingsDAO(), CustomersDAO(), ProfessionalsDAO()

# def past_future_bookings(bookings):
#     past = []
#     future = []
#     today = datetime.today()
#     for booking in bookings:
#         date = booking.beginServiceDateTime
#         if(today > date):
#             # date = "FALSE " + date.strftime("%B %d, %Y") 
#             # TODO DELETE
#             past.append(booking)
#             bookingDAO.resolveBooking(booking.id)
#         else:
#             # date = "TRUE " + date.strftime("%B %d, %Y")
#             future.append(booking)

#     return (past, future)

# @list_bookings_blueprint.route("/customerUpcomingBookings", methods=["GET"])
# def get_customer_upcoming_bookings():
#     customer_id = int(request.headers.get("customerId", None))
#     output = {'bookings': []}

#     bookings = past_future_bookings(bookingDAO.getBookingsFromStatusForCust(customer_id, "BOOKED"))[1]

#     for booking in bookings:
#       provider = professionalDAO.getProfessionalOnId(booking.professionalID)
#       output['bookings'].append({
#           "id": booking.id,
#           "providerId": provider.id,
#           "provider": provider.firstName + " " + provider.lastName,
#           "service": booking.serviceName,
#           "description": booking.specialInstructions,
#           "cost": booking.price,
#           "picURL": "https://picsum.photos/100",
#           "date": booking.beginServiceDateTime.strftime("%B %d, %Y"),
#           "startTime": booking.beginServiceDateTime.strftime("%I:%M %p"),
#           "endTime": booking.endServiceDateTime.strftime("%I:%M %p"),
#           "location": booking.location
#       })
#     return jsonify(output)

# @list_bookings_blueprint.route("/customerPastBookings", methods=["GET"])
# def get_customer_past_bookings():
#     customer_id = int(request.headers.get("customerId", None))
#     output = {'bookings': []}

#     bookings = bookingDAO.getBookingsFromStatusForCust(customer_id, "RESOLVED")
#     bookings += past_future_bookings(bookingDAO.getBookingsFromStatusForCust(customer_id, "BOOKED"))[0]

#     for booking in bookings:
#         provider = professionalDAO.getProfessionalOnId(booking.professionalID)
#         output['bookings'].append({
#             "id": booking.id,
#             "providerId": provider.id,
#             "provider": provider.firstName + " " + provider.lastName,
#             "service": booking.serviceName,
#             "review": "" if (booking.review is None) else booking.review.description,
#             "price": booking.price,
#             "picURL": "https://picsum.photos/100",
#             "date": booking.beginServiceDateTime.strftime("%B %d, %Y"),
#             "startTime": booking.beginServiceDateTime.strftime("%I:%M %p"),
#             "endTime": booking.endServiceDateTime.strftime("%I:%M %p"),
#             "location": booking.location
#         })
#     return jsonify(output)

# @list_bookings_blueprint.route("/customerCancelledBookings", methods=["GET"])
# def get_customer_cancelled_bookings():
#     customer_id = int(request.headers.get("customerId", None))
#     output = {'bookings': []}
#     bookings = bookingDAO.getBookingsFromStatusForCust(customer_id, "CANCELLED")

#     for booking in bookings:
#         provider = professionalDAO.getProfessionalOnId(booking.professionalID)
#         output['bookings'].append({
#             "id": booking.id,
#             "providerId": provider.id,
#             "provider": provider.firstName + " " + provider.lastName,
#             "service": booking.serviceName,
#             "price": booking.price,
#             "picURL": "https://picsum.photos/100",
#             "date": booking.beginServiceDateTime.strftime("%B %d, %Y"),
#             "startTime": booking.beginServiceDateTime.strftime("%I:%M %p"),
#             "endTime": booking.endServiceDateTime.strftime("%I:%M %p"),
#             "location": booking.location
#         })
#     return jsonify(output)

# @list_bookings_blueprint.route("/professionalUpcomingBookings", methods=["GET"])
# def get_professional_upcoming_bookings():
#     professional_id = int(request.headers.get("professionalId", None))
#     output = {'bookings': []}

#     bookings = past_future_bookings(bookingDAO.getBookingsFromStatusForProf(professional_id, "BOOKED"))[1]

#     for booking in bookings:
#         customer = customerDAO.getCustomerOnID(booking.customerID)
#         output['bookings'].append({
#             "id": booking.id,
#             "customer": customer.firstName + " " + customer.lastName,
#             "service": booking.serviceName,
#             "date": booking.beginServiceDateTime.strftime("%B %d, %Y"),
#             "startTime": booking.beginServiceDateTime.strftime("%I:%M %p"),
#             "endTime": booking.endServiceDateTime.strftime("%I:%M %p"),
#             "location": booking.location,
#             "price": booking.price,
#             "picURL": "https://picsum.photos/100"
#         })        
#     return jsonify(output)
  

# @list_bookings_blueprint.route("/professionalPastBookings", methods=["GET"])
# def get_professional_past_bookings():
#     professional_id = int(request.headers.get("professionalId", None))
#     output = {'bookings': []}

#     bookings = bookingDAO.getBookingsFromStatusForProf(professional_id, "RESOLVED")
#     bookings += past_future_bookings(bookingDAO.getBookingsFromStatusForProf(professional_id, "BOOKED"))[0]

#     for booking in bookings:
#         customer = customerDAO.getCustomerOnID(booking.customerID)
#         output['bookings'].append({
#             "id": booking.id,
#             "customer": customer.firstName + " " + customer.lastName,
#             "service": booking.serviceName,
#             "date": booking.beginServiceDateTime.strftime("%B %d, %Y"),
#             "startTime": booking.beginServiceDateTime.strftime("%I:%M %p"),
#             "endTime": booking.endServiceDateTime.strftime("%I:%M %p"),
#             "location": booking.location,
#             "price": booking.price,
#             "picURL": "https://picsum.photos/100"
#         })      
#     return jsonify(output)

# @list_bookings_blueprint.route("/professionalCancelledBookings", methods=["GET"])
# def get_professional_cancelled_bookings():
#     profId = int(request.headers.get("professionalId", None))
#     output = {'bookings': []}

#     bookings = bookingDAO.getBookingsFromStatusForProf(profId, "CANCELLED")
#     for booking in bookings:
#       customer = customerDAO.getCustomerOnID(booking.customerID)
#       output['bookings'].append({
#           "id": booking.id,
#           "customer": customer.firstName + " " + customer.lastName,
#           "service": booking.serviceName,
#           "date": booking.beginServiceDateTime.strftime("%B %d, %Y"),
#           "startTime": booking.beginServiceDateTime.strftime("%I:%M %p"),
#           "endTime": booking.endServiceDateTime.strftime("%I:%M %p"),
#           "location": booking.location,
#           "price": booking.price,
#           "picURL": "https://picsum.photos/100"
#       })    
#     return jsonify(output)
from datetime import date, datetime, timedelta, time

from flask import Blueprint, jsonify, request
from DAOs import BookingsDAO, CustomersDAO, ProfessionalsDAO

list_bookings_blueprint = Blueprint('list_bookings_blueprint', __name__)
bookingDAO, customerDAO, professionalDAO = BookingsDAO(), CustomersDAO(), ProfessionalsDAO()

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

# TODO (A): refactor and condense these two functions by making a helper function
@list_bookings_blueprint.route("/customerUpcomingBookings", methods=["GET"])
def get_customer_upcoming_bookings():
    customer_id = int(request.headers.get("customerId", None))
    output = {'bookings': []}
    bookings = bookingDAO.getBookingsFromStatusForCust(customer_id, "BOOKED")

    for booking in bookings:
      provider = professionalDAO.getProfessionalOnId(booking.professionalID)
      output['bookings'].append({
          "id": booking.id,
          "providerId": provider.id,
          "provider": provider.firstName + " " + provider.lastName,
          "service": booking.serviceName,
          "description": booking.specialInstructions,
          "cost": booking.price,
          "picURL": "https://picsum.photos/100",
          "date": booking.beginServiceDateTime.strftime("%B %d, %Y"),
          "startTime": booking.beginServiceDateTime.strftime("%I:%M %p"),
          "endTime": booking.endServiceDateTime.strftime("%I:%M %p"),
          "location": booking.location
      })
    print('upcoming bookings', output)
    return jsonify(output)

@list_bookings_blueprint.route("/customerPastBookings", methods=["GET"])
def get_customer_past_bookings():
    customer_id = int(request.headers.get("customerId", None))
    output = {'bookings': []}
    bookings = bookingDAO.getBookingsFromStatusForCust(customer_id, "RESOLVED")
    bookings += past_future_bookings(bookingDAO.getBookingsFromStatusForCust(customer_id, "BOOKED"))[0]

    for booking in bookings:
        provider = professionalDAO.getProfessionalOnId(booking.professionalID)
        output['bookings'].append({
            "id": booking.id,
            "providerId": provider.id,
            "provider": provider.firstName + " " + provider.lastName,
            "service": booking.serviceName,
            "review": "" if (booking.review is None) else booking.review.description,
            "price": booking.price,
            "picURL": "https://picsum.photos/100",
            "date": booking.beginServiceDateTime.strftime("%B %d, %Y"),
            "startTime": booking.beginServiceDateTime.strftime("%I:%M %p"),
            "endTime": booking.endServiceDateTime.strftime("%I:%M %p"),
            "location": booking.location
        })
    return jsonify(output)

@list_bookings_blueprint.route("/customerCancelledBookings", methods=["GET"])
def get_customer_cancelled_bookings():
    customer_id = int(request.headers.get("customerId", None))
    output = {'bookings': []}
    bookings = bookingDAO.getBookingsFromStatusForCust(customer_id, "CANCELLED")

    for booking in bookings:
        provider = professionalDAO.getProfessionalOnId(booking.professionalID)
        output['bookings'].append({
            "id": booking.id,
            "providerId": provider.id,
            "provider": provider.firstName + " " + provider.lastName,
            "service": booking.serviceName,
            "price": booking.price,
            "picURL": "https://picsum.photos/100",
            "date": booking.beginServiceDateTime.strftime("%B %d, %Y"),
            "startTime": booking.beginServiceDateTime.strftime("%I:%M %p"),
            "endTime": booking.endServiceDateTime.strftime("%I:%M %p"),
            "location": booking.location
        })
    return jsonify(output)

# NOTE (A): did some refactoring here... could be improved and could be done for customer endpoints too 
def get_prof_bookings_by_status(profId, status):
  output = {'bookings': []}
  # get list of upcoming bookings
  bookings = bookingDAO.getBookingsFromStatusForProf(profId, status)

  # put into output
  for booking in bookings:
    customer = customerDAO.getCustomerOnID(booking.customerID)
    customer_name = customer.firstName + " " + customer.lastName
    date = booking.beginServiceDateTime.strftime("%B %d, %Y")
    start_time = booking.beginServiceDateTime.strftime("%I:%M %p")
    end_time = booking.endServiceDateTime.strftime("%I:%M %p")

    single_booking = {
        "id": booking.id,
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


@list_bookings_blueprint.route("/professionalUpcomingBookings", methods=["GET"])
def get_professional_upcoming_bookings():
    profId = int(request.headers.get("professionalId", None))
    return get_prof_bookings_by_status(profId, "BOOKED")
  

@list_bookings_blueprint.route("/professionalPastBookings", methods=["GET"])
def get_professional_past_bookings():
    profId = int(request.headers.get("professionalId", None))
    return get_prof_bookings_by_status(profId, "RESOLVED")

@list_bookings_blueprint.route("/professionalCancelledBookings", methods=["GET"])
def get_professional_cancelled_bookings():
    profId = int(request.headers.get("professionalId", None))
    return get_prof_bookings_by_status(profId, "CANCELLED")