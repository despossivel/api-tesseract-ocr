const admin = require('firebase-admin');
const serviceAccount = require("./pinpper-f1358-firebase-adminsdk-wznvj-78154824e0.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://pinpper-f1358.firebaseio.com"
});

class Notification {
    
    constructor({ SAccount, initialize }) {
        this.serviceAccount = SAccount;
    }

    //o token dever ser obtido pelo proprio cliente e repassado ao servido
    async getToken() { }

    async send(message) {
        try {
            const response = await admin.messaging().send(message)
            return response;
        } catch (err) {
            console.log(err)
        }
    }

    async sendMulticast(message) {
        try {
            const response = await admin.messaging().sendMulticast(message)
            return response;
        } catch (err) {
            console.log(err)
        }
    }

}

module.exports = new Notification(serviceAccount);
// const firebase = new Notification(serviceAccount);
// const destino = 'cVNghpToRsImpuvMKokz_T:APA91bHxsd4j-mHlnNJHo213lXc7CeHSfSNzI0Tpb1dNXdORK5EMDwv11ob1-6p_D8zGSpJj_ReSnqyNWBjBG_177K9-CTPiHu6ylgOUVkdEXpzEWPIoIlUOA9mmAgOhyC_K_2udwx0r';
// firebase.send({
//     data: {
//         title: 'teste',
//         body: 'teste dois'
//     },
//     token: destino
// })
// firebase.sendMulticast({
//     data: {
//         title: 'teste',
//         body: 'teste dois'
//     },
//     tokens: [destino]
// })
