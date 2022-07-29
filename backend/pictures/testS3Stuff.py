import os

import boto3
import io



def testStuff():

    myBucketName= "csc-c01-pictures"

    # client = boto3.resource(
    #     's3',
    #     aws_access_key_id='AKIA2OPVVDRCSY5EB5SO',
    #     aws_secret_access_key='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'
    # )

    session = boto3.Session(
        aws_access_key_id='AKIA2OPVVDRCSY5EB5SO',
        aws_secret_access_key='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',
    )
    # s3 = session.resource('s3')
    # response = client.list_buckets()
    #
    #
    # # Output the bucket names
    # print('Existing buckets:')
    # for bucket in response['Buckets']:
    #     print(f'  {bucket["Name"]}')

    # client.list_objects(Bucket="csc-c01-pictures")

    client = boto3.client('s3'
                          ,aws_access_key_id=os.environ.get("AWS_ACCESS_KEY_ID"),
                          aws_secret_access_key=os.environ.get("AWS_SECRET_ACCESS_KEY"))

    # client.create_bucket(Bucket='test-bucket')



    print(client.list_objects(Bucket="csc-c01-pictures"))


    # with open("test_photo_2.png", "rb") as f:
    #     client.upload_fileobj(f, "csc-c01-pictures", "test_photo.jpg")

    # with open('another_test.jpg', 'wb') as data:
    #     client.download_fileobj(myBucketName, 'test_photo.jpg', data)