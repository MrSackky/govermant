import Link from 'next/link';
import { useRouter } from 'next/router';

/* utils */
import { absoluteUrl, apiInstance } from '../middleware/utils';

/* components */
import Layout from '../components/layout/LayoutDefaultStyle2';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { library } from '@fortawesome/fontawesome-svg-core'
import validator from 'validator'

library.add(fas);

import {
  Carousel,
  Row,
  Col,
  Typography,
  Image,
  Button,
  Input,
  Card,
  Form,
  notification
} from 'antd';
import { useEffect, useState } from 'react'

const { Text, Title } = Typography;
const { TextArea } = Input;


export default function Register(props) {
  const [api, contextHolder] = notification.useNotification();
  const [url, setUrl] = useState("")
  const { origin, baseApiUrl } = props;
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
        router.push('/login')
      }.bind(this), 2000)

    } else {
      openNotificationRegisterFail(registerData.data.message)

    }
  }

  const validateURL = (inputText) => {
    setUrl(validator.trim(inputText))
  }


  const openNotificationRegisterSuccess = () => {
    api.success({
      message: `การลงทะเบียนสำเร็จ`,
      description: 'ลงทะเบียนสำเร็จแล้ว',
      placement: 'topRight',
    });
  };

  const openNotificationRegisterFail = (messgae) => {
    api.error({
      message: `พบปัญหาระหว่างการลงทะเบียน`,
      description: messgae,
      placement: 'topRight',
    });
  };

  return (
    <Layout title="Government | Register Page" url={origin} origin={origin}>
      {contextHolder}
      {/* <div className="mx-auto text-black rounded-xl shadow-xl w-96">
        <TextArea
          placeholder="ชื่อ-สกุล"
        />
        <Button className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded-full h-8 text-white bg-transparent font-bold items-center justify-center hover:bg-white-500 hover:text-white py-2 px-4 border border-white-500 ">
          ขอใบเสนอราคา
        </Button>
      </div> */}
      <div className="mx-auto w-full max-w-sm  border-2 border-gray-200 p-4 mb-5">
        {/* <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"> */}
        <div className="flex items-center justify-between mt-2 mr-2 ml-2">
          <p className="">
            <a href="/" className="text-black no-underline hover:text-green-500">
              <FontAwesomeIcon icon={['fas', 'long-arrow-alt-left']} className="mr-1" />
              กลับหน้าหลัก
            </a>
          </p>
          <p className="">
            มีบัญชีผู้ใช้แล้ว ?
            <a href="login" className="text-black no-underline hover:text-green-500">
              เข้าสู่ระบบ
            </a>
          </p>
        </div>
        <div className="text-left mt-8">
          <p className="text-xl font-bold">สมัครสมาชิก</p>
          <p className="text-gray-400 text-opacity-100">
            สมัครสมาชิกเพื่อใช้งานระบบเว็บไซต์หน่วยงานสำเร็จรูป
          </p>
        </div>
        <Form
          name="basic"
          // className="w-96"
          // initialValues={{ email: email, invitationCode: code }}
          layout="vertical"
          onFinish={onSubmitHandler}
          // onFinishFailed={onFinishFailed}
          requiredMark={true}
        >


          <Form.Item
            name="organization_name"
            label="ชื่อหน่วยงาน"
            className="block text-gray-700 text-sm font-bold mb-2 w-full"
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
            className="block text-gray-700 text-sm font-bold mb-2 w-full"
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
            className="block text-gray-700 text-sm font-bold mb-2 w-full"
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
            className="block text-gray-700 text-sm font-bold mb-2 w-full"
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
            className="block text-gray-700 text-sm font-bold mb-2 w-full"
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
                  // const checkEmail = await fetch(`${baseApiUrl}/organization/check-email`, {
                  //   method: 'POST',
                  //   headers: {
                  //     Accept: 'application/json',
                  //     'Content-Type': 'application/json',
                  //   },
                  //   body: JSON.stringify(data),
                  // }).catch(error => {
                  //   console.error('Error:', error);
                  //   return Promise.reject('Error:'+ error)

                  // });
                  // console.log("checkEmail")
                  // console.log()
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
          {/* <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="#">
              อีเมลล์
            </label>

            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="#"
              type="email"
              placeholder="อีเมลล์"
              req
            ></input>
          </div> */}
          <Form.Item
            name="password"
            label="รหัสผ่าน"
            className="block text-gray-700 text-sm font-bold mb-2 w-full"
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
            className="block text-gray-700 text-sm font-bold mb-2 w-full"
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
          {/* <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="#">
              รหัสผ่าน
            </label>

            <input
              className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="#"
              type="password"
              placeholder="รหัสผ่าน"
            ></input>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="#">
              ยืนยันรหัสผ่าน
            </label>

            <input
              className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="#"
              type="password"
              placeholder="ยืนยันรหัสผ่าน"
            ></input>
          </div> */}

          {/* <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              type="button"
              onClick={onSubmitHandler}
            >
              สมัครสมาชิก
            </button> */}
          <Form.Item>
            <Button
              // type="primary"
              style={{
                backgroundColor: '#059669',
                borderColor: '#059669',
                height: 40,
                marginBottom: '0px !important',
                color: "white !important"

              }}

              htmlType="submit"
              // tbgreen
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            // style={{ height: 40 }}
            >
              <Text
                className="text-custom-white "
              >Register</Text>
            </Button>
          </Form.Item>

        </Form>

        {/* </form> */}
      </div>
    </Layout>
  );
}
/* getServerSideProps */
export async function getServerSideProps(context) {
  const { req } = context;
  const { origin } = absoluteUrl(req);

  const referer = req.headers.referer || '';
  const baseApiUrl = `${origin}/api`;


  return {
    props: {
      origin,
      baseApiUrl,
      referer,
    },
  };
}
