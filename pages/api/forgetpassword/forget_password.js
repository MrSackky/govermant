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
    const { email_user } = body;
    // const userId = slug;

    const dataUser = {
      email_user: email_user,
      status_reset: 0,
    };

    if (email_user == undefined) {
      return res.status(200).json({
        status: 201,
        message: 'data incorrect',
        dataUser: dataUser,
      });
    }

    const newForgetpassword = await models.forget_password.create(dataUser);

    if (newForgetpassword == null) {
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
