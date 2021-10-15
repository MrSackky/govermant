import Link from 'next/link';
import { useRouter } from 'next/router';
/* utils */
import { absoluteUrl, checkIsLogin, apiInstance } from '../../../middleware/utils';

/* components */
import Layout from '../../../components/layout/LayoutAdmin';
// import UserNav from '../components/navigation/User';
import { useEffect, useState } from 'react'
import validator from 'validator'
import {
  Carousel,
  Row,
  Col,
  Typography,
  Image,
  Button,
  Input,
  Card,
  Table,
  notification,
  Form
} from 'antd';
const { Text, Title } = Typography;


export default function Home(props) {
  const { user, origin } = props;
  const [url, setUrl] = useState("")
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const router = useRouter();
  async function onSubmitHandler(value) {
    // console.log("value")
    // console.log(value)
    const data = {
      "organization_name": value.organization_name,
      "name_user": value.name_user,
      "organization_phone": value.phone,
      "thumbnail_url": value.url,
      "organization_email": value.email,
      "password": value.password
    }

    const registerData = await apiInstance().post('/organization/register', data);
    if (registerData.data.status == 200) {
      openNotificationRegisterSuccess()
      setTimeout(function () { //Start the timer
        router.push('/admin/management-organization')
      }.bind(this), 2000)

    } else {
      openNotificationRegisterFail(registerData.data.message)

    }
  }

  useEffect(() => {

  }, [])

  const openNotificationRegisterSuccess = () => {
    api.success({
      message: `บันทึกข้อมูลสำเร็จ`,
      description: 'ลงทะเบียนสำเร็จแล้ว',
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
  const onResetForm = () => {
    form.resetFields();
    setUrl("")
  }

  return (
    <Layout title="Government - Admin management" titlePage={"เพิ่มหน่วยงาน"} indexMenu={"2"} url={origin} origin={origin} props={props} _routes={[
      {
        path: '/admin/dashborad',
        breadcrumbName: 'หน้าหลัก',
      }, {
        path: '/admin/management-organization',
        breadcrumbName: 'จัดการหน่วยงาน',
      }, {
        path: '/admin/management-organization/add-organization',
        breadcrumbName: 'เพิ่มหน่วยงาน',
      }]}>
      <div>
        {contextHolder}
        <Row >

          <Form
            name="basic"
            className="w-full"
            // initialValues={{ email: email, invitationCode: code }}
            layout="vertical"
            onFinish={onSubmitHandler}
            // onFinishFailed={onFinishFailed}
            requiredMark={true}
            form={form}
          >


            <Form.Item
              name="organization_name"
              label="ชื่อหน่วยงาน"
              className="block text-gray-700 text-sm font-bold mb-2 w-1/3 form-organization"
              style={{ textAlign: "left !important" }}
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
              name="name_user"
              label="ชื่อผู้ติดต่อ"
              className="block text-gray-700 text-sm font-bold mb-2  w-1/3 form-organization"
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
              />
            </Form.Item>
            <Form.Item
              name="phone"
              label="เบอร์โทร"
              className="block text-gray-700 text-sm font-bold mb-2  w-1/3 form-organization"
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
              name="url"
              label="URL ใช้งาน"
              className="block text-gray-700 text-sm font-bold mb-2  w-1/2 form-organization"
              style={{ textAlign: "left !important" }}
              rules={[
                {
                  required: true,
                  message: 'กรุณากรอก URL!'
                },
                {
                  async validator(rule, value) {
                    const data = {
                      "url": value,
                    }
                    const checkUrl = await apiInstance().post('/organization/check-url', data);
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
              name="email"
              label="อีเมลล์"
              className="block text-gray-700 text-sm font-bold mb-2  w-1/2 form-organization"
              style={{ textAlign: "left !important" }}
              rules={[
                {
                  required: true,
                  message: 'กรุณากรอกอีเมลล์!'
                },
                {
                  async validator(rule, value) {
                    // if (!value || getFieldValue('password') === value) {
                    //   return Promise.resolve()
                    // }
                    // return Promise.reject('The two passwords that you entered do not match!')
                    const data = {
                      "email": value,
                    }
                    const checkEmail = await apiInstance().post('/organization/check-email', data);
                    if (checkEmail.data.status == 200) {
                      return Promise.resolve()

                    } else {
                      return Promise.reject(checkEmail.data.message)

                    }

                  },
                },
              ]}
            >
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" size="large" placeholder="Email"
              // onChange={() => setEmailText(event.target.value)} 
              />
            </Form.Item>
            <Form.Item
              name="password"
              label="รหัสผ่าน"
              className="block text-gray-700 text-sm font-bold mb-2  w-1/2 form-organization"
              rules={[{ required: true, message: 'กรุณากรอกรหัสผ่าน!' }]}
            >
              <input
                type="password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" size="large"
                size="large"
                placeholder="Password"
              //	onChange={() => setPasswordText(event.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              className="block text-gray-700 text-sm font-bold mb-2  w-1/2 form-organization"
              label="ยืนยันรหัสผ่าน"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'กรุณากรอกยืนยันรหัสผ่าน!',
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve()
                    }
                    return Promise.reject('รหัสผ่านไม่ตรงกัน!')
                  },
                }),
              ]}
            >
              <input
                type="password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" size="large"
                size="large"
                placeholder="Confirm password"
              //	onChange={() => setCfPassword(event.target.value)}
              />
            </Form.Item>
            <div style={{ clear: "both" }}></div>

          
            <Form.Item className="flex mt-6">
              <div className="lg:inline-flex w-full">
               
                <div className="text-center lg:text-right w-full lg:w-full">
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
