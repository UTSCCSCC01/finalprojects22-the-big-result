from flask import Blueprint
from events import recurringAvailabilities
from flask import Blueprint, request, jsonify

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
    """
    professionalId: xikn21o9
    """


    """
    [
    '0' : { // SUNDAY
        '0' : { // first time slot
           "start" : HH:MM:SS (0-24)
           "end" : HH:MM:SS (0-24)
            }


        },
    '1' : {} // Nothing on monday
   ]

    """

    return jsonify(recurringAvailabilities) # getting from mocked data in events.py

@calender_blueprint.route('/setRecurrAvailability', methods=["POST"])
def set_recurring_availability():
    """
    professionalId : xhidhqwoe
    events: [
        '0' : { // SUNDAY
            '0' : { // first time slot
               "start" : HH:MM:SS (0-24)
               "end" : HH:MM:SS (0-24)
                }


            },
        '1' : {} // Nothing on monday
       ]
    """

    recurrEvents = request.json.get("events", None)
    print(recurrEvents)

    """
    No message, 200
    """
    return {"events": recurrEvents}


# non recurring availabilities
@calender_blueprint.route('/setNonRecurrAvailability', methods=["POST"])
def set_non_recurring_availability():
    """
    professionalId : xhidhqwoe
    events: {
        'DATE' : { // YYYY-MM-DD
            '0' : { // first time slot
               "start" : HH:MM:SS (0-24)
               "end" : HH:MM:SS (0-24)
                }


            },
       }
    """


    """
    No message, 200
    """
    pass



