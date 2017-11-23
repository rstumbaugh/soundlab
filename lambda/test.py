def lambda_handler(event, context):
  response = {
      'statusCode': 200,
      'isBase64Encoded': False,
      'headers': {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
      },
      'body': '{"message": "Hello, world!!"}'
  }
  return response