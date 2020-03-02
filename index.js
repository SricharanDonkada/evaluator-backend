const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const {
    c,
    cpp,
    pyhton,
    java
} = require('compile-run');


app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


// IMPORTING ROUTES
const userRoute = require('./routes/user.js');


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
app.listen(3000 ,()=>{
    console.log('server started at 3000');
});
 
app.use('/user', userRoute);
