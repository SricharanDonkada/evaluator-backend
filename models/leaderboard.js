const mongoose = require('mongoose');

const leaderboardScehma = new mongoose.Schema({
    user_id :{
        type: String
    },
    cjid: {
        type: String
    },
    score:{
        type: Number
    },
    username:{
        type : String
    }
});


module.exports = mongoose.model('leaderBoard' , leaderboardScehma);