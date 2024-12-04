import os
import json
import boto3
import base64
from datetime import datetime

dynamodb = boto3.resource('dynamodb')
s3 = boto3.client('s3')

DYNAMODB_TABLE = os.environ['DYNAMODB_TABLE']
S3_BUCKET = os.environ['S3_BUCKET']

def lambda_handler(event, context):
   
    body = json.loads(event['body'])
    
    module_id = body['ModuleId']
    title = body['title']
    category = body['category']
    spots = body['spots']
    image_data = body['image']
    signUpAllowed = body['signUpAllowed']
    content = body['content']
    
    image_name = f"{module_id}.jpg"

    if isinstance(image_data, bool):    # If image variable is a boolean
        # Prepare item for DynamoDB
        item = {
            'ModuleId': module_id,
            'title': title,
            'category': category,
            'spots': int(spots),
            'image_url': f"https://{S3_BUCKET}.s3.amazonaws.com/{image_name}",
            'signUpAllowed': signUpAllowed,
            'content': content,
            'updated_at': datetime.now().isoformat()

        }
    elif isinstance(image_data, str):    # If image variable is a string
        image = base64.b64decode(image_data)
        s3.put_object(Bucket=S3_BUCKET, Key=image_name, Body=image, ContentType='image/jpeg')
        
        item = {
            'ModuleId': module_id,
            'title': title,
            'category': category,
            'spots': spots,
            'image_url': f"https://{S3_BUCKET}.s3.amazonaws.com/{image_name}",
            'signUpAllowed': signUpAllowed,
            'content': content,
            'updated_at': datetime.now().isoformat()

        }


    # Put item into DynamoDB
    table = dynamodb.Table(DYNAMODB_TABLE)
    table.put_item(Item=item)

    response = {
        'statusCode': 200,
        'body': json.dumps({
            'message': 'Module updated successfully!',
            'status': 200
        }),
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
            'Access-Control-Allow-Headers': 'Content-Type'
        }
    }
    
    return response