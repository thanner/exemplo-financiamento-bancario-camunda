const nodemailer = require('nodemailer');

const from = 'insertEmail';
const password = 'insertPassword';
const service = 'gmail';

const transporter = nodemailer.createTransport({
    service,
    auth: {
        user: from,
        pass: password
    }
})

const sendMail = async (to, subject, html) => {
    const mailOptions = { from, to, subject, html }

    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log(`Email ${subject} enviado para ${to} com sucesso!`);
        }
    })
}

module.exports = { sendMail }