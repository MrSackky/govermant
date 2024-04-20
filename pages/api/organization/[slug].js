import nextConnect from 'next-connect';
const models = require('../../../db/models/index');

const handler = nextConnect()
  .get(async (req, res) => {
    const {
      query: { id, name },
    } = req;
    const { slug } = req.query;
    const organization_id = slug;
    console.log(organization_id)

    const organization = await models.Organization.findOne({
      attributes: [
        'organization_id', 'organization_name', 'organization_name_eng', 'organization_logo',
        'organization_email', 'organization_address', 'organization_sub_district_id', 'organization_phone',
        'organization_fax', 'theme', 'thumbnail', 'thumbnail_link', 'thumbnail_url', 'show_index',
        'google_verify', 'social_fb', 'social_fb_pageid', 'rss', 'google_tag_manager1', 'google_tag_manager2',
        'date_created', 'date_expired', 'size_used', 'is_use', 'organization_email_alert', 'package',
        'person01_name', 'person01_position', 'person01_image', 'person01_phone',
        'person02_name', 'person02_position', 'person02_image', 'person02_phone',
        'person03_name', 'person03_position', 'person03_image', 'person03_phone',
        'is_use_intro', 'is_poll_confirm'
      ],
      where: {
        organization_id: organization_id,
      },
      include: [

        {
          model: models.Packages,
          as: 'packages',
        },
        {
          model: models.Sub_district,
          as: 'sub_districts',
          attributes: ['sub_district_id', 'sub_district_name', 'province_id'],
          include: [
            {
              model: models.District,
              as: 'districts',
              attributes: ['district_id', 'district_name'],

            },
            {
              model: models.Province,
              as: 'provinces',
              attributes: ['province_id', 'province_name', 'province_abbrev'],

            },
          ]
        },

        {
          model: models.Users,
          as: 'users',
          where: {
            type_user: 2,
          },
        },
      ],
      // include: models.Packages
      // include: [{
      //   association: models.Packages,
      //   include: [ models.Organization.package_data ]
      // }]
    });
    // const user = await models.users.findOne({
    //   where: {
    //     id: userId,
    //   },
    //   include: [
    //     {
    //       model: models.posts,
    //       as: 'posts',
    //     },
    //     {
    //       model: models.jobs,
    //       as: 'jobs',
    //     },
    //   ],
    // });
    return res.status(200).json({
      status: 200,
      message: "success",
      organization: organization ? organization : []
    });
  })
  .post(async (req, res) => { })
  .put(async (req, res) => {
    const { body } = req;
    const { slug } = req.query;
    const organization_id = slug;
    const {
      organization_name,
      organization_name_eng = "",
      organization_phone,
      thumbnail_url,
      organization_email,
      date_expired,
      package_id,
      organization_sub_district_id = 0,
      organization_fax = "",
      thumbnail_link,
      is_use,
      organization_address = ""
    } = body;

    const dataOrganization = {
      organization_name: organization_name,
      organization_name_eng: organization_name_eng,
      organization_phone: organization_phone,
      thumbnail_url: thumbnail_url,
      organization_email: organization_email,
      date_expired: date_expired,
      package: package_id,
      organization_sub_district_id: organization_sub_district_id,
      organization_fax: organization_fax,
      thumbnail_link: thumbnail_link,
      is_use: is_use,
      organization_address: organization_address
    };

    if (
      organization_id == undefined ||
      organization_name == undefined || organization_name_eng == undefined ||
      organization_phone == undefined || thumbnail_url == undefined ||
      organization_email == undefined || date_expired == undefined ||
      package_id == undefined || organization_sub_district_id == undefined ||
      organization_fax == undefined || thumbnail_link == undefined ||
      is_use == undefined || organization_address == undefined
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
  .delete(async (req, res) => {
    const { body } = req;
    const { slug } = req.query;
    const organization_id = slug;
    if (organization_id == undefined) {
      return res.status(200).json({
        status: 201,
        message: 'data incorrect',
        organization_id: organization_id
      });
    }

    const dataOrganization = {
      is_use: 3,

    };
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

  })
  .patch(async (req, res) => {

  });

export default handler;
