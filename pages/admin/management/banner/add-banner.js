import { InboxOutlined } from '@ant-design/icons';
import {
  Button, Form, Image, Input, notification, Switch, Typography, Upload
} from 'antd';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
// import UserNav from '../components/navigation/User';
import React, { useEffect, useRef, useState } from 'react';
/* components */
import Layout from '../../../../components/layout/LayoutAdmin';
/* utils */
import {
  absoluteUrl, apiInstance
} from '../../../../middleware/utils';



const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });
const { Text, Title } = Typography;

const { TextArea } = Input;
const config = require('./../../config');

export default function Home(props) {
  const [api, contextHolder] = notification.useNotification();
  const { user, origin } = props;
  const [login, setLogin] = useState(null);
  const [shouldRun, setShouldRun] = useState(true);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 15,
  });
  const editor = useRef(null)
  const [content, setContent] = useState('')
  const [previewImage, setPreviewImage] = useState(null)
  const [imageLandingPage, setImageLandingPage] = useState(null)
  const [previewVisible, setPreviewVisible] = useState(false)

  useEffect(() => {
    fetch({ pagination });
  }, []);

  const [active, setActive] = useState(1);
  const actived = () => {
    active ? setActive(0) : setActive(1);
  };

  async function onSubmitHandler(value) {
    const data = {
      organization_id: user.organization_id,
      banner_title: value.banner_title,
      banner_image: imageLandingPage,
      banner_link: value.banner_link,
      status_active: active,
      num_click: '0',
      seq: '0',
    };

    const addactivitiesData = await apiInstance().post(
      'admin/management/add-banner',
      data,
    );
    if (addactivitiesData.data.status == 200) {
      openNotificationRegisterSuccess();
      setTimeout(function () { //Start the timer
        router.push('/admin/management/banner')
      }.bind(this), 2000)
    } else {
      openNotificationRegisterFail(addactivitiesData.data.message);
    }
  }

  const openNotificationRegisterSuccess = () => {
    api.success({
      message: `เพิ่มลิงค์หน่วยงานที่เกี่ยวข้องสำเร็จ`,
      description: 'เพิ่มลิงค์หน่วยงานที่เกี่ยวข้องแล้ว',
      placement: 'topRight',
    });
  };

  const openNotificationRegisterFail = messgae => {
    api.error({
      message: `พบปัญหาระหว่างการเพิ่มลิงค์หน่วยงานที่เกี่ยวข้อง`,
      description: messgae,
      placement: 'topRight',
    });
  };

  const { Dragger } = Upload;


  const [form] = Form.useForm();

  const onReset = () => {
    setActive(1)
    resetImagePreview()
    form.resetFields();
  };

  const imageUploadprops = {
    name: 'file',
    multiple: false,
    listType: 'text',
    maxCount: 1,
    action: "/api/upload/banner",
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
    <Layout
      title="Government - Admin management"
      url={origin}
      origin={origin}
      user={login}
      indexSubMenu={"1"}
      indexMenu={"sub-1-3"}
      titlePage="เพิ่มลิงค์หน่วยงานที่เกี่ยวข้อง"
      _routes={[
        {
          path: '/admin/dashborad',
          breadcrumbName: 'หน้าหลัก',
        },
        {
          path: '/admin/management/activities',
          breadcrumbName: 'ลิงค์หน่วยงานที่เกี่ยวข้อง',
        },
        {
          path: '/admin/management/activities/add-activities',
          breadcrumbName: 'เพิ่มลิงค์หน่วยงานที่เกี่ยวข้อง',
        }
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
        >
          <Form.Item
            name="banner_title"
            label="ชื่อลิงค์หน่วยงานที่เกี่ยวข้อง :"
            className="block text-gray-700 text-sm font-bold mb-2 w-full"
            rules={[
              {
                required: true,
                message: 'กรุณากรอกชื่อลิงค์หน่วยงานที่เกี่ยวข้อง',
              },
            ]}
          >
            <TextArea
              id="#"
              type="text"
              placeholder="ชื่อลิงค์หน่วยงานที่เกี่ยวข้อง"
              className="resize-none border rounded-md"
              autoSize={{ minRows: 1, maxRows: 3 }}
            />
          </Form.Item>
          <Form.Item
            name="banner_link"
            label="ที่อยู่ url :"
            className="block text-gray-700 text-sm font-bold mb-2 w-full"
            rules={[
              {
                required: true,
                message: 'กรุณากรอกที่อยู่ url ลิงค์หน่วยงานที่เกี่ยวข้อง',
              },
            ]}
          >
            <TextArea
              id="#"
              type="text"
              placeholder="ที่อยู่ url"
              className="resize-none border rounded-md"
              autoSize={{ minRows: 1, maxRows: 3 }}
            />
          </Form.Item>
          <Form.Item
            name="banner_image"
            label="ภาพลิงค์หน่วยงานที่เกี่ยวข้อง :"
            className="block text-gray-700 text-sm font-bold mb-2 w-full"
            rules={[
              {
                required: true,
                message: 'กรุณากรอกเลือกภาพลิงค์หน่วยงานที่เกี่ยวข้อง',
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
          <Form.Item className="flex mt-6">
            <div className="lg:inline-flex w-full">
              <div className="inline-flex text-left lg:w-1/2">
                <Switch checked={active} onClick={actived} />
                <p className="mx-2 text-sm">การแสดงผล</p>
              </div>
              <div className="text-center lg:text-right w-full lg:w-1/2">
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
