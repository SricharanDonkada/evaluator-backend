const mongoose = require('mongoose');

const codeJamSchema = new mongoose.Schema({
    cjid : {
        type : String
    },
    questions :{
        type : Array
    },
    leaderboard :{
        type: Array
    }
});


module.exports = mongoose.model( 'codeJam' , codeJamSchema);