import Link from 'next/link';
import { useRouter } from 'next/router';
/* utils */
import { absoluteUrl, checkIsLogin, apiInstance, convertDatetoAddDB } from '../../../middleware/utils';
import axios from 'axios';
/* components */
import Layout from '../../../components/layout/LayoutAdmin';
import moment from 'moment';
// import UserNav from '../components/navigation/User';
import { useEffect, useState } from 'react'
import validator from 'validator'
import {
  Row,
  Typography,
  Button,
  notification,
  Form,
  DatePicker,
  Upload,
  Image,
  Switch
} from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { set } from 'js-cookie';
const { Text, Title } = Typography;
const { Dragger } = Upload;

export default function Home(props) {
  const { user, origin } = props;
  const [url, setUrl] = useState("")
  const [previewImage, setPreviewImage] = useState(null)
  const [imageLandingPage, setImageLandingPage] = useState(null)
  const [previewVisible, setPreviewVisible] = useState(false)
  const [isHasBless, setIsHasBless] = useState(0)
  const [isUse, setIsUse] = useState(1)

  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const router = useRouter();
  async function onSubmitHandler(value) {
    // console.log("value")
    // console.log(value)
    var date_s_Str = moment(value.intro_date_s).format()
    var date_e_Str = moment(value.intro_date_e).format()
    const data = {
      "organization_id": user.organization_id,
      "intro_title": value.intro_title,
      "intro_url": value.intro_url,
      "intro_btn": value.intro_btn,
      "intro_date_s": date_s_Str,
      "intro_date_e": date_e_Str,
      "intro_image": imageLandingPage,
      "is_has_bless": isHasBless,
      "is_use": isUse,
      "is_admin": 1,
    }

    const registerData = await apiInstance().post('/admin/management/landing-page', data);
    if (registerData.data.status == 200) {
      openNotificationSuccess()
      setTimeout(function () { //Start the timer
        router.push('/admin/management-auto-landingpage')
      }.bind(this), 2000)

    } else {
      openNotificationFail(registerData.data.message)

    }
  }

  useEffect(() => {

  }, [])

  const openNotificationSuccess = () => {
    api.success({
      message: `บันทึกข้อมูลสำเร็จ`,
      description: 'บันทึกข้อมูลสำเร็จ',
      placement: 'topRight',
    });
  };

  const openNotificationFail = (messgae) => {
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

  const imageUploadprops = {
    name: 'file',
    multiple: false,
    listType: 'text',
    maxCount: 1,
    action: "/api/upload/landing-page",
    preview: false,
    // uid: user.type_user == 1 ? "admin" : user.organization_id,
    // beforeUpload(file) {
    // 	const isLt10M = file.size / 1024 / 1024 < 10
    // 	if (!isLt10M) {
    // 		notification.open({
    // 			message: 'Upload error!',
    // 			description: <Text className="text-black">Image must smaller than 10MB!</Text>,
    // 		})
    // 	}
    // 	return isLt10M
    // },
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
        // imageLandingPage
        // console.log(res.data.data.list[0]._name) 
        setImageLandingPage(res.data.data.list[0]._name)
        options.onSuccess(res.data, options.file)
      }).catch((err) => {
        console.log(err)
      })

    },
    async onChange(info) {
      const { status } = info.file
      // console.log(user)
      switch (info.file.status) {
        // case "uploading":
        //   nextState.selectedFileList = [info.file];
        //   break;
        case "done":
          if (!info.file.url && !info.file.preview) {
            info.file.preview = await getBase64(info.file.originFileObj);
          }
          setPreviewImage(info.file.url || info.file.preview)
          setPreviewVisible(true)
          break;

        default:
          // error or removed
          resetImagePreview()
      }
      //console.log(info.file)

      // this.setState({
      //   previewImage: file.url || file.preview,
      //   previewVisible: true,
      // });

    },
    onRemove(info) {
      console.log("onRemove")
      console.log(info)
      resetImagePreview()

    }
  }

  const resetImagePreview = () => {
    setPreviewVisible(false)
    setPreviewImage(null)
  }

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  return (
    <Layout title="Government - Admin management" titlePage={"เพิ่ม landing page"} indexMenu={"4"} url={origin} origin={origin} props={props} _routes={[
      {
        path: '/admin/dashborad',
        breadcrumbName: 'หน้าหลัก',
      }, {
        path: '/admin/management-organization',
        breadcrumbName: 'จัดการหน้า landing page',
      }, {
        path: '/admin/management-organization/add-organization',
        breadcrumbName: 'เพิ่ม landing page',
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
              name="intro_title"
              label="ชื่อหน้า landing page"
              className="block text-gray-700 text-sm font-bold mb-2 w-1/3 form-organization"
              style={{ textAlign: "left !important" }}
              rules={[
                {
                  required: true,
                  message: 'กรุณากรอก ชื่อหน้า landing page!'
                },
              ]}
            >
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="#"
                type="text"
                placeholder="ชื่อหน้า landing page"
              />
            </Form.Item>
            <Form.Item
              name="intro_date_s"
              label="วันที่เริ่มแสดง"
              className="block text-gray-700 text-sm font-bold mb-2  w-1/3 form-organization"
              style={{ textAlign: "left !important" }}
              rules={[
                {
                  required: true,
                  message: 'กรุณากรอก วันที่เริ่มแสดง!'
                },
              ]}
            >

              <DatePicker
                format="YYYY-MM-DD"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              // showTime={{ defaultValue: moment('00:00:00') }}
              />
            </Form.Item>
            <Form.Item
              name="intro_date_e"
              label="วันที่สิ้นสุดการแสดง"
              className="block text-gray-700 text-sm font-bold mb-2  w-1/3 form-organization"
              style={{ textAlign: "left !important" }}
              rules={[
                {
                  required: true,
                  message: 'กรุณากรอก วันที่สิ้นสุดการแสดง!'
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
              name="activities_image"
              label="ภาพ landing page"
              className="block text-gray-700 text-sm font-bold mb-2 w-full"
              rules={[
                {
                  required: true,
                  message: 'กรุณาเลือก ภาพ landing page',
                },
              ]}
            >
              {/* <Dragger {...dropimg}> */}
              <Dragger
                maxCount={1}
                // listType="picture"
                accept=".jpg, .jpeg, .png"
                {...imageUploadprops}
              >

                {previewVisible && <><Image
                  // width={200}
                  preview={false}
                  src={previewImage}
                />
                </>
                }
                {!previewVisible && <>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    คลิก หรือ ลากไฟล์มาที่บริเวณนี้เพื่ออัปโหลด
                  </p>
                </>
                }
              </Dragger>

            </Form.Item>
            <div style={{ clear: "both" }}></div>
            <Form.Item
              name="intro_btn"
              label="คำที่แสดงบนปุ่ม"
              className="block text-gray-700 text-sm font-bold mb-2  w-1/2 form-organization"
              style={{ textAlign: "left !important" }}

            >
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                size="large" placeholder="ชื่อ คำที่แสดงบนปุ่ม"
              />
            </Form.Item>

            <Form.Item
              name="intro_url"
              label="url ที่ต้องการให้ลิงค์ไป"
              className="block text-gray-700 text-sm font-bold mb-2  w-1/2 form-organization"
              style={{ textAlign: "left !important" }}

            >
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" size="large" placeholder="Email"
              // onChange={() => setEmailText(event.target.value)} 
              />
            </Form.Item>


            <div style={{ clear: "both" }}></div>


            <Form.Item className="flex mt-6">
              <div className="lg:inline-flex w-full">
                <div className="lg:inline-flex text-left w-full lg:w-1/2">
                  <Switch checked={isHasBless} onClick={setIsHasBless} />
                  <p className="mx-2 text-sm">มีการถวายพระพร</p>
                  <br />
                  <Switch checked={isUse} onClick={setIsUse} />
                  <p className="mx-2 text-sm">การแสดงผล</p>
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
