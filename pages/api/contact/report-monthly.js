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
    const { organization_id, results, page, _date_created = getCurrentDate('-'), sortField = "contact_id", sortOrder = "DESC", filters = [] } = req.query;
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
      is_done: {
        [Op.ne]: 1,
      },
      date_created: {
        [Op.gt]: TODAY_START,
        [Op.lt]: NOW
      },
      organization_id: organization_id

    }


    // console.log(_search)
    const _blessing = await models.contact.findAndCountAll({
      attributes: [
        'contact_id', 'organization_id', 'contact_post', 'contact_detail', 'contact_name_posted',
        'contact_telephone', 'contact_email', 'date_created', 'date_updated',
        'ip', 'personid', 'is_done',
      ],
      where: _search
    });
    return res.status(200).json({
      info: {
        page: page,
        results: results
      },
      results: _blessing.rows,
      totalCount: _blessing.count
    });

  })
  .delete(async (req, res) => {

  })

export default handler;
