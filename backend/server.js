const app = require('./app')
const connectDatabase = require('./config/database')

const dotenv = require('dotenv');

dotenv.config({ path : 'backend/config/config.env' })
  
// connecting to databse

connectDatabase();

const server = app.listen(process.env.PORT , () => {
    console.log(`Server started on PORT : ${process.env.PORT} in ${process.env.MODE_ENV} mode .`)
}) 

// Handle Unhandled Promise rejection

process.on('unhandleRejection', err => {
    console.log(`Error : ${err.message}`)
    console.log("shifting down the server due to unhandled promise rejection")
    server.close(() => {
        process.exit(1)
    })
})
