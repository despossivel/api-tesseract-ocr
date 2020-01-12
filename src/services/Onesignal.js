const https = require('https');


class Onesignal {

    constructor() {

        this.OPTIONS = {
            host: "onesignal.com",
            port: 443,
            path: "/api/v1/notifications",
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": `Basic ${process.env.ONESIGNAL_AUTHORIZATION
                    ? process.env.ONESIGNAL_AUTHORIZATION
                    : 'MTQyNDhkY2MtOWI4MC00M2M0LTgyZGMtMjM1MDAzZGFlMjVj'}`
            }
        }

    }

    async send(title = 'teste',
        msg = 'ola, isso é um teste',
        include_player_ids = ['51d1a20c-006f-4a92-9454-5a861aa3a206']) {

        const data = {
            app_id: process.env.ONESIGNAL_APP_ID
                ? process.env.ONESIGNAL_APP_ID
                : 'cb9f46a8-08be-48e9-86a2-da5b880cd58f',
            include_player_ids,
            headings: { "en": title },
            contents: { "en": msg },
            small_icon: "ic_stat_onesignal_default",
            large_icon: "ic_stat_onesignal_default"
        };

        const req = https.request(this.OPTIONS,
            (res) => res.on(data,
                (data) => console.log(JSON.parse(data))));

        req.on('error', (e) => console.error("ERROR:", e));
        req.write(JSON.stringify(data));
        req.end();

    }

}

//const onesignal = new Onesignal();
//const send = onesignal.send()
module.exports = () => new Onesignal();