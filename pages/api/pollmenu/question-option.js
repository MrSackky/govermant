import moment from 'moment';
import nextConnect from 'next-connect';
import middleware from '../../../middleware/auth';
import { getIPAddress } from '../../../middleware/utils';

const models = require('../../../db/models/index');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const handler = nextConnect()
  // Middleware
  .use(middleware)
  // Get method
  .get(async (req, res) => {
  })
  .post(async (req, res) => {
    const { body } = req;
    const { slug } = req.query;

    // "poll_questions_id": dataEdit.menu_id,
    //         "poll_options_name": value.menu_title,
    //         "poll_options_score": content ? value.menu_detail : "",
    //         "poll_option_total_score": 0,
    //         "is_deleted": 0,
    //         "poll_questions_seq": 99999,


    const {
      // organization_id,
      poll_questions_id,
      poll_options_name,
      poll_options_score,
      poll_option_total_score,
      is_deleted,
      poll_questions_seq
    } = body;
    //SampleText.replace("Developer", "App Builder");
    const dataMenu = {
      // organization_id: organization_id,
      poll_questions_id: poll_questions_id,
      poll_options_name: poll_options_name,
      poll_options_score: poll_options_score,
      poll_option_total_score: poll_option_total_score,
      is_deleted: is_deleted,
      poll_questions_seq: poll_questions_seq
    };

    if (
      // organization_id == undefined ||
      poll_questions_id == undefined ||
      poll_options_name == undefined ||
      poll_options_score == undefined
    ) {
      return res.status(200).json({
        status: 201,
        message: 'data incorrect',
        dataMenu: dataMenu
      });
    }
    var ip = await getIPAddress()
    var currentDate = moment().format()
    dataMenu.ip = ip
    dataMenu.is_deleted = 0
    dataMenu.date_created = currentDate.replace("+07:00", "+00:00")
    dataMenu.date_updated = currentDate.replace("+07:00", "+00:00")


    // console.log(dataIntro)
    const newMenu = await models.poll_options.create(dataMenu);

    if (newMenu == null) {
      return res.status(500).json({
        status: 500,
        message: 'Internal error',
      });
    }


    return res.status(200).json({
      status: 200,
      message: 'บันทึกข้อมูลสำเร็จ',
    });
  });



export default handler;
