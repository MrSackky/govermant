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
    const { results, page, search, sortField = "organization_id", sortOrder = "DESC", filters = [] } = req.query;
    let _search = {};


    if (search != "") {
      if (filters == 'undefined' || filters == "null") {
        // console.log("if1")
        _search = {
          is_use: {
            [Op.ne]: 3,
          },
          [Op.or]: [
            {
              organization_name_eng: {
                [Op.like]: '%' + search + '%'
              }
            }, {
              organization_name: {
                [Op.like]: '%' + search + '%'
              },
            }
          ],


        }
      } else {
        console.log("if2")
        console.log(filters)
        _search = {
          is_use: {
            [Op.ne]: 3,
          },
          package: {
            [Op.in]: [filters],
          },
          [Op.or]: [
            {
              organization_name_eng: {
                [Op.like]: '%' + search + '%'
              }
            }, {
              organization_name: {
                [Op.like]: '%' + search + '%'
              },
            }
          ],


        }
      }


    } else {
      if (filters == 'undefined' || filters == 'null') {
        // console.log("if3")
        // console.log(filters)

        _search = {

          is_use: {
            [Op.ne]: 3,
          },

        }
      } else {
        // console.log("if4")
        // console.log(filters)
        _search = {

          is_use: {
            [Op.ne]: 3,
          },
          package: {
            [Op.in]: [filters],
          },

        }
      }

    }


    // console.log(_search)
    const _organization = await models.Organization.findAndCountAll({
      // attributes: ['package_id','code_package','name_package','size_limit']
      attributes: [
        'organization_id', 'organization_name', 'organization_name_eng', 'organization_logo',
        'organization_email', 'organization_address', 'organization_sub_district_id', 'organization_phone',
        'organization_fax', 'theme', 'thumbnail', 'thumbnail_link', 'thumbnail_url', 'show_index',
        'google_verify', 'social_fb', 'social_fb_pageid', 'rss', 'google_tag_manager1', 'google_tag_manager2',
        'date_created', 'date_expired', 'size_used', 'package', 'is_use', 'is_use_intro'
      ],
      where: _search,
      offset: results * (page - 1),
      limit: parseInt(results),
      include: [
        {
          model: models.Packages,
          as: 'packages',
        },
      ],
      order: [
        [sortField != "undefined" && sortOrder != "undefined" ? sortField : "organization_id", sortOrder != "undefined" ? sortOrder == "ascend" ? "ASC" : "DESC" : "DESC"]
      ]
    });
    return res.status(200).json({
      info: {
        page: page,
        results: results
      },
      results: _organization.rows,
      totalCount: _organization.count
    });
  })
  .put(async (req, res) => {
    const { body } = req;
    const { slug } = req.query;
    // const organization_id = slug;
    const {
      organization_id,
      organization_name,
      organization_name_eng,
      organization_logo,
      organization_address,
      organization_email,
      organization_email_alert,
      organization_phone,
      organization_fax,
      social_fb_pageid,
      rss,
      person01_name,
      person01_position,
      person01_image,
      person01_phone,
      person02_name,
      person02_position,
      person02_image,
      person02_phone,
      person03_name,
      person03_position,
      person03_image,
      person03_phone,
      organization_sub_district_id,
    } = body;

    const dataOrganization = {
      organization_name: organization_name,
      organization_name_eng: organization_name_eng,
      organization_logo: organization_logo,
      organization_address: organization_address,
      organization_email: organization_email,
      organization_email_alert: organization_email_alert,
      organization_phone: organization_phone,
      organization_fax: organization_fax,
      social_fb_pageid: social_fb_pageid,
      rss: rss,
      person01_name: person01_name,
      person01_position: person01_position,
      person01_image: person01_image,
      person01_phone: person01_phone,
      person02_name: person02_name,
      person02_position: person02_position,
      person02_image: person02_image,
      person02_phone: person02_phone,
      person03_name: person03_name,
      person03_position: person03_position,
      person03_image: person03_image,
      person03_phone: person03_phone,
      organization_sub_district_id: organization_sub_district_id,
      // thumbnail_url: thumbnail_url,
      // date_expired: date_expired,
      // package_id: package_id,
      // thumbnail_link: thumbnail_link,
      // is_use: is_use,
    };

    if (
      organization_id == undefined
    ) {
      return res.status(200).json({
        status: 201,
        message: 'data incorrect',
        organization_id: organization_id,
        dataOrganization: dataOrganization
      });
    }


    const organization = await models.Organization.update(
      dataOrganization, {
      where: {
        organization_id: organization_id
      }
    }
    );

    return res.status(200).json({
      status: 200,
      message: "success",
      organization: organization ? organization : []
    });

    // await User.update({ lastName: "Doe" }, {
    //   where: {
    //     lastName: null
    //   }
    // });

  })

export default handler;
