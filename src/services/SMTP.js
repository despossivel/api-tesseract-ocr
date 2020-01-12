const nodemailer = require("nodemailer");

class SMTP {

    constructor(){
 
        this.TRANSPORTER = {
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: process.env.SMTP_SECURE,
            auth: {
                use:process.env.SMTP_USE,
                pass:process.env.SMTP_PASS
            }
          };
    }

    async send(to='mattbmoller@gmail.com',
        subject='teste',
        text='teste',
        html='teste'){
        const transporter = nodemailer.createTransport({
            ...this.TRANSPORTER
          });

       return await transporter.sendMail({
            from: process.env.SMTP_FROM,
            to,
            subject,
            text,
            html
          }).catch(e=>console.error(e));

    }

}

const smtp = new SMTP()
    smtp.send()