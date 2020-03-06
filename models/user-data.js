const mongoose = require('mongoose');

const userDataSchema  =  new mongoose.Schema({
    username :{
        type : String 
    },
    email :{
        type : String 
    },
    password :{
        type : String 
    },
    isVerified : {
        type : Boolean,
        default : false
    },
    cjid : {
        type : Array
    }
});
module.exports = mongoose.model('userData' , userDataSchema);