const multer = require('multer'),
    path = require('path'),
    crypto = require('crypto');

module.exports = {
    dest: path.resolve(__dirname, '..', '..', 'public', 'uploads'),
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, '..', '..', 'public', 'uploads'))
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(8, (err, hash) => {
                if (err) cb(err)
                const [, extension] = file.originalname.split(".")
                const fileName = `${hash.toString('hex')}.${extension}`; //-${file.originalname}
                cb(null, fileName)
            })
        }
    }),
    limits: {
        fileSize: 2 * 1024 * 1024, //2MB
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            'image/jpeg',
            'image/jpg',
            // 'image/pjpeg',
            'image/png'
            //  'image/gif'
        ]
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true)
        } else {
            cb(new Error('Tipo de Arquivo Inválido'))
        }
    }
}