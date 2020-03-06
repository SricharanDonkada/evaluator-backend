const mongoose = require('mongoose');

const submittedQuestionsSchema = new mongoose.Schema({
    user_id :{
        type: String
    },
    question_id: {
        type: String
    },
    testcases:{
        type : Object
    },
    language:{
        type: String
    },
    code:{
        type : String
    },
    score:{
        type : Number ,
        default : 0
    }
});


module.exports = mongoose.model('submittedQuestion' , submittedQuestionsSchema);