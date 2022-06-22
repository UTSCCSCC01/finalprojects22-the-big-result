from flask import Blueprint, request

calender_blueprint = Blueprint('calender_blueprint', __name__)

# GET only: purpose is to get the timeslots for the chosen date
# get the start-end date, calculate available time slots and output them

@calender_blueprint.route('/calender', methods=["POST"])
def calender():
    pass
