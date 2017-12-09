from flask import Flask, jsonify, request
from lambda_funcs.get_song_queue.func import lambda_handler as get_song_queue
from lambda_funcs.add_song.func import lambda_handler as add_song
from lambda_funcs.delete_session.func import lambda_handler as delete_session
app = Flask(__name__)

@app.route('/prod/get_song_queue')
def get_queue():
  event = { 
    'queryStringParameters': request.args, 
    'Host': 'localhost:5000',
    'X-Forwarded-Proto': 'http'
  }
  return jsonify(get_song_queue(event, None))

@app.route('/prod/add_song', methods=['POST'])
def add():
  event = { 
    'queryStringParameters': request.args, 
    'Host': 'localhost:5000',
    'X-Forwarded-Proto': 'http'
  }
  return jsonify(add_song(event=event, context=None))

@app.route('/prod/delete_session', methods=['DELETE'])
def delete():
  event = { 
    'queryStringParameters': request.args, 
    'Host': 'localhost:5000',
    'X-Forwarded-Proto': 'http'
  }
  return jsonify(delete_session(event=event, context=None))