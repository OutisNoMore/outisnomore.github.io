#!/usr/bin/python3

import flask
from flask import request, jsonify, Flask
from flask_cors import CORS
from chatterbot import ChatBot
from chatterbot.trainers import ChatterBotCorpusTrainer
import logging 

app = flask.Flask(__name__)
app.config["DEBUG"] = True
CORS(app)

logger = logging.getLogger()
logger.setLevel(logging.CRITICAL)

chatbot = ChatBot('morsie', storage_adapter='chatterbot.storage.SQLStorageAdapter', database_uri='')

@app.route('/chatbot', methods=['GET'])
def anything():
    if 'reply' in request.args:
        get = request.args['reply']
    else:
        return 'Error, No reply given.'
    
    response = chatbot.get_response(get)

    return response.text

app.run()
