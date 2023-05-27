const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require('./config/database')
dotenv.config({ path : './backend/config/config.env' })

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

const serverSecure = app.listen(process.env.SECURE_PORT, () => {
    // console.log(`server started on PORT: ${process.env.SECURE_PORT} in ${process.env.NODE_ENV} mode`)
})

// handle Unhandled promise rejection
server.on('unhandledRejection', err => {
    console.log(`Error : ${err.message}`)
    console.log('Shutting down server')
    server.close(()=> {
        process.exit(1)
    })
})

serverSecure.on('unhandledRejection', err => {
    console.log(`Error : ${err.message}`)
    console.log('Shutting down server')
    serverSecure.close(()=> {
        process.exit(1)
    })
})