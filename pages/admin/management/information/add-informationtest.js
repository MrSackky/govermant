import { InboxOutlined } from '@ant-design/icons';
import {
  Button, DatePicker, Form, Image, Input, notification, Switch, Typography, Upload
} from 'antd';
import axios from 'axios';
import moment from 'moment';
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
const config = require('../../config');

export default function Home(props) {
  const editor = useRef(null)
  const [content, setContent] = useState('')
  const [api, contextHolder] = notification.useNotification();
  const { user, origin } = props;
  const router = useRouter();
  const [previewImage, setPreviewImage] = useState(null)
  const [imageLandingPage, setImageLandingPage] = useState(null)
  const [previewVisible, setPreviewVisible] = useState(false)


  const [active, setActive] = useState(1);
  const actived = () => {
    active ? setActive(0) : setActive(1);
  };

  const [date, setDate] = useState('');
  const [fields, setFields] = useState([
    {
      name: ['infor_date'],
      value: moment(),
    },
  ]);

  useEffect(() => {
    setDate(moment())
  }, []);

  async function onSubmitHandler(value) {
    console.log("date onSubmitHandler")
    // console.log(date)
    var dateStr = moment(value.infor_date).format()
    const data = {
      organization_id: user.organization_id,
      infor_title: value.infor_title,
      infor_detail: value.infor_detail,
      infor_image: imageLandingPage,
      infor_date: date_Str,
      infor_keyword: value.infor_keyword,
      infor_view: '0',
      status_active: active,
    };
    console.log(dateStr._i)
    console.log(data)
    const addinforData = await apiInstance().post(
      'admin/management/add-information',
      data,
    );
    if (addinforData.data.status == 200) {
      openNotificationRegisterSuccess();
      setTimeout(function () { //Start the timer
        router.push('/admin/management/information')
      }.bind(this), 2000)
    } else {
      openNotificationRegisterFail(addinforData.data.message);
    }
  }


  const openNotificationRegisterSuccess = () => {
    api.success({
      message: `เพิ่มข่าวประชาสัมพันธ์สำเร็จ`,
      description: 'เพิ่มข่าวประชาสัมพันธ์สำเร็จแล้ว',
      placement: 'topRight',
    });
  };

  const openNotificationRegisterFail = messgae => {
    api.error({
      message: `พบปัญหาระหว่างการเพิ่มข่าวประชาสัมพันธ์`,
      description: messgae,
      placement: 'topRight',
    });
  };

  const { Dragger } = Upload;


  function onChange(value, dateString) {
    // console.log('Selected Time: ', value);
    // console.log('Formatted Selected Time: ', dateString);
    setDate(dateString);
  }

  const [form] = Form.useForm();

  const onReset = () => {
    setActive(1)
    resetImagePreview()
    form.resetFields();
    setFields([
      {
        name: ['infor_date'],
        value: moment(),
      },
    ])
  };

  const imageUploadprops = {
    name: 'file',
    multiple: false,
    listType: 'text',
    maxCount: 1,
    action: "/api/upload/information",
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
      // user={login}
      indexSubMenu={"1"}
      indexMenu={"sub-1-1"}
      titlePage="เพิ่มข่าวประชาสัมพันธ์"
      _routes={[
        {
          path: '/admin/dashborad',
          breadcrumbName: 'หน้าหลัก',
        },
        {
          path: '/admin/management/information',
          breadcrumbName: 'จัดการข่าวประชาสัมพันธ์',
        },
        {
          path: '/admin/management/information/add-information',
          breadcrumbName: 'เพิ่มข่าวประชาสัมพันธ์',
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
          fields={fields}
        >
          <Form.Item
            name="infor_title"
            label="ชื่อข่าวประชาสัมพันธ์ :"
            className="block text-gray-700 text-sm font-bold mb-2 w-full"
            rules={[
              {
                required: true,
                message: 'กรุณากรอกชื่อข่าวประชาสัมพันธ์',
              },
            ]}
          >
            <TextArea
              id="#"
              type="text"
              placeholder="ชื่อข่าวประชาสัมพันธ์"
              className="resize-none border rounded-md"
              autoSize={{ minRows: 1, maxRows: 3 }}
            />
          </Form.Item>
          <Form.Item
            name="infor_detail"
            label="รายละเอียด :"
            className="block text-gray-700 text-sm font-bold mb-2 w-full"
            rules={[
              {
                required: true,
                message: 'กรุณากรอกรายละเอียดข่าวประชาสัมพันธ์',
              },
            ]}
          >
            <JoditEditor
              ref={editor}
              value={content}
              config={config.config(user)}
              height={"700px"}
              tabIndex={1} // tabIndex of textarea
              onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
              onChange={newContent => { }}
            />
          </Form.Item>
          <Form.Item
            name="infor_image"
            label="ภาพปกข่าวประชาสัมพันธ์ :"
            className="block text-gray-700 text-sm font-bold mb-2 w-full"
            rules={[
              {
                required: true,
                message: 'กรุณากรอกเลือกภาพปกข่าวประชาสัมพันธ์',
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
          <Form.Item
            name="infor_date"
            label="วันที่ลงข่าวประชาสัมพันธ์ :"
            className="block text-gray-700 text-sm font-bold mb-2 w-full "
            rules={[
              {
                required: true,
                message: 'กรุณากรอกเลือกวันที่ลงข่าวประชาสัมพันธ์',
              },
            ]}
          >
            <DatePicker
              className="w-full"
              showTime
              onChange={onChange}
              style={{
                width: '100%',
              }}
              defaultValue={moment()}
              value={date}
            />
          </Form.Item>
          <Form.Item
            name="infor_keyword"
            label="Keyword สำหรับทำ SEO :"
            className="block text-gray-700 text-sm font-bold mb-2 w-full"
          >
            <TextArea
              id="#"
              type="text"
              placeholder="Keyword สำหรับทำ SEO :"
              className="resize-none border rounded-md"
              autoSize={{ minRows: 1, maxRows: 3 }}
            />
          </Form.Item>
          <Form.Item className="flex mt-6">
            <div className="lg:inline-flex w-full">
              <div className="inline-flex text-left lg:w-1/2">
                <Switch checked={active} onClick={(value) => { actived(value) }} />
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
