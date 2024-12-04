import os
import json
import boto3
import base64
import uuid
from datetime import datetime

# Initialize AWS clients
s3 = boto3.client('s3')
dynamodb = boto3.resource('dynamodb')

# Constants - Update with your bucket name and DynamoDB table names
R_DDB_TABLE_NAME = os.environ['R_DDB_TABLE_NAME']
M_DDB_TABLE_NAME = os.environ['M_DDB_TABLE_NAME']

def lambda_handler(event, context):
    # Extract form data
    body = json.loads(event['body'])
    first_name = body['firstName']
    prefix = body['prefix']
    last_name = body['lastName']
    student_id = body['studentId']
    email = body['email']
    choice_module = body['choiceModule']

    registrationId = str(uuid.uuid4())
    current_datetime = datetime.now().strftime('%Y-%m-%d_%H-%M-%S')

    # Decrement the available spots in the module
    module_table = dynamodb.Table(M_DDB_TABLE_NAME)
    
    response = module_table.get_item(Key={'ModuleId': choice_module})
   
    current_spots = int(response['Item']['spots'])
    
    new_spots = current_spots - 1
    
    module_table.update_item(
        Key={'ModuleId': choice_module},
        UpdateExpression='SET spots = :val',
        ExpressionAttributeValues={':val': new_spots}
    )

    # Prepare item to store in DynamoDB
    registration_item = {
        'RegistrationId': registrationId, 
        'firstName': first_name,
        'prefix': prefix,
        'lastName': last_name,
        'studentId': student_id,
        'email': email,
        'choiceModule': choice_module,
        'created_at': current_datetime
    }
    
    # Store item in DynamoDB
    registration_table = dynamodb.Table(R_DDB_TABLE_NAME)
    registration_table.put_item(Item=registration_item)

    # Respond with success message and URL
    return {
        'statusCode': 200,
        'body': json.dumps({
            'message': 'Data stored successfully.',
            'status': 200
        }),
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST',
            'Access-Control-Allow-Headers': 'Content-Type'
        }
    }

