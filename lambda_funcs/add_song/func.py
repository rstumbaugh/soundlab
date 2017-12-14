import json
import boto3
import requests
from datetime import datetime

def lambda_handler(event, context):
  if context:
    endpoint_url = 'https://dynamodb.us-east-1.amazonaws.com'
  else:
    endpoint_url = 'http://localhost:5555'
  
  params = event['queryStringParameters']
  database = boto3.client('dynamodb', endpoint_url=endpoint_url)

  existing_queue = database.get_item(
    TableName='session',
    Key={'session_name': {'S': params['session']}}
  )

  if 'Item' in existing_queue:
    result = database.update_item(
      TableName='session',
      Key={'session_name': {'S': params['session']}},
      UpdateExpression='SET song_queue = list_append(song_queue, :song)',
      ExpressionAttributeValues={
        ':song': {
          'L': [
            { 'S':params['song'] }
          ]
        }
      },
      ReturnValues='UPDATED_NEW'
    )

    queue = result['Attributes']['song_queue']['L']
    queue = [item['S'] for item in queue]
  else:
    session = {
      'session_name': { 'S': params['session']} ,
      'song_queue': {
        'L': [
          { 'S': params['song'] }
        ] 
      },
      'created': { 'S': str(datetime.now()) }
    }

    database.put_item(
      TableName='session',
      Item=session
    )

    queue = [params['song']]
    
  body = { 'song_queue': queue }
  if context:
    response = {
      'body': json.dumps(body),
      'statusCode': 200,
      'isBase64Encoded': False,
      'headers': {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
    }
  else:
    response = json.dumps(body)
  return response