const express = require('express');
const router  = express.Router();


//IMPORTING MODELS
const codeJam = require('../models/code-jam');

router.get('/:id' , (req,res)=>{
    console.log('code jam request');
    const jamid = req.params.id;
    codeJam.findOne({cjid : jamid} ).then((data)=>{
        res.json(data);
        res.end();
    });
    
});


module.exports = router;