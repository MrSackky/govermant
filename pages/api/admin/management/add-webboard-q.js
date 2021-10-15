import nextConnect from 'next-connect';
const models = require('../../../../db/models/index');
import middleware from '../../../../middleware/auth';
import { addDays } from '../../../../middleware/utils';
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
      question_title,
      question_detail,
      question_post,
      question_personid,
      is_show_personid,
      is_approve,
      approve_date,
      date_question_date,
      question_view,
    } = body;
    // const userId = slug;

    const dataUser = {
      "organization_id": organization_id,
      "question_title": question_title,
      "question_detail": question_detail,
      "question_post": question_post,
      "question_personid": question_personid,
      "is_show_personid": is_show_personid,
      "is_approve": is_approve,
      "date_question_date": date_question_date.replace("+07:00", "+00:00"),
      "question_view": question_view,
    };
    console.log(dataUser);
    if (
      organization_id == undefined ||
      question_title == undefined ||
      question_detail == undefined ||
      question_post == undefined ||
      question_personid == undefined ||
      is_show_personid == undefined ||
      is_approve == undefined ||
      approve_date == undefined ||
      date_question_date == undefined ||
      question_view == undefined
    ) {
      return res.status(200).json({
        status: 201,
        message: 'data incorrect',
        dataUser: dataUser,
      });
    }
    
    var currentDate = moment().format()
    dataUser.is_deleted = 0
    dataUser.approve_date = currentDate.replace("+07:00", "+00:00")
    dataUser.date_created = currentDate.replace("+07:00", "+00:00")
    dataUser.date_updated = currentDate.replace("+07:00", "+00:00")

    const newAddactivities = await models.webboard_qs.create(dataUser);

    if (newAddactivities == null) {
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
