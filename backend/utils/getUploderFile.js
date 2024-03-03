const aws = require('aws-sdk');

aws.config.update({
    // region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    signatureVersion: 'v4',
    region: 'eu-north-1'
});

const s3 = new aws.S3();

const generatePresignedUrl = (key) => {
    const params = {
        Bucket: 'backend-node-anjani',
        Key: key,
        Expires: 3600 // URL expires in 1 hour
    };

    return new Promise((resolve, reject) => {
        s3.getSignedUrl('getObject', params, (err, url) => {
            if (err) {
                reject(err);
            } else {
                resolve(url);
            }
        });
    });
};

module.exports = generatePresignedUrl