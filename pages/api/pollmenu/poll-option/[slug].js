import moment from 'moment';
import nextConnect from 'next-connect';
import middleware from '../../../../middleware/auth';
import { getIPAddress } from '../../../../middleware/utils';
const models = require('../../../../db/models/index');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const handler = nextConnect()
  // Middleware
  .use(middleware)
  // Get method
  .get(async (req, res) => {

  })
  .put(async (req, res) => {
    const { body } = req;
    const { slug } = req.query;
    const poll_option_id = slug;
    const {
      poll_options_name,
      poll_options_score
    } = body;
    //SampleText.replace("Developer", "App Builder");
    const dataMenu = {
      poll_options_name: poll_options_name,
      poll_options_score: poll_options_score,
    };

    if (
      poll_options_name == undefined,
      poll_options_score == undefined
      // poll_questions_seq == undefined
    ) {
      return res.status(200).json({
        status: 201,
        message: 'data incorrect',
        poll_option_id: poll_option_id,
        data: dataMenu
      });
    }


    const menuDataResult = await models.poll_options.update(
      dataMenu, {
      where: {
        poll_option_id: poll_option_id
      }
    }
    );

    return res.status(200).json({
      status: 200,
      message: "success",
      // organization: organization ? organization : []
    });

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

    const _menu = await models.poll_options.update(dataInformation, {
      where: {
        poll_option_id: menu_id,
      },
    });

    return res.status(200).json({
      status: 200,
      message: 'success',
    });
  });

export default handler;
