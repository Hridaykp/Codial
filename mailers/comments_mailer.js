const nodeMailer = require('../config/nodemailer');

// this is the another way to exporting functions
exports.newComment = (comment) => {
    console.log('inside newComment mailer', comment);

    nodeMailer.transporter.sendMail({
        from: 'tempmail21498@gmail.com',
        to: 'xipaddiziddi-4311@yopmail.com',
        subject: "New Comment Published",
        html: "<h1> Yup, your comment is now published</h1>"
    }, (err, info) => {
        if(err){
            console.log("error in sending mail", err);
            return;
        }
        console.log("Message sent", info);
        return;
    });
}