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
    const {
      method,
      body,
    } = req;
    const { organization_id } = req.query;
    // console.log(_search)
    const _theme = await models.theme.findAndCountAll({
      attributes: [
        'organization_id',
        'theme_code',
        'theme_title',
        'theme_cover',
        'theme_detail',
        'theme_path',
        'is_used',
        'is_custom',
        'theme_id',
      ],
      where: {
        is_used: 1,
        [Op.or]: [{
          organization_id: organization_id,
        },
        {
          is_custom: 0,
        }],
      },
    });
    return res.status(200).json({
      results: _theme.rows,
      totalCount: _theme.count
    });

  })

export default handler;
