const express = require('express');
const router = express.Router();


//IMPORTING MODELS
const questionDetail = require('../models/question');

router.get('/:id' , (req,res)=>{
    const question_id = req.params.id;
    questionDetail.findOne({_id : question_id}).then((data)=>{
        res.json(data);
        res.end();
    });
   
});

module.exports = router;