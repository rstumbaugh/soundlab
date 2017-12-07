import json 
import boto3
from datetime import datetime
import sys
from os import environ as env

def lambda_handler(event, context):
  if context:
    endpoint_url = 'https://dynamodb.us-east-1.amazonaws.com'
  else:
    endpoint_url = 'http://localhost:5555'
  
  params = event['queryStringParameters']
  database = boto3.resource('dynamodb', endpoint_url=endpoint_url)
  table = database.Table('request_queue')
  
  table.put_item(
    Item={
      'song_id': 12345,
      'session_name': 'test',
      'inserted': str(datetime.now())
    }
  )
  
  body = json.dumps({ 'message': 'put item!' })
  if context:
    response = {
      'statusCode': 200,
      'isBase64Encoded': False,
      'headers': {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
      },
      'body': body
    }
  else:
    response = body
  return response