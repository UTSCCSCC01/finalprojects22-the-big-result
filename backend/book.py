from datetime import date, datetime, timedelta, time

from flask import Blueprint, jsonify, request
from DAOs import BookingsDAO, ProfessionalsDAO
from models import Status

book_blueprint = Blueprint('book_blueprint', __name__)
bookingDAO_Object = BookingsDAO()
professionalDAO_Object = ProfessionalsDAO()


def get_week_by_professional(professional_id: int, start_date: date):
    range_start = datetime.combine(start_date, time(0, 0, 0))
    range_end = datetime.combine(start_date + timedelta(days=7), time(0, 0, 0))

    week_bookings = bookingDAO_Object.getBookingsFromProfIDinRangeIncl(professional_id, range_start, range_end)
    week_bookings = sorted(week_bookings, key=lambda b: b.beginServiceDateTime, reverse=True)

    return week_bookings


# bookings for professional
@book_blueprint.route('/addBookings', methods=["POST"])
def add_bookings():
    json_object = request.json
    customer_id = int(json_object.get("customerId", None))
    professional_id = int(json_object.get("professionalId", None))
    day_of_booking = date.fromisoformat(json_object.get("date", None))
    time_begin = time.fromisoformat(json_object.get("start", None))
    time_end = time.fromisoformat(json_object.get("end", None))
    instructions = json_object.get("instructions")
    
    # get service, location, from professional chosen using professional_id
    chosen_professional = professionalDAO_Object.getProfessionalOnId(professional_id)
    location = chosen_professional.location
    service = chosen_professional.services[0].serviceName
    price = chosen_professional.averageCost
    # service = json_object.get("serviceName")
    # location = json_object.get("location")
    # price = float(json_object.get("price"))

    print(customer_id, professional_id, datetime.combine(day_of_booking, time_begin),
                                 datetime.combine(day_of_booking, time_end), location, Status.BOOKED, price, service,
                                 instructions)

    bookingDAO_Object.addBooking(customer_id, professional_id, datetime.combine(day_of_booking, time_begin),
                                 datetime.combine(day_of_booking, time_end), location, Status.BOOKED, price, service,
                                 instructions)

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

            start_time = booking.beginServiceDateTime.time()
            end_time = booking.endServiceDateTime.time()
            formatted_schedule[str(i)].append({
                "start": start_time.isoformat(),
                "end": end_time.isoformat()
            })
    print(formatted_schedule)
    return jsonify(formatted_schedule)


# .. for booking information 
# @book_blueprint.route("/getProfessional")
# def get_professional_info():
#     dao = ProfessionalsDAO()
#     print(request.args.get("id"))
#     professional = dao.getProfessionalOnId(request.args.get("id"))
#     return {
#             "name": professional.firstName + " " + professional.lastName,
#             "rating": professional.ratings,
#             "description": professional.description,
#             "services": professional.services,
#             "profilePictureLink": "https://picsum.photos/200",
#             "calendar": "Some calendar stuff here that we would probably need later on",
#             "reviews": dao.getAllReviewsForProfesional(professional.id)
#         }