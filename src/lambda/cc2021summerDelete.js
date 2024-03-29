"use strict";
const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
    const documentClient = new AWS.DynamoDB.DocumentClient();

    let responseBody = "";
    let statusCode = 0;

    const id = event.pathParameters.id;
    const etag = event["queryStringParameters"]["etag"];

    const params = {
        TableName: "files",
        Key:{
            user: id,
            etag: etag
        }
    };

    try{
        const data = await documentClient.delete(params).promise();
        responseBody = JSON.stringify(data);
        statusCode = 204; 
    }catch(err){
        responseBody = `Unable to delete record: ${err}`;
        statusCode = 403;
    }

    const response = {
        statusCode: statusCode,
        headers: {
            "Content-Type": "application/json",
            "access-control-allow-origin" : "*"
        },
        body: responseBody
    };

    return response;
};