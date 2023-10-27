const s3 = require('../sdk');
require('dotenv/config');

const upload = async (path, buffer, mimetype) => {
    const file = await s3.upload({
        Bucket: process.env.BUCKET,
        Key: path,
        Body: buffer,
        ContentType: mimetype
    }).promise();

    return {
        url: file.Location,
        path: file.Key
    };
}

const deleteFile = async (path) => {
    await s3.deleteObject({
        Bucket: process.env.BUCKET,
        Key: path
    }).promise();

    return "Arquivo deletado com sucesso";
}

module.exports = {
    upload,
    deleteFile
}