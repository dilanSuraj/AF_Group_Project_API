var nodemailer = require('nodemailer');

var EmailController = function () {

    this.sendMail = function (instructorData) {

           let instructorMail = instructorData.email;
           let instructorName = instructorData.name;

            var output =
                `<b>E - StudentInfo System</b>
                <p>Dear ${instructorName}, We warmly welcome for our web site</p>`;

            let transporter = nodemailer.createTransport({
                service: 'gmail',
                secure: false,
                port: 25,
                auth: {
                    user:'estudentinfoa@gmail.com',
                    pass: 'eStudentInfoApp01'
                },
                tls:{
                    rejectUnauthorized:false
                }
            });

            let mailOptions = {
                from: '"E - StudentInfo System" <estudentinfoa@gmail.com>',
                to: instructorMail,
                subject: 'Instructor Account Creation Confirmation',
                text: 'Hello',
                html: output
            };

            transporter.sendMail(mailOptions,(err,info)=>{
                if(err){
                    return console.log(err);
                }
                console.log('Message sent: '+ info.messageId);
                console.log('Preview URL: '+ nodemailer.getTestMessageUrl(info));

            });

    }

};

module.exports = new EmailController();