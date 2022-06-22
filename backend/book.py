from flask import Blueprint, jsonify, request

book_blueprint = Blueprint('book_blueprint', __name__)

global selected_date # a json

# based on user login display differently
# todo: @jwt_required()
@book_blueprint.route('/booking', methods=["POST"])
def booking1():
    global selected_date

    date = request.json.get("date", None)
    time = request.json.get("time", None)
    print("GOT", {"date": date, "time": time})
    
    selected_date = {"date": date, "time": time}
    return jsonify(selected_date)

@book_blueprint.route('/booking', methods=["GET"])
def booking2():
    global selected_date
    
    return jsonify(selected_date)
    
