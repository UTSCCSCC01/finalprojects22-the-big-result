from datetime import date, datetime, timedelta, time

from flask import Blueprint, jsonify, request
from events import bookings

book_blueprint = Blueprint('book_blueprint', __name__)


def get_week_by_professional(professional_id: int, start_date: date):
    range_start = datetime.combine(start_date, time(0, 0, 0))
    range_end = datetime.combine(start_date + timedelta(days=7), time(0, 0, 0))

    week_bookings = []  # getBookingsFromProfIDinRangeIncl(professionalId, range_start, range_end)
    week_bookings = sorted(week_bookings, key=lambda b: b.beginServiceDateTime, reverse=True)

    return week_bookings


# bookings for professional
@book_blueprint.route('/addBookings', methods=["POST"])
def add_bookings():
    # THEB-8
    pass


@book_blueprint.route('/getBookings', methods=["GET"])
def get_bookings():
    """
    professionalId: xikn21o9
    start: YYYY-MM-DD
    --> provide the bookings for the next 7 days
    """

    """
    {
    '0' : { // SUNDAY
            '0' : { // first time slot
               "start" : HH:MM:SS (0-24)
               "end" : HH:MM:SS (0-24)
                }


            },
        '1' : {} // Nothing on monday
    }
    """
    professional_id = request.json.get("professionalId", None)
    start_date = date.fromisoformat(request.json.get("start", None))
    weekly_bookings = get_week_by_professional(professional_id, start_date)

    formatted_schedule = []
    for i in range(7):
        current_date = start_date + timedelta(days=i)
        formatted_schedule.append([])

        while weekly_bookings:
            booking = weekly_bookings.pop()
            if booking.beginServiceDateTime.date() > current_date:
                weekly_bookings.append(booking)
                break

            start_time = booking.beginServiceDateTime.time()
            end_time = booking.endServiceDateTime.time()
            formatted_schedule[i].append({
                "start": start_time.isoformat(),
                "end": end_time.isoformat()
            })

    return jsonify(formatted_schedule)
