// const { S3Client } = require('@aws-sdk/client-s3');
const multer = require('multer')
const multerS3 = require('multer-s3')
const aws = require("aws-sdk");

aws.config.update({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const s3 = new aws.S3();

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'backend-node-anjani',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        metadata: function (req, file, cb) {
           cb(null, { fieldName: file.originalname });
        },
        key: function (req, file, cb) {
            console.log(file)
            cb(null, Date.now().toString())
        }
    })
})

module.exports = upload