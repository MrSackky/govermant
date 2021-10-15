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
    const { organization_id, results, page, search, sortField = "intro_blessing_id", sortOrder = "DESC", filters = [] } = req.query;
    let _search = {};


    if (search != "") {
      if (filters == 'undefined' || filters == "null") {
        // console.log("if1")
        _search = {
          is_deleted: {
            [Op.ne]: 1,
          },
          [Op.or]: [{
            intro_id: {
              [Op.like]: '%' + search + '%'
            },
          }
          ],
          organization_id: organization_id

        }
      } else {
        console.log("if2")
        console.log(filters)
        _search = {
          is_deleted: {
            [Op.ne]: 1,
          },
          [Op.or]: [{
            intro_id: {
              [Op.like]: '%' + search + '%'
            },
          }
          ],
          organization_id: organization_id


        }
      }


    } else {
      if (filters == 'undefined' || filters == 'null') {
        // console.log("if3")
        // console.log(filters)

        _search = {

          is_deleted: {
            [Op.ne]: 1,
          },
          organization_id: organization_id

        }
      } else {
        // console.log("if4")
        // console.log(filters)
        _search = {

          is_deleted: {
            [Op.ne]: 1,
          },
          organization_id: organization_id

        }
      }

    }


    // console.log(_search)
    const _blessing = await models.intro_blessing.findAndCountAll({
      attributes: [
        'intro_blessing_id', 'organization_id', 'intro_id', 'text_blessing',
        'name_blessing', 'position_blessing', 'work_blessing', 'year',
        'ip', 'date_created', 'date_updated', 'is_deleted'
      ],
      where: _search,
      include: [
        {
          model: models.intro,
          as: 'intros'
        },
      ],
      offset: results * (page - 1),
      limit: parseInt(results),
      order: [
        [sortField != "undefined" && sortOrder != "undefined" ? sortField : "intro_blessing_id", sortOrder != "undefined" ? sortOrder == "ascend" ? "ASC" : "DESC" : "DESC"]
      ]
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
    const { body } = req;
    const { slug } = req.query;
    const intro_blessing_id = slug;
    if (intro_blessing_id == undefined) {
      return res.status(200).json({
        status: 201,
        message: 'data incorrect',
        intro_blessing_id: intro_blessing_id,
      });
    }

    const intro_blessing = await models.intro_blessing.update(dataBlessing, {
      where: {
        intro_blessing_id: intro_blessing_id,
      },
    });

    return res.status(200).json({
      status: 200,
      message: 'success',
      intro_blessing: intro_blessing ? intro_blessing : [],
    })
  })

export default handler;
