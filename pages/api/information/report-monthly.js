import nextConnect from 'next-connect';
import middleware from '../../../middleware/auth';
import { getCurrentDate } from '../../../middleware/utils';
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
    const { organization_id, results, page, _date_created = getCurrentDate('-'), sortField = "infor_id", sortOrder = "DESC", filters = [] } = req.query;
    let _search = {};

    // console.log('date_created')
    // console.log(_date_created)
    // var result = new Date(date);

    const TODAY_START = new Date();
    TODAY_START.setDate(1);
    TODAY_START.setHours(0 + 7);
    const NOW = new Date();
    // console.log(NOW.getMonth)
    NOW.setHours(NOW.getHours() + 7);
    // console.log(TODAY_START)

    var _dateStr = '2021-10-26 00:00:00';
    // var _dateStr = '' + _date_created + ".000Z";
    _search = {
      is_deleted: {
        [Op.ne]: 1,
      },
      date_created: {
        [Op.gt]: TODAY_START,
        [Op.lt]: NOW
      },
      organization_id: organization_id

    }


    // console.log(_search)
    const _information = await models.information.findAndCountAll({
      attributes: [
        'infor_id', 'organization_id', 'infor_date', 'infor_title',
        'infor_detail', 'infor_image', 'infor_keyword', 'infor_view',
        'date_created', 'date_update', 'status_active', 'is_deleted', 'ip'
      ],
      where: _search
    });
    return res.status(200).json({
      info: {
        page: page,
        results: results
      },
      results: _information.rows,
      totalCount: _information.count
    });

  })
  .delete(async (req, res) => {

  })

export default handler;
