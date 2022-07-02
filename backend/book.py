from datetime import date, datetime, timedelta, time

from flask import Blueprint, jsonify, request
from DAOs import BookingsDAO
from events import bookings

book_blueprint = Blueprint('book_blueprint', __name__)
bookingDAO_Object = BookingsDAO()

def get_week_by_professional(professional_id: int, start_date: date):
    range_start = datetime.combine(start_date, time(0, 0, 0))
    range_end = datetime.combine(start_date + timedelta(days=7), time(0, 0, 0))

    week_bookings = bookingDAO_Object.getBookingsFromProfIDinRangeIncl(professional_id, range_start, range_end)
    week_bookings = sorted(week_bookings, key=lambda b: b.beginServiceDateTime, reverse=True)

    return week_bookings


# bookings for professional
@book_blueprint.route('/addBookings', methods=["POST"])
def add_bookings():
    # THEB-8
    pass


@book_blueprint.route('/getBookings', methods=["GET"])
def get_bookings():
    professional_id = int(request.headers.get("professionalId", None))
    print('start_date for booking:', request.headers.get("start", None))
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

    print('booking schedule', formatted_schedule)
    return jsonify(formatted_schedule)
