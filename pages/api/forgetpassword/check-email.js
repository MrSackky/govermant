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
    const { email } = body;
    // const userId = slug;
    const dataUsers = await models.Users.findOne({ where: { user_name: email } });
    if (dataUsers != null) {
      return res.status(200).json({
        status: 200,
        message: 'พบ email `'+ email +' ` ในระบบแล้ว',
      });
    }

    return res.status(200).json({
      status: 201,
      message: 'ไม่พบอีเมล `'+ email +' ` ในระบบ',
    });
    
    // const dataOrganization = await models.Organization.findOne({ where: { organization_email: email } });
    // if (dataOrganization == null) {
    //   return res.status(200).json({
    //     status: 202,
    //     message: 'ไม่มี email `'+ email +'` ในระบบ',
    //   });
    // }

    // const dataUsers = await models.Users.findOne({ where: { user_name: email } });
    // if (dataUsers == null) {
    //   return res.status(200).json({
    //     status: 203,
    //     message: 'ไม่มี email `'+ email +'` ในระบบ',
    //   });
    // }

    // return res.status(200).json({
    //   status: 200,
    //   message: 'สามารถใช้ email `'+ email +'` ได้',
    // });


  });

export default handler;
