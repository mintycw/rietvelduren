import os
import json
import boto3
from decimal import Decimal

class DecimalEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, Decimal):
            return str(o) # Convert Decimal to string
        return super(DecimalEncoder, self).default(o)

dynamodb = boto3.resource('dynamodb')
DYNAMODB_TABLE = os.environ['DYNAMODB_TABLE']

def lambda_handler(event, context):
    # Retrieve all modules from DynamoDB
    table = dynamodb.Table(DYNAMODB_TABLE)
    response = table.scan()

    # Extract items from the response
    items = response.get('Items', [])

    # Return the list of modules using custom JSON encoder
    return {
        'statusCode': 200,
        'body': json.dumps(items, cls=DecimalEncoder),
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }
