const express = require('express');
const router = express.Router();

//IMPORTING MODELS
const submittedQuestion = require('../models/submitted-questions');

router.post('/' ,( req,res )=>{
    console.log("request has been called");
    console.log(req.body);
    //GETTING DATA FROM REQUEST AND STORING IN VARIABLES
    const userId = req.body.user_id;
    const questionId = req.body.question_id;
    const codeLanguage = req.body.language ;
    const codeReceived = req.body.code;
    const score = req.body.score;
    const testCases = req.body.testcases;

    submittedQuestion.find({ user_id : userId , question_id : questionId }).then((data)=>{
        console.log(data);
        if(data.length != 0){
            //UPDATING DATA
            submittedQuestion.findOneAndUpdate({ user_id : userId , question_id : questionId  } , {$set : {code : codeReceived , score : score , language : codeLanguage , testcases : testCases}},{ new :true})
            .then((updatedData)=>{
                res.json(updatedData);
                res.end();
            });
            
        }
        else{
            console.log("save the data");
            
            //SAVING DATA TO DB
            const submitted_question = new submittedQuestion({
                user_id: userId,
                question_id : questionId,
                language : codeLanguage,
                code: codeReceived,
                score : score,
                testcases : testCases 

            });

            submitted_question.save().then((save)=>{
                if(save)
                {
                    console.log("data saved " + save);
                }
                else{
                    console.log("error in storing newly submitted question");
                }
                res.end("4000");
            });
        }
    }).catch(err =>{
        console.log(err);
    });

});




module.exports = router;