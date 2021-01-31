"use strict";
const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
    const documentClient = new AWS.DynamoDB.DocumentClient();

    let responseBody = "";
    let statusCode = 0;
    
    const id = event.pathParameters.id;
    //"user" is reserved word in Amazon DynamoDB, we user #uuu instead.
    const params = {
        TableName: "files",
        KeyConditionExpression: "#uuu = :u",
        ExpressionAttributeNames:{
        "#uuu": "user"
        },
        ExpressionAttributeValues: {
        ":u": id
        }
    };

    try{
        //the query get all the records with only partition key.
        const data = await documentClient.query(params).promise();
        responseBody = JSON.stringify(data.Items);
        statusCode = 200; 
    }catch(err){
        responseBody = `Unable to get records: ${err}`;
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