const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

//IMPORTING MODELS
const submittedQuestion = require('../models/submitted-questions');
const codeJam = require('../models/code-jam');
const leaderBoard = require('../models/leaderboard');
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
    const id = req.body.cjid;
    const userName  = req.body.username;
    

    submittedQuestion.find({ user_id : userId , question_id : questionId }).then((data)=>{
        console.log(data);
        if(data.length != 0){
            var dupArray =[]
            var  new_score = 0;
            //UPDATING SCORE IN LEADERBOARD
            leaderBoard.findOne({ cjid : id , user_id : userId}).then((leaderboardData)=>{
                console.log(leaderboardData.score);
                console.log( 'data score : ', data[0].score);
                new_score = leaderboardData.score - data[0].score + score;
                console.log(score , new_score);
                leaderBoard.findOneAndUpdate({cjid : id , user_id : userId }, {$set:{score : new_score}} , { new : true })
            .then((updatedLeaderboard)=>{
                console.log(updatedLeaderboard);
            });
            });
            
            //UPDATING DATA IN SUBMITTEDQUESTION COLLECTION
            submittedQuestion.findOneAndUpdate({ user_id : userId , question_id : questionId  } , {$set : {code : codeReceived , score : score , language : codeLanguage , testcases : testCases}},{ new :true})
            .then((updatedData)=>{
                res.json(updatedData);
                res.end();
            });
            
        }
        else{
            
            
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
                
            });

            //SAVING DATA TO LEADERBOARD
            const leaderboardObject = new leaderBoard( {
                cjid : id,
                user_id : userId,
                username : userName,
                score : score
            });
            var newScore = 0 ;
            leaderBoard.findOne( { cjid : id , user_id : userId}).then((fetchedLeaderboardData) =>{
                if(fetchedLeaderboardData){
                    newScore = fetchedLeaderboardData.score + score;
                    leaderBoard.findOneAndUpdate({ cjid : id , user_id : userId} , {$set:{score :newScore}} , {new : true})
                    .then((updatedScoreInLeaderboard)=>{
                        console.log(updatedScoreInLeaderboard);
                    });
                }
                else{
                    leaderboardObject.save().then((savedLeaderboard)=>{
                        console.log(savedLeaderboard);
                    });
                }
            });
            
            
        }
    }).catch(err =>{
        console.log(err);
    });

});




module.exports = router;