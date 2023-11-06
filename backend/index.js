const app = require('./app');
const dotenv = require('dotenv');
const path = require('path')
const connectDatabase = require('./config/database')
dotenv.config({ path : path.resolve(__dirname,'./config/config.env') })
const fs = require('fs')
const https = require('https')


//const key = fs.readFileSync('private.key')
//const cert = fs.readFileSync('certificate.crt')
// hanlde the uncaught exceptions
process.on('uncaughtException',err => {
    console.log(`Error : ${err.stack}`)
    console.log('Shutting down server')
    process.exit(1)
})

connectDatabase();

const server = app.listen(process.env.PORT, () => {
    console.log(`server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode`)
})


// handle Unhandled promise rejection
server.on('unhandledRejection', err => {
    console.log(`Error : ${err.message}`)
    console.log('Shutting down server')
    server.close(()=> {
        process.exit(1)
    })
})


// const credentials = {
//     key,
//     cert
// }
const httpsServer = https.createServer(app)
httpsServer.listen(process.env.SECURE_PORT)