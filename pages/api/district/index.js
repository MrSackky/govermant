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

    const _d = await models.District.findAndCountAll({
      include: [
        // {
        //   model: models.posts,
        //   as: 'posts',
        // },
        // {
        //   model: models.jobs,
        //   as: 'jobs',
        // },
      ],
      order: [
        // Will escape title and validate DESC against a list of valid direction parameters
        ['district_name', 'ASC'],
      ]
    });

    res.statusCode = 200;
    res.json({
      status: 'success',
      data: _province.rows,
    });
  })
  // Post method
  .post(async (req, res) => {
    res.end('method - post');
  })
  // Put method
  .put(async (req, res) => {
    res.end('method - put');
  })
  // Patch method
  .patch(async (req, res) => {
    throw new Error('Throws me around! Error can be caught and handled.');
  });

export default handler;
