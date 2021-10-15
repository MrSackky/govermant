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
 
    const packages = await models.Packages.findAll({
      attributes: ['package_id','code_package','name_package','size_limit'] 
    });
    console.log("packages");
    console.log(packages);
    res.json({
      data: packages,
    });
  });

export default handler;
