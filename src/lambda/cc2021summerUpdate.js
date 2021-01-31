"use strict";
const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
    const documentClient = new AWS.DynamoDB.DocumentClient();

    let responseBody = "";
    let statusCode = 0;

    const {user,etag,filename,metaData} = JSON.parse(event.body)

    const params = {
        TableName: "files",
        Key:{
            user: user,
            etag: etag
        },
        UpdateExpression: "set metaData = :m, filename = :n",
        ExpressionAttributeValues:{
            ":n" : filename,
            ":m" : metaData
        },
        ReturnValues: "UPDATED_NEW"
    };

    try{
        const data = await documentClient.update(params).promise();
        responseBody = JSON.stringify(data);
        statusCode = 204;
    }catch(err){
        responseBody = `Unable to update record: ${err}`;
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