'''
This file is meant to demo the idea of blueprints: making the flask app more modular with different files for different features.
I want to split up the project into features, instead of grouping by file type, since I think it'll result in an easier workflow.
'''

from flask import Blueprint

sampleBlueprint = Blueprint("sampleBlueprint", __name__)

@sampleBlueprint.route("/")
def sampleBluePrintRes():
    return "Hello world!"

