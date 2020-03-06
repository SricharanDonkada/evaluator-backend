const express = require('express');
const router  = express.Router();

//USING NODEMAILER
const nodemailer = require('nodemailer');


// create reusable transporter object using the default SMTP transport



//IMPORTING MODELS
const userData = require('../models/user-data');


//SIGN-UP ROUTE AND SENDING AN EMAIL FOR CONFIRMATION OF ACCOUNT
router.post('/sign-up',(req,res)=>{
    const user = new userData({
        username : req.body.username,
        email : req.body.email,
        password : req.body.password,
    });
    user.save().then(data =>{

        //CREATING A VARIABLE FOR LINK
      const link = 'http://192.168.100.30:3000/user/email-verification/'+data._id;


      //SENDING AN MAIL
      let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: 'ciesrkr@gmail.com',
            pass: 'rkrseic#1'
        }
    });
    
    let mailOptions = {
        from: 'ciesrkr@gmail.com',
        to: data.email,
        subject: 'Test',
        text: 'Click on the following link to verify your account : ' + link
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error.message);
        }
        console.log('success');
    });
    
          console.log(data);
    })
    .catch(err =>{
        console.log(err);
    });
    res.end("200");
});

//IF THE GIVEN MAIL IS VERIFIED IT IS UPDATED AND REDIRECTED TO LOGIN PAGE
router.get('/email-verification/:id', (req,res) =>
{
    console.log(req.params.id);
    userData.findByIdAndUpdate( req.params.id  , { $set: { isVerified : true }} , {new: true}).then((userInfo) =>{
        console.log(userInfo);
    });
    res.send('Your account has been verified please login and continue conding!!!!!');
});



//LOGIN ROUTE
router.post('/login' , (req,res)=>{
    console.log(req.body);
    const mailId = req.body.email;
    const password = req.body.password; 

    userData.findOne( { email: mailId }).then((data) => {
        console.log(data);
        const user = {
            username : data.username ,
            email :  data.email,
            userID : data._id
        };
        const message = '';

        //ACCOUNT VERIFICATION

        if(!data)
        {
            if(password != data.password)
            {  
                message =  "Incorrect Password";
                res.json({message : message , user: user});                
            }
            else{
                if(data.isVerified)
                {
                    message ="";
                    res.json({message : message , user: user});
                }
                else{
                    message = "Your account has not been verified. Please verify your account";
                    res.json({message : message , user: user});
                }
            }
        }
        else{
            message = "Account with given email doesnot exist";
            res.json({message: message,  user : user });
        }

    });

    res.end("300");
});

module.exports = router;