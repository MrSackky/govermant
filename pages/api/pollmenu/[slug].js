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
      query: { id, name },
    } = req;
    const { slug } = req.query;
    const poll_id = slug;

    const poll = await models.poll_questions.findAndCountAll({
      where: {
        poll_id: poll_id,
        is_deleted: 0,
      },

      include: [
        {
          model: models.poll_options,
          as: 'options',
          where: {
            is_deleted: 0
          },
        },
      ],

      order: [
        ["poll_questions_seq", "ASC"],
        ["poll_questions_id", "ASC"],
        ['options', 'poll_questions_seq', 'ASC'],
        ['options', 'poll_option_id', 'ASC']
      ]

    });

    return res.status(200).json({
      status: 200,
      message: 'success',
      pollQuestions: poll ? poll.rows : [],
    });

  })
  .put(async (req, res) => {
    const { body } = req;
    const { slug } = req.query;
    const menu_id = slug;
    const {
      poll_questions_title,
      poll_questions_seq
    } = body;
    //SampleText.replace("Developer", "App Builder");
    const dataMenu = {
      poll_questions_title: poll_questions_title,
      // poll_questions_seq: poll_questions_seq
    };

    if (
      poll_questions_title == undefined
      // poll_questions_seq == undefined
    ) {
      return res.status(200).json({
        status: 201,
        message: 'data incorrect',
        poll_questions_id: menu_id,
        data: dataMenu
      });
    }


    const menuDataResult = await models.poll_questions.update(
      dataMenu, {
      where: {
        poll_questions_id: menu_id
      }
    }
    );

    return res.status(200).json({
      status: 200,
      message: "success",
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
    const menu_id = slug;
    if (menu_id == undefined) {
      return res.status(200).json({
        status: 201,
        message: 'data incorrect',
        menu_id: menu_id,
      });
    }
    var ip = await getIPAddress()
    var currentDate = moment().format()
    // dataMenu.ip = ip
    // dataMenu.is_deleted = 0
    // dataMenu.date_created = currentDate.replace("+07:00", "+00:00")
    // dataMenu.date_updated = currentDate.replace("+07:00", "+00:00")
    const dataInformation = {
      is_deleted: 1,
      ip: ip,
      date_updated: currentDate.replace("+07:00", "+00:00"),
    };

    const _menu = await models.poll_questions.update(dataInformation, {
      where: {
        poll_questions_id: menu_id,
      },
    });

    return res.status(200).json({
      status: 200,
      message: 'success',
    });
  });

export default handler;
