import nextConnect from 'next-connect';
const models = require('../../../db/models/index');
import middleware from '../../../middleware/auth';
import { addDays , getIPAddress } from '../../../middleware/utils';
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
import moment from 'moment';

const handler = nextConnect()
  // Middleware
  .use(middleware)
  // Get method
  .get(async (req, res) => {
    const {
      query: { id, name },
    } = req;
    const { slug } = req.query;
    const file_id = slug;

    const documents = await models.store_documents.findOne({
      where: {
        file_id: file_id,
      },
    });

    return res.status(200).json({
      status: 200,
      message: 'success',
      documents: documents ? documents : [],
    });
  })
  .put(async (req, res) => {
    const { body } = req;
    const { slug } = req.query;
    const file_id = slug;
    const {
      file_name,
      file_name_ori,
      file_subject,
      file_url,
      is_show,
      download,
      is_deleted,
    } = body;

    //SampleText.replace("Developer", "App Builder");
    const dataDocuments = {
      "file_name": file_name,
      "file_name_ori": file_name_ori,
      "file_subject": file_subject,
      "file_url": file_url,
      "is_show": is_show,
      "download": download,
      "is_deleted": is_deleted,
    };

    if (
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
        file_id: file_id,
        data: dataDocuments,
      });
    }

    var ip = await getIPAddress()
    var currentDate = moment().format()
    dataDocuments.ip = ip
    dataDocuments.is_deleted = 0
    dataDocuments.date_update = currentDate.replace("+07:00", "+00:00")

    const documentsDataResult = await models.store_documents.update(dataDocuments, {
      where: {
        file_id: file_id,
      },
    });

    return res.status(200).json({
      status: 200,
      message: 'success',
      // organization: organization ? organization : []
    });

    // await User.update({ lastName: "Doe" }, {
    //   where: {
    //     lastName: null
    //   }
    // });
  })
  .delete(async (req, res) => {
    const { body } = req;
    const { slug } = req.query;
    const file_id = slug;
    if (file_id == undefined) {
      return res.status(200).json({
        status: 201,
        message: 'data incorrect',
        file_id: file_id,
      });
    }

    const dataDocuments = {
      is_deleted: 1,
    };

    const documents = await models.store_documents.update(dataDocuments, {
      where: {
        file_id: file_id,
      },
    });

    return res.status(200).json({
      status: 200,
      message: 'success',
      documents: documents ? documents : [],
    });
  });

export default handler;
