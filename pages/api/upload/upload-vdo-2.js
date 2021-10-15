import nextConnect from 'next-connect';
const dotenv = require("dotenv")
const process = dotenv.config()
const models = require('../../../db/models/index');
import middleware from '../../../middleware/auth';
import middleware2 from '../../../middleware/middleware';
// import formidable from "formidable-serverless";
import Formidable from "formidable-serverless";
// import Formidable from "formidable-serverless";
// import multiparty from 'multiparty'
// import fs from "fs";
// import { IncomingForm } from 'formidable-serverless'
import multer from "multer";
var fs = require('fs');
var readline = require('readline');
var { google } = require('googleapis');
var OAuth2 = google.auth.OAuth2;




const handler = nextConnect()
    // Middleware
    .use(middleware)
    .get(async (req, res) => {

        return res.status(200).json({
            status: 200,
            'success': true,
            'message': "PK",

        });

    });

export default handler;
