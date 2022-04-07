const multer  = require('multer')
const serverConfig = require('./serverConfig.json')
const path = require('path')

module.exports = class BannerUploader {

    constructor() {
		this.storage = multer.diskStorage(
            { 
                destination: function (req, file, cb) { cb(null, path.join(__dirname, serverConfig.server.BANNER_UPLOAD_PATH)) }, 
                filename: function (req, file, cb) 
                {
                    cb(null, `${file.originalname}`);
                }
            });
        this.upload = multer({ storage: this.storage })
	}
}