const express = require('express');
const router = express.Router();

//IMPORTING MODELS
const submittedQuestion = require('../models/submitted-questions');


router.get('/:uid/:qid' ,(req,res)=>{
    const userId = req.params.uid;
    const questionId = req.params.qid;
    

    submittedQuestion.find({ user_id : userId , question_id : questionId }).then((data)=>{
        res.json(data);
        res.end();
    });
});

module.exports = router;