import os
import json
import boto3
from decimal import Decimal 

dynamodb = boto3.resource('dynamodb')
DYNAMODB_TABLE = os.environ['DYNAMODB_TABLE']

class DecimalEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, Decimal):
            return str(o) # Convert Decimal to string
        return super(DecimalEncoder, self).default(o)

def lambda_handler(event, context):
    # Extract ModuleId from the query parameters
    module_id = event['queryStringParameters']['ModuleId']

    # Fetch the module from DynamoDB
    table = dynamodb.Table(DYNAMODB_TABLE)
    response = table.get_item(Key={'ModuleId': module_id})

    # Check if the module exists
    if 'Item' in response:
        module = response['Item']
        # Encode the module using DecimalEncoder
        module_json = json.dumps(module, cls=DecimalEncoder)
        return {
            'statusCode': 200,
            'body': module_json,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
                'Access-Control-Allow-Headers': 'Content-Type'
            }
        }
      
