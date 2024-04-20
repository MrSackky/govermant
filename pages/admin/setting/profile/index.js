import { InboxOutlined } from '@ant-design/icons';
import {
  Button, Form, Image, Input, notification, Select, Typography, Upload
} from 'antd';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
// import UserNav from '../components/navigation/User';
import React, { useEffect, useState } from 'react';
/* components */
import Layout from '../../../../components/layout/LayoutAdmin';
/* utils */
import {
  absoluteUrl, apiInstance
} from '../../../../middleware/utils';

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });
const { Text, Title } = Typography;
const { Option } = Select;

const { TextArea } = Input;
const config = require('../../config');

export default function Home(props) {
  const [api, contextHolder] = notification.useNotification();
  const { user, origin } = props;
  const router = useRouter();
  const { profileId } = router.query;
  const [provinces, setProvinces] = useState(null)
  const [districts, setDistricts] = useState(null)
  const [subDistricts, setSubDistricts] = useState(null)
  const [previewImageLogo, setPreviewImageLogo] = useState(null)
  const [previewImagePerson1, setPreviewImagePerson1] = useState(null)
  const [previewImagePerson2, setPreviewImagePerson2] = useState(null)
  const [previewImagePerson3, setPreviewImagePerson3] = useState(null)
  const [imageLandingPageLogo, setImageLandingPageLogo] = useState(null)
  const [imageLandingPagePerson1, setImageLandingPagePerson1] = useState(null)
  const [imageLandingPagePerson2, setImageLandingPagePerson2] = useState(null)
  const [imageLandingPagePerson3, setImageLandingPagePerson3] = useState(null)
  const [previewVisibleLogo, setPreviewVisibleLogo] = useState(false)
  const [previewVisiblePerson1, setPreviewVisiblePerson1] = useState(false)
  const [previewVisiblePerson2, setPreviewVisiblePerson2] = useState(false)
  const [previewVisiblePerson3, setPreviewVisiblePerson3] = useState(false)
  const [fields, setFields] = useState([
  ]);
  const [organizationData, setOrganizationData] = useState(null)

  useEffect(() => {
    fetchOrganizationData();
    fetchProvincesData();
  }, []);

  async function onSubmitHandler(value) {
    const data = {
      organization_id: user.organization_id,
      organization_name: value.organization_name,
      organization_name_eng: value.organization_name_eng,
      organization_logo: imageLandingPageLogo,
      organization_address: value.organization_address,
      organization_sub_district_id: value.subDistrictSelected,
      organization_email: value.organization_email,
      organization_email_alert: value.organization_email_alert,
      organization_phone: value.organization_phone,
      organization_fax: value.organization_fax,
      social_fb_pageid: value.social_fb_pageid,
      rss: value.rss,
      person01_name: value.person01_name,
      person01_position: value.person01_position,
      person01_image: imageLandingPagePerson1,
      person01_phone: value.person01_phone,
      person02_name: value.person02_name,
      person02_position: value.person02_position,
      person02_image: imageLandingPagePerson2,
      person02_phone: value.person02_phone,
      person03_name: value.person03_name,
      person03_position: value.person03_position,
      person03_image: imageLandingPagePerson3,
      person03_phone: value.person03_phone,
    };
    console.log(data)
    const organizationData = await apiInstance().put('/profile', data);
    if (organizationData.data.status == 200) {
      openNotificationRegisterSuccess();
      // fetchOrganizationData();

      setTimeout(function () { //Start the timer
        router.push('/admin/setting/profile')
      }.bind(this), 2000)
    } else {
      openNotificationRegisterFail(organizationData.data.message);
    }
  }


  const openNotificationRegisterSuccess = () => {
    api.success({
      message: `บันทึกข้อมูลสำเร็จ`,
      description: 'บันทึกข้อมูลสำเร็จแล้ว',
      placement: 'topRight',
    });
  };

  const openNotificationRegisterFail = messgae => {
    api.error({
      message: `พบปัญหาระหว่างการบันทึกข้อมูล`,
      description: messgae,
      placement: 'topRight',
    });
  };

  const { Dragger } = Upload;

  const [form] = Form.useForm();

  const onReset = () => {
    resetImagePreview()
    form.resetFields();
  };

  const fetchOrganizationData = async () => {

    const _organizationData = await apiInstance().get(
      'organization/' + (user ? user.organization_id : 0)
    );

    // console.log(_organizationData.data.organization)
    setOrganizationData(_organizationData.data.organization)
    fetchDistrictsData(_organizationData.data.organization.sub_districts ? _organizationData.data.organization.sub_districts.provinces.province_id : 0)
    fetchSubDistrictData(_organizationData.data.organization.sub_districts ? _organizationData.data.organization.sub_districts.districts.district_id : 0)
    if (_organizationData.data.organization.organization_logo) {
      setPreviewImageLogo(
        '..\\..\\..\\uploads\\c-' +
        user.organization_id +
        '\\organization\\' +
        _organizationData.data.organization.organization_logo,
      )
      setPreviewVisibleLogo(true)
    }
    if (_organizationData.data.organization.person01_image) {
      setPreviewImagePerson1('..\\..\\..\\uploads\\c-' +
        user.organization_id +
        '\\organization\\' +
        _organizationData.data.organization.person01_image)
      setPreviewVisiblePerson1(true);
    }

    if (_organizationData.data.organization.person02_image) {
      setPreviewImagePerson2('..\\..\\..\\uploads\\c-' +
        user.organization_id +
        '\\organization\\' +
        _organizationData.data.organization.person02_image)
      setPreviewVisiblePerson2(true);
    }

    if (_organizationData.data.organization.person03_image) {
      setPreviewImagePerson3('..\\..\\..\\uploads\\c-' +
        user.organization_id +
        '\\organization\\' +
        _organizationData.data.organization.person03_image)
      setPreviewVisiblePerson3(true);
    }
    setFields([
      {
        name: ['organization_name'],
        value: _organizationData.data.organization.organization_name,
      },
      {
        name: ['organization_name_eng'],
        value: _organizationData.data.organization.organization_name_eng,
      },
      {
        name: ['organization_phone'],
        value: _organizationData.data.organization.organization_phone,
      },
      {
        name: ['organization_email'],
        value: _organizationData.data.organization.organization_email,
      },
      {
        name: ['provincesSelected'],
        value: _organizationData.data.organization.sub_districts ? _organizationData.data.organization.sub_districts.provinces.province_id : "0"
      },
      {
        name: ['districtSelected'],
        value: _organizationData.data.organization.sub_districts ? _organizationData.data.organization.sub_districts.districts.district_id : "0"
      },
      {
        name: ['subDistrictSelected'],
        value: _organizationData.data.organization.sub_districts ? _organizationData.data.organization.sub_districts.sub_district_id : "0"
      },
      {
        name: ['organization_fax'],
        value: _organizationData.data.organization.organization_fax
      },
      {
        name: ['thumbnail_link'],
        value: _organizationData.data.organization.thumbnail_link
      },
      {
        name: ['organization_address'],
        value: _organizationData.data.organization.organization_address ? _organizationData.data.organization.organization_address : ""
      },
      {
        name: ['organization_email_alert'],
        value: _organizationData.data.organization.organization_email_alert ? _organizationData.data.organization.organization_email_alert : ""
      },
      {
        name: ['social_fb_pageid'],
        value: _organizationData.data.organization.social_fb_pageid ? _organizationData.data.organization.social_fb_pageid : ""
      },
      {
        name: ['rss'],
        value: _organizationData.data.organization.rss ? _organizationData.data.organization.rss : ""
      },
      {
        name: ['rss'],
        value: _organizationData.data.organization.rss ? _organizationData.data.organization.rss : ""
      },
      {
        name: ['person01_name'],
        value: _organizationData.data.organization.person01_name ? _organizationData.data.organization.person01_name : ""
      },
      {
        name: ['person01_position'],
        value: _organizationData.data.organization.person01_position ? _organizationData.data.organization.person01_position : ""
      },
      {
        name: ['person01_phone'],
        value: _organizationData.data.organization.person01_phone ? _organizationData.data.organization.person01_phone : ""
      },
      {
        name: ['person02_name'],
        value: _organizationData.data.organization.person02_name ? _organizationData.data.organization.person02_name : ""
      },
      {
        name: ['person02_position'],
        value: _organizationData.data.organization.person02_position ? _organizationData.data.organization.person02_position : ""
      },
      {
        name: ['person02_phone'],
        value: _organizationData.data.organization.person02_phone ? _organizationData.data.organization.person02_phone : ""
      },
      {
        name: ['person03_name'],
        value: _organizationData.data.organization.person03_name ? _organizationData.data.organization.person03_name : ""
      },
      {
        name: ['person03_position'],
        value: _organizationData.data.organization.person03_position ? _organizationData.data.organization.person03_position : ""
      },
      {
        name: ['person03_phone'],
        value: _organizationData.data.organization.person03_phone ? _organizationData.data.organization.person03_phone : ""
      },


    ])
  };

  const fetchProvincesData = async () => {
    const _provincesData = await apiInstance().get(
      'province'
    );

    setProvinces(_provincesData.data.data)
    // console.log(_provincesData.data.data)
  }

  const fetchDistrictsData = async (province_id) => {
    const _districtsData = await apiInstance().get(
      'district/' + province_id
    );

    setDistricts(_districtsData.data.data)
    // console.log(_districtsData.data.data)
  }


  const fetchSubDistrictData = async (subDistrictID) => {
    const _subDistrictsData = await apiInstance().get(
      'sub-district/' + subDistrictID
    );

    setSubDistricts(_subDistrictsData.data.data)
    // console.log(_subDistrictsData.data.data)
  }

  const handleProvincesChange = async (value) => {
    // console.log(value);
    setFields([
      {
        name: ['provincesSelected'],
        value: value
      },
      {
        name: ['districtSelected'],
        value: "0"
      },
      {
        name: ['subDistrictSelected'],
        value: "0"
      },

    ])
    fetchDistrictsData(value);
    setSubDistricts([])
  }

  const handleDistrictChange = async (value) => {
    setFields([

      {
        name: ['districtSelected'],
        value: value
      },
      {
        name: ['subDistrictSelected'],
        value: "0"
      },

    ])
    fetchSubDistrictData(value)
  }

  const imageUploadpropsLogo = {
    name: 'file',
    multiple: false,
    listType: 'text',
    maxCount: 1,
    action: "/api/upload/organization",
    preview: false,
    customRequest: (options) => {
      const data = new FormData()
      data.append('file', options.file)
      data.append('id', user.type_user == 1 ? "admin" : user.organization_id)
      const config = {
        "headers": {
          "content-type": 'multipart/form-data; boundary=----WebKitFormBoundaryqTqJIxvkWFYqvP5s'
        }
      }
      axios.post(options.action, data, config).then((res) => {
        setImageLandingPageLogo(res.data.data.list[0]._name)
        options.onSuccess(res.data, options.file)
      }).catch((err) => {
        console.log(err)
      })

    },
    async onChange(info) {
      const { status } = info.file
      switch (info.file.status) {
        case "done":
          if (!info.file.url && !info.file.preview) {
            info.file.preview = await getBase64(info.file.originFileObj);
          }
          setPreviewImageLogo(info.file.url || info.file.preview)
          setPreviewVisibleLogo(true)
          break;

        default:
        // error or removed
        // resetImagePreview()
      }

    },
    onRemove(info) {
      console.log("onRemove")
      console.log(info)
      resetImagePreview()

    }
  }

  const imageUploadpropsPerson1 = {
    name: 'file',
    multiple: false,
    listType: 'text',
    maxCount: 1,
    action: "/api/upload/organization",
    preview: false,
    customRequest: (options) => {
      const data = new FormData()
      data.append('file', options.file)
      data.append('id', user.type_user == 1 ? "admin" : user.organization_id)
      const config = {
        "headers": {
          "content-type": 'multipart/form-data; boundary=----WebKitFormBoundaryqTqJIxvkWFYqvP5s'
        }
      }
      axios.post(options.action, data, config).then((res) => {
        setImageLandingPagePerson1(res.data.data.list[0]._name)
        options.onSuccess(res.data, options.file)
      }).catch((err) => {
        console.log(err)
      })

    },
    async onChange(info) {
      const { status } = info.file
      switch (info.file.status) {
        case "done":
          if (!info.file.url && !info.file.preview) {
            info.file.preview = await getBase64(info.file.originFileObj);
          }
          setPreviewImagePerson1(info.file.url || info.file.preview)
          setPreviewVisiblePerson1(true);
          break;

        default:
        // resetImagePreview()
      }

    },
    onRemove(info) {
      console.log("onRemove")
      console.log(info)
      resetImagePreview()

    }
  }

  const imageUploadpropsPerson2 = {
    name: 'file',
    multiple: false,
    listType: 'text',
    maxCount: 1,
    action: "/api/upload/organization",
    preview: false,
    customRequest: (options) => {
      const data = new FormData()
      data.append('file', options.file)
      data.append('id', user.type_user == 1 ? "admin" : user.organization_id)
      const config = {
        "headers": {
          "content-type": 'multipart/form-data; boundary=----WebKitFormBoundaryqTqJIxvkWFYqvP5s'
        }
      }
      axios.post(options.action, data, config).then((res) => {
        setImageLandingPagePerson2(res.data.data.list[0]._name)
        options.onSuccess(res.data, options.file)
      }).catch((err) => {
        console.log(err)
      })

    },
    async onChange(info) {
      const { status } = info.file
      switch (info.file.status) {
        case "done":
          if (!info.file.url && !info.file.preview) {
            info.file.preview = await getBase64(info.file.originFileObj);
          }
          setPreviewImagePerson2(info.file.url || info.file.preview)
          setPreviewVisiblePerson2(true)
          break;

        default:
        // resetImagePreview()
      }

    },
    onRemove(info) {
      console.log("onRemove")
      console.log(info)
      resetImagePreview()

    }
  }

  const imageUploadpropsPerson3 = {
    name: 'file',
    multiple: false,
    listType: 'text',
    maxCount: 1,
    action: "/api/upload/organization",
    preview: false,
    customRequest: (options) => {
      const data = new FormData()
      data.append('file', options.file)
      data.append('id', user.type_user == 1 ? "admin" : user.organization_id)
      const config = {
        "headers": {
          "content-type": 'multipart/form-data; boundary=----WebKitFormBoundaryqTqJIxvkWFYqvP5s'
        }
      }
      axios.post(options.action, data, config).then((res) => {
        setImageLandingPagePerson3(res.data.data.list[0]._name)
        options.onSuccess(res.data, options.file)
      }).catch((err) => {
        console.log(err)
      })

    },
    async onChange(info) {
      const { status } = info.file
      switch (info.file.status) {
        case "done":
          if (!info.file.url && !info.file.preview) {
            info.file.preview = await getBase64(info.file.originFileObj);
          }
          setPreviewImagePerson3(info.file.url || info.file.preview)
          setPreviewVisiblePerson3(true)
          break;

        default:
        // resetImagePreview()
      }

    },
    onRemove(info) {
      console.log("onRemove")
      console.log(info)
      resetImagePreview()

    }
  }

  const resetImagePreview = () => {
    setPreviewVisibleLogo(false);
    setPreviewVisiblePerson1(false);
    setPreviewVisiblePerson2(false);
    setPreviewVisiblePerson3(false);
    setPreviewImageLogo(null);
    setPreviewImagePerson1(null);
    setPreviewImagePerson2(null);
    setPreviewImagePerson3(null);
  };

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  return (
    <Layout
      title="Government - Admin management"
      url={origin}
      origin={origin}
      // user={login}
      indexSubMenu={"6"}
      indexMenu={"sub-6-0"}
      titlePage="ข้อมูลองค์กร"
      _routes={[
        {
          path: '/admin/dashborad',
          breadcrumbName: 'หน้าหลัก',
        },
        {
          path: '/admin/setting/profile',
          breadcrumbName: 'ข้อมูลองค์กร',
        },
      ]}
    >
      {contextHolder}
      <link
        rel="stylesheet"
        href="https://unpkg.com/react-quill@1.3.3/dist/quill.snow.css"
      ></link>
      <div className="w-5/6 lg:w-full mx-auto">
        <Form
          name="basic"
          layout="vertical"
          onFinish={onSubmitHandler}
          requiredMark={true}
          form={form}
          fields={fields}
        >
          <div className="lg:inline-flex w-full">
            <div className="inline-flex lg:w-1/6  pr-2">
              <Form.Item
                name="organization_logo"
                className="block text-gray-700 text-sm font-bold mb-2 w-auto h-auto text-center w-full"
              // rules={[
              //   {
              //     required: true,
              //     message: 'กรุณากรอกเลือกภาพ Logo องค์กร',
              //   },
              // ]}
              >
                {/* <Dragger {...dropimg}> */}
                <Dragger
                  maxCount={1}
                  // listType="picture"
                  accept=".jpg, .jpeg, .png"
                  {...imageUploadpropsLogo}
                  className=""
                >

                  {previewVisibleLogo && <><Image
                    // width={200}
                    preview={false}
                    src={previewImageLogo}
                    style={{
                      height: '116px',
                      width: 'auto',
                      objectFit: 'cover'
                    }}
                  />
                    <p className="text-sm">
                      คลิก หรือ ลากไฟล์มาที่บริเวณนี้เพื่ออัปโหลด Logo องค์กร
                    </p>
                  </>
                  }
                  {!previewVisibleLogo && <>
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">
                      คลิก หรือ ลากไฟล์มาที่บริเวณนี้เพื่ออัปโหลด Logo องค์กร
                    </p>
                  </>
                  }
                </Dragger>
              </Form.Item>
            </div>
            <div className="lg:w-5/6 ">
              <Form.Item
                name="organization_name"
                label="ชื่อหน่วยงาน"
                className="block text-gray-700 text-sm font-bold mb-2 w-full"
                rules={[
                  {
                    required: true,
                    message: 'กรุณากรอกชื่อหน่วยงาน',
                  },
                ]}
              >
                <TextArea
                  id="#"
                  type="text"
                  placeholder="ชื่อหน่วยงาน"
                  className="resize-none border rounded-md"
                  autoSize={{ minRows: 1, maxRows: 3 }}
                />
              </Form.Item>
              <Form.Item
                name="organization_name_eng"
                label="ชื่อหน่วยงาน ภาษาอังกฤษ"
                className="block text-gray-700 text-sm font-bold mb-2 w-full"
              // rules={[
              //   {
              //     required: true,
              //     message: 'กรุณากรอกชื่อหน่วยงานภาษาอังกฤษ',
              //   },
              // ]}
              >
                <TextArea
                  id="#"
                  type="text"
                  placeholder="ชื่อหน่วยงาน ภาษาอังกฤษ"
                  className="resize-none border rounded-md"
                  autoSize={{ minRows: 1, maxRows: 3 }}
                />
              </Form.Item>
            </div>
          </div>
          <Form.Item
            name="organization_address"
            label="ที่อยู่หน่วยงาน"
            className="block text-gray-700 text-sm font-bold mb-2 w-full"
            rules={[
              {
                required: true,
                message: 'กรุณากรอกที่อยู่หน่วยงาน',
              },
            ]}
          >
            <TextArea
              id="#"
              type="text"
              placeholder="ที่อยู่หน่วยงาน"
              className="resize-none border rounded-md"
              autoSize={{ minRows: 3, maxRows: 3 }}
            />
          </Form.Item>
          <div className="lg:inline-flex lg:w-full">
            <div className="w-full lg:w-1/3 mr-4">
              <Form.Item
                name="provincesSelected"
                label="จังหวัด"
                className="block text-gray-700 text-sm w-full font-bold mb-2 "
                style={{ textAlign: "left !important" }}
                rules={[
                  {
                    required: true,
                    message: 'กรุณากรอกจังหวัด',
                  },
                ]}
              >

                <Select
                  // defaultValue={()=>provincesSelected}
                  // style={{ width: 120 }}
                  onChange={handleProvincesChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  filterOption={true}
                >
                  <Option value="0">เลือก</Option>
                  {provinces ? provinces.map((object) => {
                    return <Option value={object.province_id}>{object.province_name}  </Option>
                  }) : ""}
                </Select>
              </Form.Item>
            </div>
            <div className="w-full lg:w-1/3 lg:mx-4">
              <Form.Item
                name="districtSelected"
                label="อำเภอ"
                className="block text-gray-700 text-sm font-bold mb-2 w-full "
                style={{ textAlign: "left !important" }}
                rules={[
                  {
                    required: true,
                    message: 'กรุณากรอกอำเภอ',
                  },
                ]}
              >

                <Select
                  // defaultValue={()=>provincesSelected}
                  // style={{ width: 120 }}
                  // onChange={handleChange}
                  onChange={handleDistrictChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  filterOption={true}
                >
                  <Option value="0">เลือก</Option>
                  {districts ? districts.map((object) => {
                    return <Option value={object.district_id}>{object.district_name}  </Option>
                  }) : ""}
                </Select>
              </Form.Item>
            </div>
            <div className="w-full lg:w-1/3 lg:ml-4">
              <Form.Item
                name="subDistrictSelected"
                label="ตำบล"
                className="block text-gray-700 text-sm font-bold mb-2 w-full "
                style={{ textAlign: "left !important" }}
                rules={[
                  {
                    required: true,
                    message: 'กรุณากรอกตำบล',
                  },
                ]}
              >

                <Select
                  // defaultValue={()=>provincesSelected}
                  // style={{ width: 120 }}
                  // onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  filterOption={true}
                >
                  <Option value="0">เลือก</Option>
                  {subDistricts ? subDistricts.map((object) => {
                    return <Option value={object.sub_district_id}>{object.sub_district_name}  </Option>
                  }) : ""}
                </Select>
              </Form.Item>
            </div>
          </div>
          <div className="lg:inline-flex w-full">
            <div className="lg:inline-flex lg:w-1/2 lg:mr-4">
              <Form.Item
                name="organization_phone"
                label="เบอร์โทร"
                className="block text-gray-700 text-sm font-bold mb-2 w-full"
                rules={[
                  {
                    required: true,
                    message: 'กรุณากรอกเบอร์โทร',
                  },
                ]}
              >
                <TextArea
                  id="#"
                  type="text"
                  placeholder="เบอร์โทร"
                  className="resize-none border rounded-md"
                  autoSize={{ minRows: 1, maxRows: 3 }}
                />
              </Form.Item>
            </div>
            <div className="lg:inline-flex lg:w-1/2 lg:ml-4">
              <Form.Item
                name="organization_fax"
                label="เบอร์ fax"
                className="block text-gray-700 text-sm font-bold mb-2 w-full"
              // rules={[
              //   {
              //     required: true,
              //     message: 'กรุณากรอกเบอร์ fax',
              //   },
              // ]}
              >
                <TextArea
                  id="#"
                  type="text"
                  placeholder="เบอร์ fax"
                  className="resize-none border rounded-md"
                  autoSize={{ minRows: 1, maxRows: 3 }}
                />
              </Form.Item>
            </div>
          </div>
          <div className="lg:inline-flex w-full">
            <div className="lg:inline-flex lg:w-1/2 lg:mr-4">
              <Form.Item
                name="organization_email"
                label="อีเมลล์"
                className="block text-gray-700 text-sm font-bold mb-2 w-full"
                rules={[
                  {
                    required: true,
                    message: 'กรุณากรอกอีเมลล์',
                  },
                ]}
              >
                <TextArea
                  id="#"
                  type="text"
                  placeholder="อีเมลล์"
                  className="resize-none border rounded-md"
                  autoSize={{ minRows: 1, maxRows: 3 }}
                />
              </Form.Item>
            </div>
            <div className="lg:inline-flex lg:w-1/2 lg:ml-4">
              <Form.Item
                name="organization_email_alert"
                label="อีเมลล์สำหรับแจ้งเตือน"
                className="block text-gray-700 text-sm font-bold mb-2 w-full"
              // rules={[
              //   {
              //     required: true,
              //     message: 'กรุณากรอกอีเมลล์สำหรับแจ้งเตือน',
              //   },
              // ]}
              >
                <TextArea
                  id="#"
                  type="text"
                  placeholder="อีเมลล์สำหรับแจ้งเตือน"
                  className="resize-none border rounded-md"
                  autoSize={{ minRows: 1, maxRows: 3 }}
                />
              </Form.Item>
            </div>
          </div>
          <div className="lg:inline-flex w-full">
            <div className="lg:inline-flex lg:w-1/2 lg:mr-4">
              <Form.Item
                name="social_fb_pageid"
                label="facebook page id"
                className="block text-gray-700 text-sm font-bold mb-2 w-full"
              // rules={[
              //   {
              //     required: true,
              //     message: 'กรุณากรอก facebook page id',
              //   },
              // ]}
              >
                <TextArea
                  id="#"
                  type="text"
                  placeholder="facebook page id"
                  className="resize-none border rounded-md"
                  autoSize={{ minRows: 1, maxRows: 3 }}
                />
              </Form.Item>
            </div>
            <div className="lg:inline-flex lg:w-1/2 lg:ml-4">
              <Form.Item
                name="rss"
                label="รหัสหน่วยงานภาครัฐสำหรับเชือมต่อระบบ E-GP"
                className="block text-gray-700 text-sm font-bold mb-2 w-full"
              // rules={[
              //   {
              //     required: true,
              //     message: 'กรุณากรอกรหัสหน่วยงานภาครัฐสำหรับเชือมต่อระบบ E-GP',
              //   },
              // ]}
              >
                <TextArea
                  id="#"
                  type="text"
                  placeholder="รหัสหน่วยงานภาครัฐสำหรับเชือมต่อระบบ E-GP"
                  className="resize-none border rounded-md"
                  autoSize={{ minRows: 1, maxRows: 3 }}
                />
              </Form.Item>
            </div>
          </div>
          <hr
            style={{
              backgroundColor: '#C4C4C4',
              height: 2,
              width: '100%',
            }}
            className="my-6"
          />
          <div className="lg:inline-flex w-full">
            <div className="inline-flex lg:w-1/6 pr-2">
              <Form.Item
                name="person01_image"
                className="block text-gray-700 text-sm font-bold mb-2 w-auto h-auto text-center w-full"
              // rules={[
              //   {
              //     required: true,
              //     message: 'กรุณากรอกเลือกภาพผู้บริหารที่ 1',
              //   },
              // ]}
              >
                {/* <Dragger {...dropimg}> */}
                <Dragger
                  maxCount={1}
                  // listType="picture"
                  accept=".jpg, .jpeg, .png"
                  {...imageUploadpropsPerson1}
                >

                  {previewVisiblePerson1 && <><Image
                    preview={false}
                    src={previewImagePerson1}
                    style={{
                      height: '156px',
                      width: 'auto',
                      objectFit: 'cover'
                    }}
                  />
                    <p className="text-sm">
                      คลิก หรือ ลากไฟล์มาที่บริเวณนี้เพื่ออัปโหลด ภาพผู้บริหารที่ 1
                    </p>
                  </>
                  }
                  {!previewVisiblePerson1 && <>
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">
                      คลิก หรือ ลากไฟล์มาที่บริเวณนี้เพื่ออัปโหลด ภาพผู้บริหารที่ 1
                    </p>
                  </>
                  }
                </Dragger>
              </Form.Item>
            </div>
            <div className="lg:w-5/6 ">
              <Form.Item
                name="person01_name"
                label="ชื่อผู้บริหารคนที่ 1"
                className="block text-gray-700 text-sm font-bold mb-2 w-full"
              // rules={[
              //   {
              //     required: true,
              //     message: 'กรุณากรอกชื่อผู้บริหารคนที่ 1',
              //   },
              // ]}
              >
                <TextArea
                  id="#"
                  type="text"
                  placeholder="ชื่อผู้บริหารคนที่ 1"
                  className="resize-none border rounded-md"
                  autoSize={{ minRows: 1, maxRows: 3 }}
                />
              </Form.Item>
              <Form.Item
                name="person01_position"
                label="ตำแหน่งผู้บริหารคนที่ 1"
                className="block text-gray-700 text-sm font-bold mb-2 w-full"
              // rules={[
              //   {
              //     required: true,
              //     message: 'กรุณากรอกชื่อตำแหน่งผู้บริหารคนที่ 1',
              //   },
              // ]}
              >
                <TextArea
                  id="#"
                  type="text"
                  placeholder="ตำแหน่งผู้บริหารคนที่ 1"
                  className="resize-none border rounded-md"
                  autoSize={{ minRows: 1, maxRows: 3 }}
                />
              </Form.Item>
              <Form.Item
                name="person01_phone"
                label="เบอร์โทรผู้บริหารคนที่ 1"
                className="block text-gray-700 text-sm font-bold mb-2 w-full"
              // rules={[
              //   {
              //     required: true,
              //     message: 'กรุณากรอกชื่อตำแหน่งผู้บริหารคนที่ 1',
              //   },
              // ]}
              >
                <TextArea
                  id="#"
                  type="text"
                  placeholder="เบอร์โทรผู้บริหารคนที่ 1"
                  className="resize-none border rounded-md"
                  autoSize={{ minRows: 1, maxRows: 3 }}
                />
              </Form.Item>
            </div>
          </div>
          <div className="lg:inline-flex w-full">
            <div className="inline-flex lg:w-1/6 pr-2">
              <Form.Item
                name="person02_image"
                className="block text-gray-700 text-sm font-bold mb-2 w-auto h-auto text-center w-full"
              // rules={[
              //   {
              //     required: true,
              //     message: 'กรุณากรอกเลือกภาพผู้บริหารที่ 2',
              //   },
              // ]}
              >
                {/* <Dragger {...dropimg}> */}
                <Dragger
                  maxCount={1}
                  // listType="picture"
                  accept=".jpg, .jpeg, .png"
                  {...imageUploadpropsPerson2}
                >

                  {previewVisiblePerson2 && <><Image
                    // width={200}
                    preview={false}
                    src={previewImagePerson2}
                    style={{
                      height: '156px',
                      width: 'auto',
                      objectFit: 'cover'
                    }}
                  />
                    <p className="text-sm">
                      คลิก หรือ ลากไฟล์มาที่บริเวณนี้เพื่ออัปโหลด ภาพผู้บริหารที่ 2
                    </p>
                  </>
                  }
                  {!previewVisiblePerson2 && <>
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">
                      คลิก หรือ ลากไฟล์มาที่บริเวณนี้เพื่ออัปโหลด ภาพผู้บริหารที่ 2
                    </p>
                  </>
                  }
                </Dragger>
              </Form.Item>
            </div>
            <div className="lg:w-5/6 ">
              <Form.Item
                name="person02_name"
                label="ชื่อผู้บริหารคนที่ 2"
                className="block text-gray-700 text-sm font-bold mb-2 w-full"
              // rules={[
              //   {
              //     required: true,
              //     message: 'กรุณากรอกชื่อผู้บริหารคนที่ 2',
              //   },
              // ]}
              >
                <TextArea
                  id="#"
                  type="text"
                  placeholder="ชื่อผู้บริหารคนที่ 2"
                  className="resize-none border rounded-md"
                  autoSize={{ minRows: 1, maxRows: 3 }}
                />
              </Form.Item>
              <Form.Item
                name="person02_position"
                label="ตำแหน่งผู้บริหารคนที่ 2"
                className="block text-gray-700 text-sm font-bold mb-2 w-full"
              // rules={[
              //   {
              //     required: true,
              //     message: 'กรุณากรอกชื่อตำแหน่งผู้บริหารคนที่ 2',
              //   },
              // ]}
              >
                <TextArea
                  id="#"
                  type="text"
                  placeholder="ตำแหน่งผู้บริหารคนที่ 2"
                  className="resize-none border rounded-md"
                  autoSize={{ minRows: 1, maxRows: 3 }}
                />
              </Form.Item>
              <Form.Item
                name="person02_phone"
                label="เบอร์โทรผู้บริหารคนที่ 2"
                className="block text-gray-700 text-sm font-bold mb-2 w-full"
              // rules={[
              //   {
              //     required: true,
              //     message: 'กรุณากรอกชื่อตำแหน่งผู้บริหารคนที่ 1',
              //   },
              // ]}
              >
                <TextArea
                  id="#"
                  type="text"
                  placeholder="เบอร์โทรผู้บริหารคนที่ 2"
                  className="resize-none border rounded-md"
                  autoSize={{ minRows: 1, maxRows: 3 }}
                />
              </Form.Item>
            </div>
          </div>
          <div className="lg:inline-flex w-full">
            <div className="inline-flex lg:w-1/6 pr-2">
              <Form.Item
                name="person03_image"
                className="block text-gray-700 text-sm font-bold mb-2 w-auto h-auto text-center w-full"
              // rules={[
              //   {
              //     required: true,
              //     message: 'กรุณากรอกเลือกภาพผู้บริหารที่ 3',
              //   },
              // ]}
              >
                {/* <Dragger {...dropimg}> */}
                <Dragger
                  maxCount={1}
                  // listType="picture"
                  accept=".jpg, .jpeg, .png"
                  {...imageUploadpropsPerson3}
                >

                  {previewVisiblePerson3 && <><Image
                    // width={200}
                    preview={false}
                    src={previewImagePerson3}
                    style={{
                      height: '156px',
                      width: 'auto',
                      objectFit: 'cover'
                    }}
                  />
                    <p className="text-sm">
                      คลิก หรือ ลากไฟล์มาที่บริเวณนี้เพื่ออัปโหลด ภาพผู้บริหารที่ 3
                    </p>
                  </>
                  }
                  {!previewVisiblePerson3 && <>
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">
                      คลิก หรือ ลากไฟล์มาที่บริเวณนี้เพื่ออัปโหลด ภาพผู้บริหารที่ 3
                    </p>
                  </>
                  }
                </Dragger>
              </Form.Item>
            </div>
            <div className="lg:w-5/6 ">
              <Form.Item
                name="person03_name"
                label="ชื่อผู้บริหารคนที่ 3"
                className="block text-gray-700 text-sm font-bold mb-2 w-full"
              // rules={[
              //   {
              //     required: true,
              //     message: 'กรุณากรอกชื่อผู้บริหารคนที่ 3',
              //   },
              // ]}
              >
                <TextArea
                  id="#"
                  type="text"
                  placeholder="ชื่อผู้บริหารคนที่ 3"
                  className="resize-none border rounded-md"
                  autoSize={{ minRows: 1, maxRows: 3 }}
                />
              </Form.Item>
              <Form.Item
                name="person03_position"
                label="ตำแหน่งผู้บริหารคนที่ 3"
                className="block text-gray-700 text-sm font-bold mb-2 w-full"
              // rules={[
              //   {
              //     required: true,
              //     message: 'กรุณากรอกชื่อตำแหน่งผู้บริหารคนที่ 3',
              //   },
              // ]}
              >
                <TextArea
                  id="#"
                  type="text"
                  placeholder="ตำแหน่งผู้บริหารคนที่ 3"
                  className="resize-none border rounded-md"
                  autoSize={{ minRows: 1, maxRows: 3 }}
                />
              </Form.Item>
              <Form.Item
                name="person03_phone"
                label="เบอร์โทรผู้บริหารคนที่ 3"
                className="block text-gray-700 text-sm font-bold mb-2 w-full"
              // rules={[
              //   {
              //     required: true,
              //     message: 'กรุณากรอกชื่อตำแหน่งผู้บริหารคนที่ 1',
              //   },
              // ]}
              >
                <TextArea
                  id="#"
                  type="text"
                  placeholder="เบอร์โทรผู้บริหารคนที่ 3"
                  className="resize-none border rounded-md"
                  autoSize={{ minRows: 1, maxRows: 3 }}
                />
              </Form.Item>
            </div>
          </div>
          <Form.Item className="flex mt-6">
            <div className="lg:inline-flex w-full">
              <div className="text-center lg:text-right w-full">
                <Button
                  htmlType="button"
                  onClick={onReset}
                  style={{
                    backgroundColor: '#C2CFE0',
                    borderColor: '#C2CFE0',
                    height: 40,
                    width: 110,
                    marginBottom: '0px !important',
                    marginRight: '2px',
                    color: 'white !important',
                  }}
                  // htmlType="submit"
                  className="text-center bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full lg:w-1/4"
                >
                  <Text className="text-custom-black ">รีเซ็ท</Text>
                </Button>
                <Button
                  // type="primary"
                  style={{
                    backgroundColor: '#059669',
                    borderColor: '#059669',
                    height: 40,
                    width: 110,
                    marginBottom: '0px !important',
                    color: 'white !important',
                  }}
                  htmlType="submit"
                  className="text-center bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full lg:w-1/4"
                >
                  <Text className="text-custom-white ">บันทึก</Text>
                </Button>
              </div>
            </div>
          </Form.Item>
        </Form>
      </div>
    </Layout>
  );
}
/* getServerSideProps */
export async function getServerSideProps(context) {
  const { req } = context;
  const { origin } = absoluteUrl(req);

  return {
    props: {
      origin,
    },
  };
}
