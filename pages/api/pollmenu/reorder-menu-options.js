import nextConnect from 'next-connect';
import middleware from '../../../middleware/auth';

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

  })
  .put(async (req, res) => {
    const { body } = req;
    const { slug } = req.query;
    const {
      menu_id,
      menu_seq,
    } = body;
    //SampleText.replace("Developer", "App Builder");
    const dataMenu = {
      // menu_id: menu_id,
      poll_questions_seq: menu_seq,
    };

    if (
      menu_id == undefined ||
      menu_seq == undefined
    ) {
      return res.status(200).json({
        status: 201,
        message: 'data incorrect',
        menu_id: menu_id,
        dataMenu: dataMenu,
      });
    }


    const introDataResult = await models.poll_options.update(
      dataMenu, {
      where: {
        poll_option_id: menu_id
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

  });

export default handler;
