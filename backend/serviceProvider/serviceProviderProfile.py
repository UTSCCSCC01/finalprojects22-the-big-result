from flask import Blueprint, jsonify

serviceProviderBlueprint = Blueprint("serviceProvider", __name__)

@serviceProviderBlueprint.route("/")
def getServiceProviderProfile():
    return jsonify({
        "name": "Steven Adams",
        "rating": 4.5,
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." +
        "felis imperdiet proin fermentum leo. Lobortis elementum nibh tellus molestie nunc non. Nullam non nisi est sit amet facilisis magna. Odio pellentesque",
        "services": "Hairstyle",
        "profilePictureLink": "https://picsum.photos/200",
        "calendar": "Some calendar stuff here that we would probably need later on",
        "reviews": getReviews(3)
    })


def getReviews(numRevs = 3)-> list:
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