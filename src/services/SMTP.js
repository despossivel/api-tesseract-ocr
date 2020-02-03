const nodemailer = require("nodemailer");

class SMTP {

    constructor() {
        this.TRANSPORTER = {
            host: process.env.SMTP_HOST ? process.env.SMTP_HOST : 'smtpout.secureserver.net',
            port: process.env.SMTP_PORT ? process.env.SMTP_PORT : 465,
            secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE : true,
            auth: {
                user: process.env.SMTP_USER ? process.env.SMTP_USER : 'contato@centavus.com',
                pass: process.env.SMTP_PASS ? process.env.SMTP_PASS : 'contato@123.'
            }
        };
    }

    async send(to = 'mattbmoller@gmail.com',
        subject = 'teste',
        text = 'teste',
        html = 'teste') {

        const transporter = nodemailer.createTransport({
            ...this.TRANSPORTER
        });

        return await transporter.sendMail({
            from: process.env.SMTP_FROM ? process.env.SMTP_FROM : `"Centavus" <contato@centavus.com>`,
            to,
            subject,
            text,
            html
        }).catch(e => console.error(e));

    }

}

module.exports = () => new SMTP();