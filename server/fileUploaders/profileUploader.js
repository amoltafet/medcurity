/*
File Name: profileUploader.js
Description: This file contains the uploader for uploading profile pictures.
Last Modified: February 19, 2023
*/

const multer  = require('multer');
const serverConfig = require('../serverConfig.json');
const path = require('path');
const fs = require('fs');

module.exports = class ProfileUploader {

    constructor() {
		this.storage = multer.diskStorage(
            { 
                destination: function (req, file, cb) { cb(null, path.join(__dirname, serverConfig.server.PROFILE_UPLOAD_PATH)) }, 
                filename: function (req, file, cb) 
                {
                    const id = req.query.userid;

                    fs.unlink(path.join(__dirname, serverConfig.server.PROFILE_UPLOAD_PATH, `${id}-profile.png`), 
                        () => {});
                    fs.unlink(path.join(__dirname, serverConfig.server.PROFILE_UPLOAD_PATH, `${id}-profile.jpg`),
                        () => {});
                    fs.unlink(path.join(__dirname, serverConfig.server.PROFILE_UPLOAD_PATH, `${id}-profile.jpeg`),
                        () => {});


                    let fn = file.originalname;
                    let file_ext = fn.split('.').pop();

                    cb(null, `${id}-profile.${file_ext}`);
                }
            });

        
        this.upload = multer({ storage: this.storage });
	}
}