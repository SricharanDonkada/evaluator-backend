const mongoose = require('mongoose');


const questionDetailsSchema = new mongoose.Schema({
    question:{
        type: String
    },
    name:{
        type: String
    },
    testcases:{
        type :Object
    }
});

module.exports = mongoose.model('questionDetail' , questionDetailsSchema);