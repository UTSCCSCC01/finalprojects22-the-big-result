from flask import Blueprint
from events import recurringAvailabilities, allAvailabilities
from flask import Blueprint, request, jsonify
from datetime import date, time, timedelta, datetime
from book import get_week_by_professional
from DAOs import AvailabilitiesRecDAO, AvailabilitiesNonRecDAO

calender_blueprint = Blueprint('calender_blueprint', __name__)


# all availabilities - recurring and non-recurring merged
@calender_blueprint.route('/getAvailability', methods=["GET"])
def get_availability():
    # Get relevant data
    professionalId = request.json.get("professionalId", None)
    start_date = date.fromisoformat(request.json.get("start", None))
    isCustomer = request.json.get("type", None) == "Customer"  # TODO: change format to chunk 30-min peroids into
    # sessions if it's a customer

    weekly_schedule = [[0 for _ in range(24 * 2 + 1)] for _ in range(7)]
    bookings = get_week_by_professional(professionalId, start_date)

    # Map out their availabilities and bookings in O(A + B) time
    for i in range(7):
        current_date = start_date + timedelta(days=i)
        availabilities = AvailabilitiesNonRecDAO.getAvailabilitiesFromProfIDAndDate(professionalId, current_date) or \
            AvailabilitiesRecDAO.getAvailabilitiesFromProfIDAndDate(professionalId, i)

        if len(availabilities) == 1 and availabilities[0] is AvailabilitiesNonRecDAO and not availabilities[
             0].isAvailable:
            availabilities = []

        if not availabilities:
            continue

        for availability in availabilities:
            start_index = availability.startTime.hour * 2 + availability.startTime.minute // 30
            end_index = availability.endTime.hour * 2 + availability.endTime.minute // 30 + 1
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

            weekly_schedule[i][start_index][start_time.hour * 2 + start_time.minute // 30] += -1
            weekly_schedule[i][start_index][end_time.hour * 2 + end_time.minute // 30 + 1] += 1

    # Calculate finalized schedule for the week and format it for the user
    formatted_schedule = []
    for i in range(7):
        formatted_schedule.append([])
        counter = 0
        start_time = None
        for x in range(len(weekly_schedule[i])):
            counter += weekly_schedule[i][x]
            if counter > 0:  # available
                if not start_time:
                    start_time = time(x // 2, (x % 2) * 30, 0)
            elif start_time:  # no longer available
                end_time = time(x // 2, (x % 2) * 30, 0)
                formatted_schedule[i].append({
                    "start": start_time.isoformat(),
                    "end": end_time.isoformat()
                })
                start_time = None

    return jsonify(formatted_schedule)


# recurring availabilities
@calender_blueprint.route('/getRecurrAvailability', methods=["GET"])
def get_recurring_availability():
    professionalId = request.json.get("professionalId", None)
    all_recurring_avails = AvailabilitiesRecDAO.getAvailabilitiesFromProfID(professionalId)
    formatted = [[] for _ in range(7)]
    for recur_avail in all_recurring_avails:
        formatted[recur_avail.dayOfWeek] = {
            "start": recur_avail.startTime.isoformat(),
            "end": recur_avail.endTime.isoformat()
        }

    return jsonify(all_recurring_avails)


# NEW non recurring availabilities
@calender_blueprint.route('/setRecurrAvailability', methods=["POST"])
def set_recurring_availability():
    professionalId = request.json.get("professionalId", None)
    availabilities = request.json.get("events", None)
    AvailabilitiesRecDAO.deleteAllAvailabilitiesForProfID(professionalId)

    for i in range(7):
        for availability in availabilities[str(i)]:
            start = time.fromisoformat(availability["start"])
            end = time.fromisoformat(availability["end"])
            AvailabilitiesRecDAO.addAvailability(professionalId, i, start, end)

    return {"success": "yes"}


@calender_blueprint.route('/setNonRecurrAvailability', methods=["POST"])
def set_non_recurring_availability():
    professionalId = request.json.get("professionalId", None)
    availabilities = request.json.get("events", None)

    for date_string in availabilities:
        calendar_date = date.fromisoformat(date_string)
        AvailabilitiesNonRecDAO.deleteAvailabilitiesForProfIDAndDay(professionalId, calendar_date)
        time_slots = availabilities[date_string]

        for time_slot in time_slots:
            start = time.fromisoformat(time_slot["start"])
            end = time.fromisoformat(time_slot["end"])
            AvailabilitiesNonRecDAO.addAvailability(professionalId, calendar_date, start, end, 1)

        if not time_slots:
            time_object = time.fromisoformat("00:00:00")
            AvailabilitiesNonRecDAO.addAvailability(professionalId, calendar_date, time_object, time_object, 0)

    return {"success": "yes"}
