from flask import Flask, jsonify, request
from lambda_funcs.get_song_queue import lambda_handler as get_song_queue
from lambda_funcs.add_song_request import lambda_handler as add_song_request
app = Flask(__name__)

@app.route('/prod/get_song_queue')
def get_queue():
  event = { 'queryStringParameters': request.args }
  return jsonify(get_song_queue(event, None))

@app.route('/prod/add_song_request', methods=['POST'])
def add_song():
  event = { 'queryStringParameters': request.args }
  return jsonify(add_song_request(event, None))