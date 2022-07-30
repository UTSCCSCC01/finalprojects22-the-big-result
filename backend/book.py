from datetime import date, datetime, timedelta, time
from tracemalloc import start

from flask import Blueprint, jsonify, request
from DAOs import BookingsDAO, ProfessionalsDAO
from models import Status
from gmailAPI import newBooking as notifyProfOfBooking, rescheduleBooking as notifyProfOfReschedule

book_blueprint = Blueprint('book_blueprint', __name__)
bookingDAO = BookingsDAO()
professionalDAO = ProfessionalsDAO()


# def get_week_by_professional(professional_id: int, start_date: date):
#     range_start = datetime.combine(start_date, time(0, 0, 0))
#     range_end = datetime.combine(start_date + timedelta(days=7), time(0, 0, 0))

#     week_bookings = bookingDAO.getNonCancelledBookingsFromProfIDinRangeWithStatusIncl(professional_id, range_start, range_end)
#     # week_bookings = bookingDAO.getBookingsFromProfIDinRangeWithStatusIncl(professional_id, range_start, range_end, Status.CANCELLED)
#     # week_bookings_non_cancelled = filter(lambda booking: booking.status!=Status.CANCELLED, week_bookings)
#     week_bookings = sorted(week_bookings, key=lambda b: b.beginServiceDateTime, reverse=True)
    
#     return week_bookings

def get_week_by_professional(professional_id: int, start_date: date):
    range_start = datetime.combine(start_date, time(0, 0, 0))
    range_end = datetime.combine(start_date + timedelta(days=7), time(0, 0, 0))

    week_bookings = bookingDAO.getBookingsFromProfIDinRangeWithStatusIncl(professional_id, range_start, range_end, Status.CANCELLED, invertStatus=True)
    week_bookings = sorted(week_bookings, key=lambda b: b.beginServiceDateTime, reverse=True)
    
    return week_bookings

# bookings for professional
@book_blueprint.route('/addBookings', methods=["POST"])
def add_bookings():
    json_object = request.json
    customer_id = int(json_object.get("customerId", None))
    service = json_object.get("service", None)
    professional_id = int(json_object.get("professionalId", None))

    isRescheduling = "reschedule" in json_object and json_object["reschedule"]
    if isRescheduling:
        booking_id = int(json_object.get("id", None)) 
        cost = bookingDAO.getBookingByID(booking_id).price
    else:
        cost = float(json_object["cost"])

    day_of_booking = date.fromisoformat(json_object.get("date", None))
    time_begin = time.fromisoformat(json_object.get("start", None))
    time_end = time.fromisoformat(json_object.get("end", None))
    instructions = json_object.get("instructions")

    # get service, location, from professional chosen using professional_id
    chosen_professional = professionalDAO.getProfessionalOnId(professional_id)
    location = chosen_professional.location
    startDayTime = datetime.combine(day_of_booking, time_begin)
    endDayTime = datetime.combine(day_of_booking, time_end)

    bookingDAO.addBooking(customer_id, professional_id, startDayTime, endDayTime, location, 
                            Status.BOOKED, cost, service, instructions)

    if isRescheduling:
        bookingDAO.setBookingAsRescheduled(booking_id)
        notifyProfOfReschedule(booking_id, customer_id, professional_id, startDayTime, endDayTime, location, instructions)
    else:
        notifyProfOfBooking(customer_id, professional_id, startDayTime, endDayTime, location, service, instructions)

    return {"success": "yes"}

@book_blueprint.route('/getBookings', methods=["GET"])
def get_bookings():
    professional_id = int(request.headers.get("professionalId", None))
    start_date = date.fromisoformat(request.headers.get("start", None))
    weekly_bookings = get_week_by_professional(professional_id, start_date)

    formatted_schedule = {}
    for i in range(7):
        current_date = start_date + timedelta(days=i)
        formatted_schedule[str(i)] = []

        while weekly_bookings:
            booking = weekly_bookings.pop()
            if booking.beginServiceDateTime.date() > current_date:
                weekly_bookings.append(booking)
                break
            
            if booking.status == Status.RESCHEDULED or booking.status == Status.CANCELLED:
              continue

            start_time = booking.beginServiceDateTime.time()
            end_time = booking.endServiceDateTime.time()
            formatted_schedule[str(i)].append({
                "start": start_time.isoformat(),
                "end": end_time.isoformat(),
            })
    return jsonify(formatted_schedule)


@book_blueprint.route('/cancelBooking', methods=["PUT"])
def cancel_booking():
    bookingId = int(request.json.get("id", None))
    bookingDAO.cancelBooking(bookingId)
    return { "id": bookingId }, 200

@book_blueprint.route('/resolveBooking', methods=["PUT"])
def resolve_booking():
    bookingId = int(request.json.get("id", None))
    bookingDAO.resolveBooking(bookingId)
    return { "id": bookingId }, 200

