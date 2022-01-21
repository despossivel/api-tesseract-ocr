# Web service for image reading with machine learning
### Extracting content from images using Tesseract OCR
This is a simple web service with the ability to extract text from images in any language on the globe

##### What he does?

- receive an image
- burn the image to disk
- use tesseract ocr to get the result

##### Dependencies

You can use the container available in the repository just by running
```sh
docker-compose up -d --build
```
or run directly on the host, but for that you need to install tesseract-ocr and tesseract-ocr-por (this gives the ability to successfully get texts in Portuguese) with that just run:
```sh
node index.js
```
in package scripts contains some helper scripts
 
 ##### How to use?
send a request post with the payload in multipart with the image parameter of type file containing the desired image
```sh
http://localhost:8888/upload/image
```

##### using other languages
for that you can use eng(english) which is standard language, other than that you can install other languages, see [here](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions.html) to see the list of supported languages ​​and install using the example prefix:

```sh
tesseract-ocr-PREFIX
```
after change in src/controllers/Uploads.js in config
```sh
	const config = {
			lang: "PREFIX",
			oem: 1,
			psm: 3,
		}
```

#### Comments:
Some images may have poor quality, bad lighting or contrast, so the image can be treated using ImageMagick before the tesseract processes it, to get a more accurate result.

[@desposivel](https://www.linkedin.com/in/despossivel/)