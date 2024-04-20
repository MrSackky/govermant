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
      header_id,
      seq,
    } = body;
    //SampleText.replace("Developer", "App Builder");
    const dataMenu = {
      // menu_id: menu_id,
      seq: seq,
    };

    if (
      header_id == undefined ||
      seq == undefined
    ) {
      return res.status(200).json({
        status: 201,
        message: 'data incorrect',
        header_id: header_id,
        dataMenu: dataMenu,
      });
    }


    const menuDataResult = await models.customer_header.update(
      dataMenu, {
      where: {
        header_id: header_id
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
