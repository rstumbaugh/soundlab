import json
import boto3

def lambda_handler(event, context):
  if context:
    endpoint_url = 'https://dynamodb.us-east-1.amazonaws.com'
  else:
    endpoint_url = 'http://localhost:5555'

  params = event['queryStringParameters']
  database = boto3.client('dynamodb', endpoint_url=endpoint_url)

  database.delete_item(
    TableName='session',
    Key={'session_name': {'S': params['session']}}
  )

  body = { 'message': 'Session deleted' }
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