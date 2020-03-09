const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const {
    c,
    cpp,
    pyhton,
    java
} = require('compile-run'); 

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


// IMPORTING ROUTES
const userRoute = require('./routes/user.js');
const codeJamRoute  = require('./routes/codejam');
const questionDetailRoute = require('./routes/question');
const evaluateRoute = require('./routes/evaluate');
const submissionRoute = require('./routes/save-submittedQuestion');
const savedQuestionDataRoute = require('./routes/getSavedCode');
const getLeaderboardRoute = require('./routes/getleaderboard');



// CONNECTING TO DB
mongoose.connect('mongodb://localhost:27017/Evaluator' ,{useNewUrlParser : true ,useUnifiedTopology: true  } , (err)=>{
    if(!err){
        console.log('succesfully connected to db');
    }
    else{
        console.log(err);
    }
});


//LISTENING TO THE SERVER
app.listen(4000 ,()=>{
    console.log('server started at 4000');
});
 

//ROUTES
app.use('/user', userRoute);
app.use('/codejam' , codeJamRoute);
app.use('/question-detail' , questionDetailRoute);
app.use('/evaluate' , evaluateRoute);
app.use('/submit-user-code' , submissionRoute);
app.use('/saved-code' , savedQuestionDataRoute);
app.use('/getleaderboard' , getLeaderboardRoute);