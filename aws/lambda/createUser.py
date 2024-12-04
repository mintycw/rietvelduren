import os
import json
import boto3

client = boto3.client('cognito-idp')

USER_POOL_ID = os.environ['USER_POOL_ID']

def lambda_handler(event, context):
    # Parse incoming event data
    email = event['email']
    password = event['password']
    role = event['role']  
    name = event['name'] 
    
    # Create user in Cognito
    user_attributes = [
        {'Name': 'email', 'Value': email},
        {'Name': 'name', 'Value': name}
    ]
    
    response = client.admin_create_user(
        UserPoolId=USER_POOL_ID,
        Username=email, 
        TemporaryPassword=password,
        UserAttributes=user_attributes
    )
    
    # Add user to group based on role
    client.admin_add_user_to_group(
        UserPoolId=USER_POOL_ID,
        Username=email,
        GroupName='administrators' if role == 'administrator' else 'moderators'
    )
    
    return {
        'statusCode': 200,
        'body': json.dumps({'User created successfully'})
    }
