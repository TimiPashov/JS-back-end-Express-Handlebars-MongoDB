const mongoose = require('mongoose');

// TODO change DB name according to assingment
const CONNECTION_STRING = 'mongodb://127.0.0.1:27017/GamingDB'

module.exports = async (app)=>{
    try{
        mongoose.connect(CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Database connected');
    }catch(error){
        console.log(error.message);
        process.exit(1);
    }
};