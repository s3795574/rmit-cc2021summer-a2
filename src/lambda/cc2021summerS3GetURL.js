const AWS = require('aws-sdk')
AWS.config.update({ region: process.env.AWS_REGION })
const s3 = new AWS.S3()
const URL_EXPIRATION_SECONDS = 300


// Main Lambda entry point
exports.handler = async (event) => {
  const user = event.pathParameters.id;
  const fileName = event["queryStringParameters"]["filename"];
  const result = await getUploadURL(user,fileName,event)
  return result;
}

const getUploadURL = async function(user,fileName,event) {
  const objectName = user + "/" + fileName
  const objectKey = `${objectName}.jpg`

  // Get signed URL from S3
  const s3Params = {
    Bucket: process.env.UploadBucket,
    Key:objectKey,
    Expires: URL_EXPIRATION_SECONDS,
    ContentType: 'image/jpeg'
  }
  const uploadURL = await s3.getSignedUrlPromise('putObject', s3Params)
  return new Promise((resolve, reject) => {
      resolve({
        "statusCode" : "200",
        "isBase64Encoded": false,
        headers: {
            "access-control-allow-origin" : "*"
        },
        "body" : JSON.stringify({
            "uploadURL": uploadURL,
            "Key": s3Params.Key
        })
    })
  })
}