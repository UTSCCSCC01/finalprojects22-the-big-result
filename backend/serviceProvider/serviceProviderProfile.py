from flask import Blueprint, jsonify

serviceProviderBlueprint = Blueprint("serviceProvider", __name__)

@serviceProviderBlueprint.route("/")
def getServiceProviderProfile():
    return jsonify({
        "name": "Steven Adams",
        "rating": 4.5,
        "description": "High quality hairdresser available for work!",
        "services": "Hairstyle",
        "profilePictureLink": "https://picsum.photos/200",
        "calendar": "Some calendar stuff here that we would probably need later on",
        "reviews": getReviews(3)
    })


def getReviews(numRevs = 1)-> list:
    reviewList = []
    for i in range(numRevs):
        reviewList.append({
            "service": "hairstyle",
            "reviewedBy": "Bob Marley",
            "rating": 3.7,
            "imageLink":"https://picsum.photos/100",
            "reviewDescription":"elit sed ullamcorper morbi tincidunt ornare massa eget egestas purus. Posuere urna nec tincidunt praesent semper feugiat nibh sed. Gravida cum sociis natoque penatibus et magnis dis. Orci dapibus ultrices in iaculis."
        })
    return reviewList