"use strict";
const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
    const documentClient = new AWS.DynamoDB.DocumentClient();

    let responseBody = "";
    let statusCode = 0;

    const {user, etag, filename,metaData} = JSON.parse(event.body);

    const params = {
        TableName: "files",
        Item:{
            user: user,
            etag: etag,
            filename: filename,
            metaData: metaData
        }
    };

    try{
        const data = await documentClient.put(params).promise();
        responseBody = JSON.stringify(data);
        statusCode = 201;
    }catch(err){
        responseBody = `Unable to put record: ${err}`;
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