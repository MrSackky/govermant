import {
  Button, DatePicker, Form, notification, Row, Select,
  Switch, Typography
} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import moment from 'moment';
import { useRouter } from 'next/router';
// import UserNav from '../components/navigation/User';
import { useEffect, useState } from 'react';
import validator from 'validator';
/* components */
import Layout from '../../../../components/layout/LayoutAdmin';
/* utils */
import { absoluteUrl, apiInstance, convertDateDBtoDatePickerNoTime } from '../../../../middleware/utils';

const { Text, Title } = Typography;
const { Option } = Select;

export default function Home(props) {
  const { user, origin } = props;
  const [url, setUrl] = useState("")
  const [organizationData, setOrganizationData] = useState(null)
  const [packageData, setPackageData] = useState(null)
  const [provinces, setProvinces] = useState(null)
  const [districts, setDistricts] = useState(null)
  const [subDistricts, setSubDistricts] = useState(null)
  const [isUse, setIsUse] = useState(1);
  // const [provincesSelected, setProvincesSelected] = useState("0")
  const [fields, setFields] = useState([
    {
      name: ['organization_name'],
      value: '',
    },
    {
      name: ['organization_name_eng'],
      value: '',
    },
  ]);
  const [api, contextHolder] = notification.useNotification();
  const router = useRouter();
  const { organizationId } = router.query

  async function onSubmitHandler(value) {
    // console.log("value")
    // console.log(value)
    const data = {
      'organization_name': value.organization_name,
      'organization_name_eng': value.organization_name_eng ? value.organization_name_eng : "",
      'organization_phone': value.phone,
      'organization_address': value.organization_address,
      'thumbnail_url': url,
      'organization_email': value.email,
      'date_expired': value.date_expired,
      'package_id': value.package,
      'organization_sub_district_id': value.subDistrictSelected,
      'organization_fax': value.organization_fax ? value.organization_fax : "",
      'thumbnail_link': value.thumbnail_link ? value.thumbnail_link : "",
      'is_use': isUse
    }
    console.log(data)
    const registerData = await apiInstance().put('/organization/' + organizationId, data);
    if (registerData.data.status == 200) {
      openNotificationRegisterSuccess()
      fetchOrganizationData();

    } else {
      openNotificationRegisterFail(registerData.data.message)

    }
  }


  const openNotificationRegisterSuccess = () => {
    api.success({
      message: `บันทึกข้อมูลสำเร็จ`,
      description: 'บันทึกข้อมูลสำเร็จ',
      placement: 'topRight',
    });
  };

  const openNotificationRegisterFail = (messgae) => {
    api.error({
      message: `พบปัญหาระหว่างการบันทึกข้อมูล`,
      description: messgae,
      placement: 'topRight',
    });
  };
  const validateURL = (inputText) => {
    setUrl(validator.trim(inputText))
  }

  useEffect(() => {

    // console.log(organizationId);
    fetchOrganizationData();
    fetchPackageData();
    fetchProvincesData();
  }, [])

  const fetchPackageData = async () => {
    const _packageData = await apiInstance().get(
      'package'
    );

    setPackageData(_packageData.data.data)
    // console.log(_packageData.data.data)
  }

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
  const onResetForm = () => {
    setUrl(organizationData.thumbnail_url)
    fetchDistrictsData(organizationData.sub_districts ? organizationData.sub_districts.provinces.province_id : 0)
    fetchSubDistrictData(organizationData.sub_districts ? organizationData.sub_districts.districts.district_id : 0)
    setIsUse(organizationData.is_use == 1 ? 1 : 0)
    setFields([
      {
        name: ['organization_name'],
        value: organizationData.organization_name,
      },
      {
        name: ['organization_name_eng'],
        value: organizationData.organization_name_eng,
      },
      {
        name: ['phone'],
        value: organizationData.organization_phone,
      },
      {
        name: ['email'],
        value: organizationData.organization_email,
      },
      {
        name: ['date_created'],
        value: convertDateDBtoDatePickerNoTime(organizationData.date_created),
      },
      {
        name: ['date_expired'],
        value: moment(organizationData.date_expired),
      },
      {
        name: ['package'],
        value: organizationData.packages.package_id,
      },
      {
        name: ['provincesSelected'],
        value: organizationData.sub_districts ? organizationData.sub_districts.provinces.province_id : "0"
      },
      {
        name: ['districtSelected'],
        value: organizationData.sub_districts ? organizationData.sub_districts.districts.district_id : "0"
      },
      {
        name: ['subDistrictSelected'],
        value: organizationData.sub_districts ? organizationData.sub_districts.sub_district_id : "0"
      },
      {
        name: ['organization_fax'],
        value: organizationData.organization_fax
      },
      {
        name: ['thumbnail_link'],
        value: organizationData.thumbnail_link
      },
      {
        name: ['name_user'],
        value: organizationData.users ? organizationData.users[0].name_user : ""
      },
      {
        name: ['email_user'],
        value: organizationData.users ? organizationData.users[0].email_user : ""
      },
      {
        name: ['phone_user'],
        value: organizationData.users ? organizationData.users[0].phone_user : ""
      },
      {
        name: ['organization_address'],
        value: organizationData.organization_address ? organizationData.organization_address : ""
      }

    ])
  }
  const fetchOrganizationData = async () => {

    const _organizationData = await apiInstance().get(
      'organization/' + organizationId
    );

    // console.log(_organizationData.data.organization)
    setOrganizationData(_organizationData.data.organization)
    setUrl(_organizationData.data.organization.thumbnail_url)
    // console.log(convertDateDBtoDatePickerNoTime(_organizationData.data.organization.date_expired))
    // setProvincesSelected(_organizationData.data.organization.sub_districts ? _organizationData.data.organization.sub_districts.provinces.province_id.toString() : "0" )
    fetchDistrictsData(_organizationData.data.organization.sub_districts ? _organizationData.data.organization.sub_districts.provinces.province_id : 0)
    fetchSubDistrictData(_organizationData.data.organization.sub_districts ? _organizationData.data.organization.sub_districts.districts.district_id : 0)
    setIsUse(_organizationData.data.organization.is_use == 1 ? 1 : 0)
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
        name: ['phone'],
        value: _organizationData.data.organization.organization_phone,
      },
      {
        name: ['email'],
        value: _organizationData.data.organization.organization_email,
      },
      {
        name: ['date_created'],
        value: convertDateDBtoDatePickerNoTime(_organizationData.data.organization.date_created),
      },
      {
        name: ['date_expired'],
        value: moment(convertDateDBtoDatePickerNoTime(_organizationData.data.organization.date_expired)),
      },
      {
        name: ['package'],
        value: _organizationData.data.organization.packages.package_id,
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
        name: ['name_user'],
        value: _organizationData.data.organization.users ? _organizationData.data.organization.users[0].name_user : ""
      },
      {
        name: ['email_user'],
        value: _organizationData.data.organization.users ? _organizationData.data.organization.users[0].email_user : ""
      },
      {
        name: ['phone_user'],
        value: _organizationData.data.organization.users ? _organizationData.data.organization.users[0].phone_user : ""
      },
      {
        name: ['organization_address'],
        value: _organizationData.data.organization.organization_address ? _organizationData.data.organization.organization_address : ""
      }

    ])
  };
  function disabledDateTime() {
    return {
      disabledHours: () => range(0, 24).splice(4, 20),
      disabledMinutes: () => range(30, 60),
      disabledSeconds: () => [55, 56],
    };
  }
  function range(start, end) {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }
  function disabledDate(current) {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
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

  return (
    <Layout title="Government - Admin management" titlePage={"แก้ไขข้อมูลหน่วยงาน " + (organizationData ? organizationData.organization_name : "")} url={origin} indexMenu={"1"} origin={origin} props={props} _routes={[
      {
        path: '/admin/dashborad',
        breadcrumbName: 'หน้าหลัก',
      }, {
        path: '/admin/management-organization',
        breadcrumbName: 'จัดการหน่วยงาน',
      }, {
        path: '',
        breadcrumbName: 'แก้ไขหน่วยงาน',
      }]}>
      <div>
        {contextHolder}
        {/* {JSON.stringify(organizationData)} */}
        <Row >
          {/* {JSON.stringify(organizationData)} */}
          <Form
            name="basic"
            className="w-full"
            // initialValues={{ email: email, invitationCode: code }}
            layout="vertical"
            onFinish={onSubmitHandler}
            // onFinishFailed={onFinishFailed}
            requiredMark={true}
            fields={fields}
          >


            <Form.Item
              name="organization_name"
              label="ชื่อหน่วยงาน"
              className="block text-gray-700 text-sm font-bold mb-2 w-1/2 form-organization"
              rules={[
                {
                  required: true,
                  message: 'กรุณากรอก ชื่อหน่วยงาน!'
                },
              ]}
            >
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="#"
                type="text"
                placeholder="ชื่อหน่วยงาน"
              />
            </Form.Item>
            <Form.Item
              name="organization_name_eng"
              label="ชื่อหน่วยงานภาษาอังกฤษ"
              className="block text-gray-700 text-sm font-bold mb-2 w-1/2 form-organization"

            >
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="#"
                type="text"
                placeholder="ชื่อหน่วยงานภาษาอังกฤษ"
              />
            </Form.Item>
            <div style={{ clear: "both" }}></div>
            <div className="ant-row contact-div">
              <Form.Item
                name="name_user"
                label="ชื่อผู้ติดต่อ"
                className="block text-gray-700 text-sm font-bold mb-2 w-1/3 form-organization"
                style={{ textAlign: "left !important" }}
                rules={[
                  {
                    required: true,
                    message: 'กรุณากรอก ชื่อผู้ติดต่อ!'
                  },
                ]}
              >
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="#"
                  type="text"
                  placeholder="ชื่อผู้ติดต่อ"
                  readOnly
                />
              </Form.Item>

              <Form.Item
                name="phone_user"
                label="เบอร์โทรผู้ติดต่อ"
                className="block text-gray-700 text-sm font-bold mb-2 w-1/3 form-organization"
                style={{ textAlign: "left !important" }}
                rules={[
                  {
                    required: true,
                    message: 'กรุณากรอก เบอร์โทรผู้ติดต่อ!'
                  },
                ]}
              >
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="#"
                  type="text"
                  placeholder="เบอร์โทรผู้ติดต่อ"
                  readOnly
                />
              </Form.Item>

              <Form.Item
                name="email_user"
                label="อีเมลล์ผู้ติดต่อ"
                className="block text-gray-700 text-sm font-bold mb-2 w-1/3 form-organization"
                style={{ textAlign: "left !important" }}
                rules={[
                  {
                    required: true,
                    message: 'กรุณากรอก อีเมลล์ผู้ติดต่อ!'
                  },
                ]}
              >
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="#"
                  type="text"
                  placeholder="อีเมลล์ผู้ติดต่อ"
                  readOnly
                />
              </Form.Item>
            </div>
            <div style={{ clear: "both" }}></div>
            <Form.Item
              name="package"
              label="แพคเกจ"
              className="block text-gray-700 text-sm font-bold mb-2 w-1/3 form-organization"
              style={{ textAlign: "left !important" }}

            >
              <Select defaultValue={organizationData ? organizationData.packages : "0"}
                // style={{ width: 120 }}
                // onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

              >
                {/* <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="disabled" disabled>
                  Disabled
                </Option>*/}
                <Option value="0">เลือก</Option>
                {packageData ? packageData.map((object) => {
                  return <Option value={object.package_id}>{object.name_package} ({object.code_package} พื้นที่ {object.size_limit != -1 ? object.size_limit + " mb" : "Unlimited"}) </Option>
                }) : ""}
              </Select>
            </Form.Item>
            <Form.Item
              name="date_created"
              label="วันที่สมัคร"
              className="block text-gray-700 text-sm font-bold mb-2 w-1/3 form-organization"
              style={{ textAlign: "left !important" }}

            >
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="#"
                type="text"
                placeholder="วันที่สมัคร"
                readOnly
              />
            </Form.Item>
            <Form.Item
              name="date_expired"
              label="วันหมดอายุ"
              className="block text-gray-700 text-sm font-bold mb-2 w-1/3 form-organization"
              style={{ textAlign: "left !important" }}
              rules={[
                {
                  required: true,
                  message: 'กรุณากรอก วันหมดอายุ!'
                },
              ]}
            >
              <DatePicker
                format="YYYY-MM-DD"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              // showTime={{ defaultValue: moment('00:00:00') }}
              />

            </Form.Item>
            <div style={{ clear: "both" }}></div>
            <Form.Item
              name="email"
              label="อีเมลล์"
              className="block text-gray-700 text-sm font-bold mb-2 w-1/3 form-organization"
              style={{ textAlign: "left !important" }}
              rules={[
                {
                  required: true,
                  message: 'กรุณากรอกอีเมลล์!'
                }
              ]}
            >
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" size="large" placeholder="Email"
              // onChange={() => setEmailText(event.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="phone"
              label="เบอร์โทร"
              className="block text-gray-700 text-sm font-bold mb-2 w-1/3 form-organization"
              style={{ textAlign: "left !important" }}
              rules={[
                {
                  required: true,
                  message: 'กรุณากรอก เบอร์โทร!'
                },
              ]}
            >
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="#"
                type="text"
                placeholder="เบอร์โทร"
              />
            </Form.Item>
            <Form.Item
              name="organization_fax"
              label="เบอร์ fax"
              className="block text-gray-700 text-sm font-bold mb-2 w-1/3 form-organization"
              style={{ textAlign: "left !important" }}

            >
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="#"
                type="text"
                placeholder="เบอร์ fax"
              />
            </Form.Item>
            <Form.Item
              name="organization_address"
              label="ที่อยู่"
              className="block text-gray-700 text-sm font-bold mb-2 w-full form-organization"
              style={{ textAlign: "left !important" }}

            >
              <TextArea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="#"
                type="textarea"
                placeholder="ที่อยู่"
                rows={5}
              />
            </Form.Item>
            <Form.Item
              name="provincesSelected"
              label="จังหวัด"
              className="block text-gray-700 text-sm font-bold mb-2 w-1/3 form-organization"
              style={{ textAlign: "left !important" }}

            >

              <Select
                // defaultValue={()=>provincesSelected}
                // style={{ width: 120 }}
                onChange={handleProvincesChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                filterOption={true}
              >
                {/* <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="disabled" disabled>
                  Disabled
                </Option>*/}
                <Option value="0">เลือก</Option>
                {provinces ? provinces.map((object) => {
                  return <Option value={object.province_id}>{object.province_name}  </Option>
                }) : ""}
              </Select>
            </Form.Item>

            <Form.Item
              name="districtSelected"
              label="อำเภอ"
              className="block text-gray-700 text-sm font-bold mb-2 w-1/3 form-organization"
              style={{ textAlign: "left !important" }}

            >

              <Select
                // defaultValue={()=>provincesSelected}
                // style={{ width: 120 }}
                // onChange={handleChange}
                onChange={handleDistrictChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                filterOption={true}
              >
                {/* <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="disabled" disabled>
                  Disabled
                </Option>*/}
                <Option value="0">เลือก</Option>
                {districts ? districts.map((object) => {
                  return <Option value={object.district_id}>{object.district_name}  </Option>
                }) : ""}
              </Select>
            </Form.Item>

            <Form.Item
              name="subDistrictSelected"
              label="ตำบล"
              className="block text-gray-700 text-sm font-bold mb-2 w-1/3 form-organization"
              style={{ textAlign: "left !important" }}

            >

              <Select
                // defaultValue={()=>provincesSelected}
                // style={{ width: 120 }}
                // onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                filterOption={true}
              >
                {/* <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="disabled" disabled>
                  Disabled
                </Option>*/}
                <Option value="0">เลือก</Option>
                {subDistricts ? subDistricts.map((object) => {
                  return <Option value={object.sub_district_id}>{object.sub_district_name}  </Option>
                }) : ""}
              </Select>
            </Form.Item>

            <Form.Item
              name="url"
              label="URL ใช้งาน"
              className="block text-gray-700 text-sm font-bold mb-2 w-1/2 form-organization"
              style={{ textAlign: "left !important" }}
              rules={[
                // {
                //   required: true,
                //   // message: 'กรุณากรอก URL!'
                // },
                {
                  async validator(rule, value) {
                    const data = {
                      "url": url,
                      "organization_id": organizationData.organization_id,
                    }
                    const checkUrl = await apiInstance().post('/organization/check-url-edit', data);
                    if (checkUrl.data.status == 200) {
                      return Promise.resolve()
                    } else {
                      return Promise.reject(checkUrl.data.message)
                    }

                  },
                },
              ]}
            >
              <div className="flex items-center justify-between">
                <span className="text-base text-center">government.com/ </span>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  size="large" placeholder="ชื่อ url"
                  onPaste={(e) => validateURL(e.target.value)}
                  onChange={(e) => validateURL(e.target.value)}
                  value={url}
                />
              </div>
            </Form.Item>
            <Form.Item
              name="thumbnail_link"
              label="โดเมนเนม"
              className="block text-gray-700 text-sm font-bold mb-2 w-1/2 form-organization"
              style={{ textAlign: "left !important" }}

            >
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="#"
                type="text"
                placeholder="โดเมนเนม"
              />
            </Form.Item>

            <div style={{ clear: "both" }}></div>
            <Form.Item className="flex mt-6">
              <div className="lg:inline-flex w-full">
                <div className="lg:inline-flex text-left w-1/2">
                  <Switch className="swt-btn" checked={isUse} onClick={(value) => setIsUse(value ? 1 : 0)} />
                  <p className="mx-2 text-sm">สถานะการใช้งาน</p>

                </div>
                <div className="text-center lg:text-right w-full lg:w-1/2">
                  <Button
                    htmlType="button"
                    onClick={onResetForm}
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
        </Row>

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
