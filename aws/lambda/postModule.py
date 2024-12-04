import os
import json
import boto3
import base64
import uuid
from datetime import datetime

dynamodb = boto3.resource('dynamodb')
s3 = boto3.client('s3')

DYNAMODB_TABLE = os.environ['DYNAMODB_TABLE']
S3_BUCKET = os.environ['S3_BUCKET']


def lambda_handler(event, context):
    body = json.loads(event['body'])

    title = body['title']
    category = body['category']
    spots = body['spots']
    image_data = body['image']
    signUpAllowed = body['signUpAllowed']
    content = body['content']

    # Generate unique ModuleId
    moduleId = str(uuid.uuid4())

    # Upload image to S3
    image_name = f"{moduleId}.jpg"
    
    image = base64.b64decode(image_data)
    s3.put_object(Bucket=S3_BUCKET, Key=image_name, Body=image, ContentType='image/jpeg')

    # Prepare item for DynamoDB
    item = {
        'ModuleId': moduleId, 
        'title': title,
        'category': category,
        'spots': int(spots),
        'image_url': f"https://{S3_BUCKET}.s3.amazonaws.com/{image_name}",
        'signUpAllowed': signUpAllowed,
        'content': content,
        'created_at': datetime.now().isoformat()
    }

    # Put item into DynamoDB
    table = dynamodb.Table(DYNAMODB_TABLE)
    table.put_item(Item=item)

    response = {
        'statusCode': 200,
        'body': json.dumps({
            'message': 'Module and image uploaded successfully!',
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
