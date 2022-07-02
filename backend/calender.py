import math

from flask import Blueprint

from models import DayOfWeek, IsAvailable, AvailabilitiesNonRec
# from events import recurringAvailabilities, allAvailabilities
from flask import Blueprint, request, jsonify
from datetime import date, time, timedelta, datetime
from book import get_week_by_professional
from DAOs import AvailabilitiesRecDAO, AvailabilitiesNonRecDAO

calender_blueprint = Blueprint('calender_blueprint', __name__)
recDAO_Object = AvailabilitiesRecDAO()
nonRecDao_Object = AvailabilitiesNonRecDAO()


# all availabilities - recurring and non-recurring merged
@calender_blueprint.route('/getAvailability', methods=["GET"])
def get_availability():
    # Get relevant data
    
    professional_id = int(request.headers.get("professionalId", None))
    print('professional_id', professional_id)
    
    start_date = date.fromisoformat(request.headers.get("start", None))
    print('start_date FOR AVAILABILITY', start_date)

    is_customer = request.headers.get("type", None) == "customer"
    print('is_customer', is_customer)

    weekly_schedule = [[0 for _ in range(24 * 2 + 1)] for _ in range(7)]
    bookings = get_week_by_professional(professional_id, start_date)

    # Map out their availabilities and bookings in O(A + B) time
    for i in range(7):
        current_date = start_date + timedelta(days=i)
        availabilities = nonRecDao_Object.getAvailabilitiesFromProfIDAndDate(professional_id, current_date) or \
                         recDAO_Object.getAvailabilitiesFromProfIDAndDay(professional_id, DayOfWeek(i))

        if len(availabilities) == 1 and type(availabilities[0]) == AvailabilitiesNonRec and not availabilities[
            0].isAvailable:
            availabilities = []

        if not availabilities:
            continue

        for availability in availabilities:
            start_index = availability.startTime.hour * 2 + availability.startTime.minute // 30
            end_index = availability.endTime.hour * 2 + availability.endTime.minute // 30
            weekly_schedule[i][start_index] += 1
            weekly_schedule[i][end_index] += -1

        # Go through the bookings for that day, and filter that time out
        while bookings:
            booking = bookings.pop()
            if booking.beginServiceDateTime.date() > current_date:
                bookings.append(booking)
                break

            start_time = booking.beginServiceDateTime.time()
            end_time = booking.endServiceDateTime.time()

            weekly_schedule[i][start_time.hour * 2 + start_time.minute // 30] += -1
            weekly_schedule[i][end_time.hour * 2 + end_time.minute // 30] += 1

    # Calculate finalized schedule for the week and format it for the user
    formatted_schedule = {}
    session_length = 60
    connection_length = math.ceil(session_length / 30)
    for i in range(7):
        formatted_schedule[str(i)] = []
        block_value = 0
        blocks_connected = 0
        start_time = None

        for x in range(len(weekly_schedule[i])):
            block_value += weekly_schedule[i][x]

            if is_customer and blocks_connected == connection_length:
                end_time = time(x // 2, (x % 2) * 30, 0)
                formatted_schedule[str(i)].append({
                    "start": start_time.isoformat(),
                    "end": end_time.isoformat()
                })
                start_time = None
                blocks_connected = 0

            if block_value > 0:  # available
                if not start_time:
                    start_time = time(x // 2, (x % 2) * 30, 0)
                blocks_connected += 1
            elif start_time:
                if not is_customer or blocks_connected == connection_length:
                    end_time = time(x // 2, (x % 2) * 30, 0)
                    formatted_schedule[str(i)].append({
                        "start": start_time.isoformat(),
                        "end": end_time.isoformat()
                    })
                start_time = None
                blocks_connected = 0

    print('AVILABAILITY', formatted_schedule)
    return jsonify(formatted_schedule)


# recurring availabilities
@calender_blueprint.route('/getRecurrAvailability', methods=["GET"])
def get_recurring_availability():
    professional_id = request.headers.get("professionalId", None)
    all_recurring_avails = recDAO_Object.getAvailabilitiesFromProfID(int(professional_id))
    formatted = {str(i): [] for i in range(7)}
    for recur_avail in all_recurring_avails:
        formatted[str(recur_avail.dayOfWeek)].append({
            "start": recur_avail.startTime.isoformat(),
            "end": recur_avail.endTime.isoformat()
        })
    
    return jsonify(formatted)


# NEW non recurring availabilities
@calender_blueprint.route('/setRecurrAvailability', methods=["POST"])
def set_recurring_availability():
    professional_id = int(request.json.get("professionalId", None))
    availabilities = request.json.get("events", None)
    recDAO_Object.deleteAllAvailabilitiesForProfID(professional_id)

    for i in range(7):
        for availability in availabilities[str(i)]:
            start = time.fromisoformat(availability["start"])
            end = time.fromisoformat(availability["end"])
            recDAO_Object.addAvailability(professional_id, DayOfWeek(i), start, end)

    print(availabilities)
    return {"success": "yes"}


@calender_blueprint.route('/setNonRecurrAvailability', methods=["POST"])
def set_non_recurring_availability():
    professional_id = int(request.json.get("professionalId", None))
    start_date = date.fromisoformat(request.json.get("start", None))
    availabilities = request.json.get("events", None)

    for i in range(7):
        calendar_date = start_date + timedelta(days=i)
        time_slots = availabilities[str(i)]
        nonRecDao_Object.deleteAvailabilitiesForProfIDAndDay(professional_id, calendar_date)

        for time_slot in time_slots:
            start = time.fromisoformat(time_slot["start"])
            end = time.fromisoformat(time_slot["end"])
            nonRecDao_Object.addAvailability(professional_id, calendar_date, start, end, IsAvailable.true)

        if not time_slots:
            time_object = time.fromisoformat("00:00:00")
            nonRecDao_Object.addAvailability(professional_id, calendar_date, time_object, time_object,
                                             IsAvailable.false)

    return {"success": "yes"}
