const mongoose = require('mongoose');
const connectDatabase = () => {
    mongoose.connect(process.env.DB_PROD_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
    }).then((con)=>{
        console.log("Mongo DB connect to HOST :" , con.connection.host)
    }).catch((err)=>{
        console.log(err)
    })
}

module.exports = connectDatabase