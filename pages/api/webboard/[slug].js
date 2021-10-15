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
    const question_id = slug;

    const webboard_q = await models.webboard_qs.findOne({
      where: {
        question_id: question_id,
      },
    });

    return res.status(200).json({
      status: 200,
      message: 'success',
      webboard_q: webboard_q ? webboard_q : [],
    });
  })
  .put(async (req, res) => {
    const { body } = req;
    const { slug } = req.query;
    const question_id = slug;
    const {
      question_title,
      question_detail,
      question_post,
      question_personid,
      is_show_personid,
      is_approve,
      date_question_date,
    } = body;

    //SampleText.replace("Developer", "App Builder");
    const dataWebboard_q = {
      question_title: question_title,
      question_detail: question_detail,
      question_post: question_post,
      question_personid: question_personid,
      is_show_personid: is_show_personid,
      is_approve: is_approve,
      date_question_date: date_question_date.replace('+07:00', '+00:00'),
    };

    if (
      question_title == undefined ||
      question_detail == undefined ||
      question_post == undefined ||
      question_personid == undefined ||
      is_show_personid == undefined ||
      is_approve == undefined ||
      date_question_date == undefined
    ) {
      return res.status(200).json({
        status: 201,
        message: 'data incorrect',
        question_id: question_id,
        data: dataWebboard_q,
      });
    }
    
    var ip = await getIPAddress()
    var currentDate = moment().format()
    dataWebboard_q.ip = ip
    dataWebboard_q.is_deleted = 0
    dataWebboard_q.date_updated = currentDate.replace("+07:00", "+00:00")

    const webboard_qDataResult = await models.webboard_qs.update(
      dataWebboard_q,
      {
        where: {
          question_id: question_id,
        },
      },
    );

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
    const question_id = slug;
    if (question_id == undefined) {
      return res.status(200).json({
        status: 201,
        message: 'data incorrect',
        question_id: question_id,
      });
    }

    const dataWebboard_q = {
      is_deleted: 1,
    };

    const webboard_q = await models.webboard_qs.update(dataWebboard_q, {
      where: {
        question_id: question_id,
      },
    });

    return res.status(200).json({
      status: 200,
      message: 'success',
      webboard_q: webboard_q ? webboard_q : [],
    });
  });

export default handler;
