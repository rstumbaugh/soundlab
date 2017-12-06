import json 
import boto3
from datetime import datetime
import sys
from os import environ as env

def lambda_handler(event, context):
  try:
    is_dev = env['AWS_SAM_LOCAL'] == 'true'
  except KeyError:
    is_dev = False

  endpoint_url = 'https://dynamodb.us-east-1.amazonaws.com'
  
  table_name = 'request_queue'
  if is_dev:
    table_name += '_dev'
  
  params = event['queryStringParameters']
  database = boto3.resource('dynamodb', endpoint_url=endpoint_url)
  table = database.Table(table_name)
  
  table.put_item(
    Item={
      'song_id': params['song'],
      'session_name': params['session'],
      'inserted': str(datetime.now())
    }
  )
  
  response = {
    'statusCode': 200,
    'isBase64Encoded': False,
    'headers': {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    },
    'body':  json.dumps({ 'testing': str(is_dev) })
  }
  return response