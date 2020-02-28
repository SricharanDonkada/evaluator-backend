const mongoose = require('mongoose');

const userDataSchema  =  new mongoose.Schema({
    username :{
        type : String 
    },
    mail :{
        type : String 
    },
    password :{
        type : String 
    },
    isVerified : {
        type : Boolean,
        default : false
    }
});
module.exports = mongoose.model('userData' , userDataSchema);