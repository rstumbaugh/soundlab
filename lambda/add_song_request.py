import json 

def lambda_handler(event, context):
  response = {
      'statusCode': 200,
      'isBase64Encoded': False,
      'headers': {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
      },
  }

  body = {
    'message': 'Request added!'
  }

  response['body'] = json.dumps(body)
  return response