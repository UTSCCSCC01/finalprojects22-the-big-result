from flask import Blueprint
from events import recurringAvailabilities, nonRecurringAvailabilities
from flask import Blueprint, request, jsonify
from datetime import date, time

calender_blueprint = Blueprint('calender_blueprint', __name__)


# all availabilities - recurring and non recurring merged
@calender_blueprint.route('/getAvailability', methods=["GET"])
def get_availability():
    """
    professionalId: xikn21o9
    start: YYYY-MM-DD
    type: customer
    --> provide the avail for the next 7 days

    [3-7], booked 5-6
    becomes [3-5, 6-7]

    --> For each day, see if there is an actual avail
    --> If not, take the schedule in recur
    --> Then, get all bookings for that day and exclude those times from the schedule
    """

    """ [
    '0' : { // SUNDAY
        '0' : { // first time slot
           "start" : HH:MM:SS (0-24)
           "end" : HH:MM:SS (0-24)
            }


        },
    '1' : {} // Nothing on monday
   ]

    If customer, split the time slots into <1 hour> periods
    """

    pass


# recurring availabilities
@calender_blueprint.route('/getRecurrAvailability', methods=["GET"])
def get_recurring_availability():

    professionalId = request.json.get("professionalId", None)
    all_recurring_avails = []  # getAvailabilitiesFromProfID(professionalId)
    formatted = [[] for _ in range(7)]
    for recur_avail in all_recurring_avails:
        formatted[recur_avail.dayOfWeek] = {
            "start": recur_avail.startTime.isoformat(),
            "end": recur_avail.endTime.isoformat()
        }

    return jsonify(all_recurring_avails)


@calender_blueprint.route('/setRecurrAvailability', methods=["POST"])
def set_recurring_availability():

    professionalId = request.json.get("professionalId", None)
    availabilities = request.json.get("events", None)
    #  deleteAllAvailabilitiesForProfID(professionalId)

    for i in range(7):
        for availability in availabilities[str(i)]:
            start = time.fromisoformat(availability["start"])
            end = time.fromisoformat(availability["end"])
            # addAvailability(professionalId, i, start, end)

    return {"success": "yes"}


# non recurring availabilities
@calender_blueprint.route('/setNonRecurrAvailability', methods=["POST"])
def set_non_recurring_availability():

    professionalId = request.json.get("professionalId", None)
    availabilities = request.json.get("events", None)

    for date_string in availabilities:
        calendar_date = date.fromisoformat(date_string)
        # deleteAvailabilitiesForProfIDAndDay(professionalId, calendar_date)

        time_slots = availabilities[date_string]

        for time_slot in time_slots:
            start = time.fromisoformat(time_slot["start"])
            end = time.fromisoformat(time_slot["end"])
            # addAvailability(professionalId, calendar_date, start, end, 1)

        if not len(time_slots):
            time_object = time.fromisoformat("00:00:00")
            # addAvailability(professionalId, calendar_date, time_object, time_object, 0)
            pass

    return {"success": "yes"}
