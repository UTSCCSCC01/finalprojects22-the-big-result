from flask import Blueprint
from events import recurringAvailabilities, nonRecurringAvailabilities
from flask import Blueprint, request, jsonify

calender_blueprint = Blueprint('calender_blueprint', __name__)


# all availabilities - recurring and non recurring merged
@calender_blueprint.route('/getAvailability', methods=["GET"])
def get_availability():
    pass


# recurring availabilities
@calender_blueprint.route('/getRecurrAvailability', methods=["GET"])
def get_recurring_availability():
    return jsonify(recurringAvailabilities) # getting from mocked data in events.py

@calender_blueprint.route('/addRecurrAvailability', methods=["POST"])
def add_recurring_availability():
    recurrEvents = request.json.get("events", None)
    print(recurrEvents)
    return {"events": recurrEvents}


# non recurring availabilities
@calender_blueprint.route('/getNonRecurrAvailability', methods=["GET"])
def get_non_recurring_availability():
    return jsonify(nonRecurringAvailabilities)

@calender_blueprint.route('/addNonRecurrAvailability', methods=["POST"])
def add_non_recurring_availability():
    pass



