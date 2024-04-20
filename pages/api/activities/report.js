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
    const { organization_id, results, page, search, sortField = "activities_id", sortOrder = "DESC", filters = [] } = req.query;
    let _search = {};


    _search = {
      is_deleted: {
        [Op.ne]: 1,
      },
      organization_id: organization_id

    }


    // console.log(_search)
    const _activities = await models.activities.findAndCountAll({
      attributes: [
        'activities_id', 'organization_id', 'activities_date', 'activities_title',
        'activities_detail', 'activities_image', 'activities_keyword', 'is_slide',
        'date_created', 'date_update', 'status_active', 'is_deleted', 'ip'
      ],
      where: _search
    });
    return res.status(200).json({
      info: {
        page: page,
        results: results
      },
      results: _activities.rows,
      totalCount: _activities.count
    });

  })
  .delete(async (req, res) => {

  })

export default handler;
