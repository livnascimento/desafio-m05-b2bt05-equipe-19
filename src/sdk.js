const aws = require('aws-sdk');
require('dotenv/config');

const endpoint = new aws.Endpoint(process.env.ENDPOINT);

const s3 = new aws.S3({
    endpoint,
    credentials: {
        accessKeyId: process.env.KEY_ID,
        secretAccessKey: process.env.APP_KEY
    }
})

module.exports = s3;