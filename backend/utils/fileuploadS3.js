// const { S3Client } = require('@aws-sdk/client-s3');
const multer = require('multer')
const multerS3 = require('multer-s3')
const aws = require("aws-sdk");
const { v4: uuidv4 } = require('uuid');

aws.config.update({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const s3 = new aws.S3();

const upload = (folder) => multer({
    storage: multerS3({
        s3: s3,
        bucket: 'backend-node-anjani',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        metadata: function (req, file, cb) {
            cb(null, { 
                mimeType: file.mimetype,
                originalName: file.originalname
            });
        },
        key: function (req, file, cb) {
            const extension = file.originalname.split('.').pop()
            const uniqueID = uuidv4()
            const key = folder + '/' + uniqueID + '.' + extension;
            cb(null, key)
        }
        
    }),
    onError: function(err, next) {
        console.error('Upload to S3 failed:', err);
        next(err);
    }
    
})

module.exports = upload