const nodemailer = require("nodemailer");
class SMTP {

    constructor() {
        this.TRANSPORTER = {
            host: process.env.SMTP_HOST ? process.env.SMTP_HOST : 'mail.chegarapido.com.br',
            port: process.env.SMTP_PORT ? process.env.SMTP_PORT : 465,
            secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE : true,
            auth: {
                user: process.env.SMTP_USER ? process.env.SMTP_USER : 'express@chegarapido.com.br',
                pass: process.env.SMTP_PASS ? process.env.SMTP_PASS : 'S3-F2Mh%z])5'
            }
        };
    }

    async send(to = 'mattbmoller@gmail.com',
        subject = 'teste',
        text = 'teste',
        html = 'teste') {

        const transporter = nodemailer.createTransport(this.TRANSPORTER);

        return await transporter.sendMail({
            from: process.env.SMTP_FROM ? process.env.SMTP_FROM : `"Chega Rapido Express" <express@chegarapido.com.br>`,
            to,
            subject,
            text,
            html
        }).catch(e => console.error(e));

    }

}

module.exports = new SMTP();