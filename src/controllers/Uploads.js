const request = require('request')
const fs = require('fs')
const path = require('path')

const tesseract = require("node-tesseract-ocr")

class Uploads {

	async foto(req, res) {
		// const { _id } = req.body,


		// console.log(' req.file >>> ',  req.file)


 

		const filename = { foto: req.file.filename };


		// https://community.blueprism.com/communities/community-home/digestviewer/viewthread?GroupId=433&MessageKey=8f7d1dd6-4120-481b-9085-180c1cd33852&CommunityKey=4a78c71e-844a-422f-bd20-3bf6c4fbd146&tab=digestviewer
		// https://github.com/tesseract-ocr/tessdata/blob/main/por.traineddata


		// tesseract "/usr/src/app/public/uploads/5764656fc71a8158.jpeg" stdout -l por --oem 1 --psm 3
		const config = {
			lang: "por",
			oem: 1,
			psm: 3,
		}




		const IMG = `${path.resolve(__dirname, '..', '..', 'public', 'uploads')}/${filename.foto}`;

		// var writeFileStream = fs.createWriteStream(IMG)


		// console.log(IMG)

		// request(IMG).pipe(writeFileStream).on('close', function () {
		// 	console.log(url, 'saved to', filename.foto)


		tesseract
			.recognize(IMG, config)
			.then((text) => {
				// console.log("Result:", text)

				res.status(200).send({
					success: true,
					result: text
				});


			})
			.catch((error) => {
				console.log(error.message)
			})


		// })









	}



}


module.exports = new Uploads()