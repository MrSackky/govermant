import nextConnect from 'next-connect';
const models = require('../../../../db/models/index');
import middleware from '../../../../middleware/auth';
import { addDays, getIPAddress } from '../../../../middleware/utils';
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
import moment from 'moment';

const handler = nextConnect()
  // Middleware
  .use(middleware)
  // Get method
  .get(async (req, res) => {
    return res.status(400).json({
      status: 400,
      message: 'deny permission!!',
    });
  })
  // Post method
  .post(async (req, res) => {
    const { body } = req;
    const { slug } = req.query;
    const {
      organization_id,
      file_name,
      file_name_ori,
      file_subject,
      file_url,
      is_show,
      download,
      is_deleted,
    } = body;
    // const userId = slug;

    const dataUser = {
      "organization_id": organization_id,
      "file_name": file_name,
      "file_name_ori": file_name_ori,
      "file_subject": file_subject,
      "file_url": file_url,
      "is_show": is_show,
      "download": download,
      "is_deleted": is_deleted,
    };
    console.log(dataUser);
    if (
      organization_id == undefined ||
      file_name == undefined ||
      file_name_ori == undefined ||
      file_subject == undefined ||
      file_url == undefined ||
      download == undefined ||
      is_deleted == undefined
    ) {
      return res.status(200).json({
        status: 201,
        message: 'data incorrect',
        dataUser: dataUser,
      });
    }

    var ip = await getIPAddress()
    var currentDate = moment().format()
    dataUser.ip = ip
    dataUser.is_deleted = 0
    dataUser.date_created = currentDate.replace("+07:00", "+00:00")
    dataUser.date_update = currentDate.replace("+07:00", "+00:00")

    const newDocuments = await models.store_documents.create(dataUser);

    if (newDocuments == null) {
      return res.status(500).json({
        status: 500,
        message: 'Internal error',
      });
    }

    return res.status(200).json({
      status: 200,
      message: 'Insert completed',
    });
  });

export default handler;
