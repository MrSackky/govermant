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
    const journal_id = slug;

    const journal = await models.journals.findOne({
      where: {
        journal_id : journal_id,
      },
     
    });
    
    
    return res.status(200).json({
      status: 200,
      message: "success",
      journal: journal ? journal : []
    });
  })
  .put(async (req, res) => {
    const { body } = req;
    const { slug } = req.query;
    const journal_id = slug;
    const {
      journal_subject,
      journal_detail,
      journal_file,
      journal_ori,
      is_show,
      journal_img,
    } = body;

    //SampleText.replace("Developer", "App Builder");
    const dataJournal = {
      journal_subject: journal_subject,
      journal_detail: journal_detail,
      journal_file: journal_file,
      journal_ori: journal_ori.replace('+07:00', '+00:00'),
      is_show: is_show,
      journal_img: journal_img,
    };

    if (
      journal_subject == undefined ||
      journal_detail == undefined ||
      journal_file == undefined ||
      journal_ori == undefined ||
      is_show == undefined ||
      journal_img  == undefined
    ) {
      return res.status(200).json({
        status: 201,
        message: 'data incorrect',
        journal_id: journal_id,
        data: dataJournal,
      });
    }
    
    var ip = await getIPAddress()
    var currentDate = moment().format()
    dataJournal.ip = ip
    dataJournal.is_deleted = 0
    dataJournal.date_update = currentDate.replace("+07:00", "+00:00")

    const journalDataResult = await models.journals.update(dataJournal, {
      where: {
        journal_id: journal_id,
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
    const journal_id = slug;
    if (journal_id == undefined) {
      return res.status(200).json({
        status: 201,
        message: 'data incorrect',
        journal_id: journal_id,
      });
    }

    const dataJournal = {
      is_deleted: 1,
    };

    const journal = await models.journals.update(dataJournal, {
      where: {
        journal_id: journal_id,
      },
    });

    return res.status(200).json({
      status: 200,
      message: 'success',
      journal: journal ? journal : [],
    });
  });

export default handler;
