import nextConnect from 'next-connect';
const models = require('../../../../db/models/index');
import middleware from '../../../../middleware/auth';
import { addDays } from '../../../../middleware/utils';
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

const handler = nextConnect()
  // Middleware
  .use(middleware)
  // Get method
  .get(async (req, res)  => {
    const { body } = req;
    const { slug } = req.query;
    // const { email } = body;
    // const userId = slug;
    const dataUsers = await models.tender_type.findAndCountAll();
    if (dataUsers != null) {
      return res.status(200).json({
        status: 200,
        data: dataUsers.rows,
      });
    }
  })
  // Post method
  .post(async (req, res) => {});

export default handler;
