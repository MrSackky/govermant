import nextConnect from 'next-connect';
const models = require('../../../db/models/index');
import middleware from '../../../middleware/auth';

const handler = nextConnect()
  // Middleware
  .use(middleware)
  // Get method
  .get(async (req, res) => {
    const {
      query: { nextPage },
      method,
      body,
    } = req;
 
    const type_user = await models.Type_user.findAll({
      attributes: ['type_user_id','name_type_user'] 
    });
    // console.log("type_user");
    // console.log(type_user);
    res.json({
      data: type_user,
    });
  });

export default handler;
