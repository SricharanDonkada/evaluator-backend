const express = require('express');
const {c, cpp, node, python, java} = require('compile-run');
const router  =  express.Router();

router.post('/c' , (req,res)=>{
    data = req.body;
    code = data.code;
    input = data.input;
    c.runSource(data.code , { stdin : input } , (err , result)=>{
        if(err)
        {
            console.log('error in compiling code');
            res.json(err);
            res.end();
        }
        else{
            console.log(result);
            res.json(result);
            res.end();
        }
    }); 

});

module.exports = router;