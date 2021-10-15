import nextConnect from 'next-connect';
const models = require('../../../db/models/index');
import middleware from '../../../middleware/auth';
import middleware2 from '../../../middleware/middleware';
// import formidable from "formidable-serverless";
import Formidable from "formidable-serverless";
// import Formidable from "formidable-serverless";
// import multiparty from 'multiparty'
import fs from "fs";
// import { IncomingForm } from 'formidable-serverless'
import multer from "multer";

export const config = {
  api: {
    bodyParser: false
  }
};

// let storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'public/uploads/')
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '_' + file.originalname)
//   }
// })

// const upload = multer({ dest: 'uploads/' })
const saveFile = async (file) => {
  const data = fs.readFileSync(file.path);
  fs.writeFileSync(`./public/${file.name}`, data);
  await fs.unlinkSync(file.path);
  return;
};


const handler = nextConnect()
  // Middleware
  .use(middleware)
  // .use(middleware2)
  .post(async (req, res) => {
    return new Promise(async (resolve, reject) => {
      try {
        const form = new Formidable.IncomingForm({
          multiples: true,
          keepExtensions: true
        });
        form.uploadDir = "./public/uploads/";
        form.keepExtensions = true;
        form.once("error", console.error);
        form
          .on("fileBegin", (name, file) => {
            console.log("start uploading: ", file.name);
          })
          .on("aborted", () => console.log("Aborted..."));
        form.once("end", () => {
          console.log("Done!");
        });
        await form.parse(req, async (err, fields, files) => {
          if (err) {
            throw String(JSON.stringify(err, null, 2));
          }
          // console.log(files)
          // console.log(
          //   "moving file: ",
          //   files.file.path,
          //   " to ",
          //   `public/uploads/${files.file.name}`
          // );
          // await fs.rename(
          //   files.file.path,
          //   `public/upload/${files.file.name}`,
          //   err => {
          //     if (err) throw err;
          //   }
          // );
          // console.log(fields)
          const upload = await multer({ dest: `public/uploads/c-${fields.id}/` })
          const _files = []
          for (var i in files) {
            // console.log(files[i].path)
            const currentTimeInSeconds = Math.floor(Date.now() / 1000); //unix timestamp in seconds
            fs.renameSync(files[i].path, `public/uploads/c-${fields.id}/${currentTimeInSeconds + '-' + files[i].name}`);
            var data ={
              path : `public/uploads/c-${fields.id}/${currentTimeInSeconds + '-' + files[i].name}`,
              name : files[i].name
            };
            _files.push(data)
          }
          // fs.renameSync(files.file.path, `public/uploads/${files.file.name}`);
          req.form = { fields, files };
          // console.log(fields)
          console.log(_files)

          return res.status(200).json({
            status: 200,
            'success': true,
            
            data: {
              'message': ["Upload completed."],
              "list": _files,
              'type': "file",
            }

          });
          // return resolve((req, res));
        });
      } catch (error) {
        console.log(error)
        return resolve(res.status(403).send(error));
      }
    });

    // try {
    //   const promise = new Promise((resolve, reject) => {
    //     // var form = new formidable.IncomingForm({ uploadDir: __dirname + '/uploaded' });
    //     const form = new formidable.IncomingForm();
    //     form.uploadDir = "uploads/";
    //     form.keepExtensions = true;
    //     form.parse(req, (err, fields, files) => {
    //       if (err) reject(err);
    //       resolve({ fields, files });
    //     })

    //   })

    //   promise.then(({ fields, files }) => {
    //     // res.status(200).json({ fields, files })
    //     console.log(fields)
    //     // console.log(files)
    //     var result = [];


    //     for (var i in files) {
    //       result.push(files[i]);
    //       console.log(files[i])
    //       // const resultUpload =  uploader.single(files[i])
    //       // console.log(resultUpload)
    //     }

    //     // const filesArr = JSON.parse(files);
    //     // console.log(files)
    //     // console.log(result)
    //   })
    // } catch (error) {
    //   console.log("error", error)
    // }


  });


export default handler;
