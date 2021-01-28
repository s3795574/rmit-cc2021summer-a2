const AWS = require('aws-sdk')
AWS.config.update({ region: process.env.AWS_REGION })
const s3 = new AWS.S3()

exports.handler = async (event) =>{
    const user = event.pathParameters.id;
    const fileName = event["queryStringParameters"]["filename"];
    const objectKey = user + "/" + fileName + ".jpg"

    const s3Params = {
        Bucket: process.env.UploadBucket,
        Key:objectKey,
    }

    await s3.deleteObject(s3Params).promise();
    return new Promise((resolve, reject) => {
      resolve({
        "statusCode" : "200",
        headers: {
            "access-control-allow-origin" : "*"
        }
    })
}