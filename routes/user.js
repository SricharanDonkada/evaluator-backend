const express = require('express');
const router  = express.Router();

//USING NODEMAILER
const nodemailer = require('nodemailer');


// create reusable transporter object using the default SMTP transport



//IMPORTING MODELS
const userData = require('../models/user-data');

router.post('/sign-up',(req,res)=>{
    const user = new userData({
        username : req.body.username,
        mail : req.body.mail,
        password : req.body.password,
    });
    user.save().then(data =>{


        //SENDING MAIL
        function main() {
            // Generate test SMTP service account from ethereal.email
            // Only needed if you don't have a real mail account for testing
            let testAccount =nodemailer.createTestAccount();
          
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({

                secure: false, // true for 465, false for other ports
                auth: {
                  user: "ciesrkr@gmail.com", // generated ethereal user
                  pass: "rkrseic#1"// generated ethereal password
                }
              });
          
            // send mail with defined transport object
            let info = transporter.sendMail({
                from: "ciesrkr@gmail.com", // sender address
                to: "durganarayanavarma@gmail.com", // list of receivers
                subject: "Hello ✔", // Subject line
                text: "Hello world?", // plain text body
                html: "<b>Hello world?</b>" // html body
              });
          
            console.log("Message sent: %s", info.messageId);
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
          
            // Preview only available when sending through an Ethereal account
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
          }
          main();
        
          console.log(data);
    })
    .catch(err =>{
        console.log(err);
    });
    res.end("200");
});

module.exports = router;