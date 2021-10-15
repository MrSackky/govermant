import nextConnect from 'next-connect';
const models = require('../../../db/models/index');
import middleware from '../../../middleware/auth';
import { addDays } from '../../../middleware/utils';
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

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
      journal_subject,
      journal_detail,
      journal_file,
      journal_ori,
      journal_img,
      is_show,
      is_deleted,
    } = body;
    // const userId = slug;

    var myCurrentDate = new Date();
    var myFutureDate = new Date(myCurrentDate);
    myFutureDate.setDate(myFutureDate.getDate() + 8);

    const dataUser = {
      organization_id,
      journal_subject,
      journal_detail,
      journal_file,
      journal_ori,
      journal_img,
      is_show,
      is_deleted,
    };

    if (
      organization_id == undefined ||
      journal_subject == undefined ||
      journal_detail == undefined ||
      journal_file == undefined ||
      journal_ori == undefined ||
      journal_img == undefined ||
      is_deleted == undefined
    ) {
      return res.status(200).json({
        status: 201,
        message: 'data incorrect',
        dataUser: dataUser,
      });
    }
    // const user = await User.create({
    //   username: 'alice123',
    //   isAdmin: true
    // }, { fields: ['username'] });
    const dataJournal = await models.Journal.findOne({
      where: { organization_email: organization_email },
      attributes: ['organization_id', 'organization_email'],
    });
    if (dataJournal != null) {
      return res.status(200).json({
        status: 202,
        message: 'data user "email" is exist',
      });
    }

    const dataUsers = await models.Users.findOne({
      where: { user_name: organization_email },
    });
    if (dataUsers != null) {
      return res.status(200).json({
        status: 203,
        message: 'data user "email" is exist',
      });
    }

    const newJournal = await models.Journal.create(dataUser);

    if (newJournal == null) {
      return res.status(500).json({
        status: 500,
        message: 'Internal error',
      });
    }

    console.log('newJournal');
    console.log(newJournal);
    const dataJournal2 = {
      organization_id: organization_id,
      journal_subject: journal_subject,
      journal_detail: journal_detail,
      journal_file: journal_file,
      journal_ori: journal_ori,
      journal_img: journal_img,
      is_show: is_show,
      is_deleted: is_deleted,
    };

    const newJournal = await models.Journal.create(dataJournal2);

    if (newJournal == null) {
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
