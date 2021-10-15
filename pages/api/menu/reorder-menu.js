import nextConnect from 'next-connect';

const models = require('../../../db/models/index');
import middleware from '../../../middleware/auth';
import moment from 'moment';
import { absoluteUrl, checkIsLogin, getIPAddress, convertDatetoAddDB } from '../../../middleware/utils';
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
    const dataMenu  = {
      // menu_id: menu_id,
      menu_seq: menu_seq,
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


    const introDataResult = await models.Menu.update(
      dataMenu, {
      where: {
        menu_id: menu_id
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
