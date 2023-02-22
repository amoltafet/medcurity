/*
File Name: companyUploader.js
Description: This file contains the uploader for uploading company banners.
Last Modified: February 21, 2023
*/

const multer  = require('multer');
const serverConfig = require('../serverConfig.json');
const path = require('path');
const fs = require('fs');

module.exports = class CompanyUploader {

    constructor() {
		this.storage = multer.diskStorage(
            { 
                destination: function (req, file, cb) { cb(null, path.join(__dirname, serverConfig.server.COMPANY_UPLOAD_PATH)) }, 
                filename: function (req, file, cb) 
                {
                    const id = req.query.companyid;

                    fs.unlink(path.join(__dirname, serverConfig.server.COMPANY_UPLOAD_PATH, `${id}-banner.png`), 
                        () => {});
                    fs.unlink(path.join(__dirname, serverConfig.server.COMPANY_UPLOAD_PATH, `${id}-banner.jpg`),
                        () => {});
                    fs.unlink(path.join(__dirname, serverConfig.server.COMPANY_UPLOAD_PATH, `${id}-banner.jpeg`),
                        () => {});


                    let fn = file.originalname;
                    let file_ext = fn.split('.').pop();

                    cb(null, `${id}-banner.${file_ext}`);
                }
            });

        
        this.upload = multer({ storage: this.storage });
	}
}