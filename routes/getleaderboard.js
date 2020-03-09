const express = require('express');
const router = express.Router();

//IMPORTING MODELS
const leaderboardData = require('../models/leaderboard');


router.get('/:id' , (req,res)=>{
    const cjid = req.params.id;

    leaderboardData.find( {cjid: cjid}).then((data)=>{
        res.json(data);
        res.end();
    });
});

module.exports = router;