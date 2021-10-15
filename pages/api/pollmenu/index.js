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
    const {
      method,
      body,
    } = req;
    const { organization_id = 0, poll_id = 1 } = req.query;
    let _search = {
      // organization_id: organization_id,
      is_deleted: 0,
      // is_primary_menu: poll_id
    };

    // console.log(_search)
    const _menu = await models.poll_questions.findAndCountAll({
      // attributes: ['package_id','code_package','name_package','size_limit']
      where: _search,
      // offset: results * (page - 1),
      // limit: parseInt(results),

      order: [
        ["poll_questions_seq", "ASC"],
        ["poll_questions_id", "ASC"]
      ]
    });
    return res.status(200).json({
      // info: {
      //   page: page,
      //   results: results
      // },
      results: _menu.rows,
      totalCount: _menu.count
    });
  })
  .post(async (req, res) => {
    const { body } = req;
    const { slug } = req.query;
    const {
      // organization_id,
      poll_questions_title,
      organization_id,
      poll_questions_seq,
      poll_id
    } = body;
    //SampleText.replace("Developer", "App Builder");
    const dataMenu = {
      // organization_id: organization_id,
      poll_questions_title: poll_questions_title,
      organization_id: organization_id,
      poll_questions_seq: poll_questions_seq,
      poll_id: poll_id
    };

    if (
      // organization_id == undefined ||
      poll_questions_title == undefined ||
      organization_id == undefined ||
      poll_id == undefined
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
    const newMenu = await models.poll_questions.create(dataMenu);

    if (newMenu == null) {
      return res.status(500).json({
        status: 500,
        message: 'Internal error',
      });
    }

    // is_deleted: DataTypes.INTEGER,
    // date_created: DataTypes.DATE,
    // date_updated: DataTypes.DATE,
    // ip: DataTypes.STRING,
    // poll_questions_seq: DataTypes.INTEGER
    const dataMenuOption1 = {
      // organization_id: organization_id,
      poll_questions_id: newMenu.null,
      poll_options_name: "ดีมาก",
      poll_options_score: 5,
      is_deleted: 0,
      date_created: currentDate.replace("+07:00", "+00:00"),
      date_updated: currentDate.replace("+07:00", "+00:00"),
      ip: ip,
      poll_questions_seq: 0,
    };
    const newMenuOption1 = await models.poll_options.create(dataMenuOption1);

    const dataMenuOption2 = {
      // organization_id: organization_id,
      poll_questions_id: newMenu.null,
      poll_options_name: "ดี",
      poll_options_score: 4,
      is_deleted: 0,
      date_created: currentDate.replace("+07:00", "+00:00"),
      date_updated: currentDate.replace("+07:00", "+00:00"),
      ip: ip,
      poll_questions_seq: 1,
    };
    const newMenuOption2 = await models.poll_options.create(dataMenuOption2);

    const dataMenuOption3 = {
      // organization_id: organization_id,
      poll_questions_id: newMenu.null,
      poll_options_name: "พอใช้",
      poll_options_score: 3,
      is_deleted: 0,
      date_created: currentDate.replace("+07:00", "+00:00"),
      date_updated: currentDate.replace("+07:00", "+00:00"),
      ip: ip,
      poll_questions_seq: 2,
    };
    const newMenuOption3 = await models.poll_options.create(dataMenuOption3);

    const dataMenuOption4 = {
      // organization_id: organization_id,
      poll_questions_id: newMenu.null,
      poll_options_name: "น้อย",
      poll_options_score: 2,
      is_deleted: 0,
      date_created: currentDate.replace("+07:00", "+00:00"),
      date_updated: currentDate.replace("+07:00", "+00:00"),
      ip: ip,
      poll_questions_seq: 3,
    };
    const newMenuOption4 = await models.poll_options.create(dataMenuOption4);

    const dataMenuOption5 = {
      // organization_id: organization_id,
      poll_questions_id: newMenu.null,
      poll_options_name: "ควรปรับปรุง",
      poll_options_score: 1,
      is_deleted: 0,
      date_created: currentDate.replace("+07:00", "+00:00"),
      date_updated: currentDate.replace("+07:00", "+00:00"),
      ip: ip,
      poll_questions_seq: 4,
    };
    const newMenuOption5 = await models.poll_options.create(dataMenuOption5);

    return res.status(200).json({
      status: 200,
      message: 'บันทึกข้อมูลสำเร็จ',
    });
  });



export default handler;
