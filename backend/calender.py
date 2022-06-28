from flask import Blueprint, request
from events import bookings, defaultAvailability
from flask import Blueprint, request, jsonify

calender_blueprint = Blueprint('calender_blueprint', __name__)

# GET: get the timeslots for the chosen date
# get the start-end date, calculate available time slots and output them

# ugly: no need to see bookings when changing the default availability...

# get all the current availabilities to display
@calender_blueprint.route('/defaultAvailability', methods=["GET"])
def get_default_availability():
    # format default availability if needed before passing to fronend
    print("default availabilities: ", defaultAvailability)
    return jsonify(defaultAvailability)

# for professional
# post the chosen default day time slots to backend on submit from fronend
@calender_blueprint.route('/p/calendar/default', methods=["POST"])
def set_default_availability():
    pass 



