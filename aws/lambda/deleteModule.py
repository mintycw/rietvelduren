import os
import json
import boto3

# Initialize boto3 clients
dynamodb = boto3.resource('dynamodb')
s3 = boto3.client('s3')

DYNAMODB_TABLE = os.environ['DYNAMODB_TABLE']
S3_BUCKET = os.environ['S3_BUCKET']

def lambda_handler(event, context):
        body = json.loads(event['body'])
        moduleId = body['moduleId']
  
        delete_ddb(moduleId)
        delete_s3(moduleId)

        return {
            'statusCode': 200,
            'body': json.dumps({
                'message': 'Module deleted!',
                'status': 200
            }),
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,DELETE',
                'Access-Control-Allow-Headers': 'Content-Type'
            }
        }

def delete_ddb(id):
    dynamodb_table = dynamodb.Table(DYNAMODB_TABLE)
    
    response = dynamodb_table.delete_item(
        Key={
            'ModuleId': id  # assuming id is already a string
        }
    )

def delete_s3(id):
    key = f"{id}.jpg" 
    s3.delete_object(
        Bucket=S3_BUCKET,
        Key=key
    )