import { InboxOutlined } from '@ant-design/icons';
import {
  Button, Form, Input, notification, Typography, Upload
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
const config = require('./../../config');

export default function Home(props) {
  const editor = useRef(null)
  const [content, setContent] = useState('')
  const [api, contextHolder] = notification.useNotification();
  const { user, origin } = props;
  const router = useRouter();
  const [previewImage, setPreviewImage] = useState(null)
  const [imageLandingPage, setImageLandingPage] = useState(null)
  const [previewVisible, setPreviewVisible] = useState(false)


  const [slide, setSlide] = useState(1);
  const slider = () => {
    slide ? setSlide(0) : setSlide(1);
  };

  const [active, setActive] = useState(1);
  const actived = () => {
    active ? setActive(0) : setActive(1);
  };

  const [date, setDate] = useState('');
  const [fields, setFields] = useState([
    {
      name: ['activities_date'],
      value: moment(),
    },
  ]);

  useEffect(() => {
    setDate(moment())
  }, []);

  async function onSubmitHandler(value) {
    console.log("date onSubmitHandler")
    // console.log(date)
    var dateStr = moment(value.activities_date).format()
    const data = {
      organization_id: user.organization_id,
      activities_title: value.activities_title,
      activities_detail: value.activities_detail,
      activities_image: imageLandingPage,
      activities_date: dateStr,
      activities_keyword: value.activities_keyword,
      is_slide: slide,
      status_active: active,
    };
    console.log(dateStr._i)
    console.log(data)
    const addactivitiesData = await apiInstance().post(
      'admin/management/add-activities',
      data,
    );
    if (addactivitiesData.data.status == 200) {
      openNotificationRegisterSuccess();
      setTimeout(function () { //Start the timer
        router.push('/admin/management/activities')
      }.bind(this), 2000)
    } else {
      openNotificationRegisterFail(addactivitiesData.data.message);
    }
  }


  const openNotificationRegisterSuccess = () => {
    api.success({
      message: `เพิ่มกิจกรรมสำเร็จ`,
      description: 'เพิ่มกิจกรรมสำเร็จแล้ว',
      placement: 'topRight',
    });
  };

  const openNotificationRegisterFail = messgae => {
    api.error({
      message: `พบปัญหาระหว่างการเพิ่มกิจกรรม`,
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
    setSlide(1)
    resetImagePreview()
    form.resetFields();
    setFields([
      {
        name: ['activities_date'],
        value: moment(),
      },
    ])
  };

  const imageUploadprops = {
    name: 'file',
    multiple: false,
    listType: 'text',
    maxCount: 1,
    action: "/api/upload/activities",
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
            <div className="inline-flex lg:w-1/6 ">
              <Form.Item
                name="activities_image"
                className="block text-gray-700 text-sm font-bold mb-2 w-auto h-auto text-center"
                rules={[
                  {
                    required: true,
                    message: 'กรุณากรอกเลือกภาพปกกิจกรรม',
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
            </div>
            <div className="lg:w-5/6 ">
              <Form.Item
                name="#"
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
                name="#"
                label="ชื่อหน่วยงาน ภาษาอังกฤษ"
                className="block text-gray-700 text-sm font-bold mb-2 w-full"
                rules={[
                  {
                    required: true,
                    message: 'กรุณากรอกชื่อหน่วยงานภาษาอังกฤษ',
                  },
                ]}
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
            name="#"
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
              autoSize={{ minRows: 1, maxRows: 3 }}
            />
          </Form.Item>
          <div className="lg:inline-flex w-full">
            <div className="inline-flex lg:w-1/3 mr-4">
              <Form.Item
                name=""
                label="จังหวัด"
                className="block text-gray-700 text-sm font-bold mb-2 w-full"
                rules={[
                  {
                    required: true,
                    message: 'กรุณากรอกชื่อจังหวัด',
                  },
                ]}
              >
                <TextArea
                  id="#"
                  type="text"
                  placeholder="จังหวัด"
                  className="resize-none border rounded-md"
                  autoSize={{ minRows: 1, maxRows: 3 }}
                />
              </Form.Item>
            </div>
            <div className="inline-flex lg:w-1/3 mx-4">
              <Form.Item
                name=""
                label="อำเภอ"
                className="block text-gray-700 text-sm font-bold mb-2 w-full"
                rules={[
                  {
                    required: true,
                    message: 'กรุณากรอกชื่ออำเภอ',
                  },
                ]}
              >
                <TextArea
                  id="#"
                  type="text"
                  placeholder="อำเภอ"
                  className="resize-none border rounded-md"
                  autoSize={{ minRows: 1, maxRows: 3 }}
                />
              </Form.Item>
            </div>
            <div className="inline-flex lg:w-1/3 ml-4">
              <Form.Item
                name=""
                label="ตำบล"
                className="block text-gray-700 text-sm font-bold mb-2 w-full"
                rules={[
                  {
                    required: true,
                    message: 'กรุณากรอกชื่อตำบล',
                  },
                ]}
              >
                <TextArea
                  id="#"
                  type="text"
                  placeholder="ตำบล"
                  className="resize-none border rounded-md"
                  autoSize={{ minRows: 1, maxRows: 3 }}
                />
              </Form.Item>
            </div>
          </div>
          <div className="lg:inline-flex w-full">
            <div className="inline-flex lg:w-1/2 mr-4">
              <Form.Item
                name=""
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
            <div className="inline-flex lg:w-1/2 ml-4">
              <Form.Item
                name=""
                label="เบอร์ fax"
                className="block text-gray-700 text-sm font-bold mb-2 w-full"
                rules={[
                  {
                    required: true,
                    message: 'กรุณากรอกเบอร์ fax',
                  },
                ]}
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
            <div className="inline-flex lg:w-1/2 mr-4">
              <Form.Item
                name=""
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
            <div className="inline-flex lg:w-1/2 ml-4">
              <Form.Item
                name=""
                label="อีเมลล์สำหรับแจ้งเตือน"
                className="block text-gray-700 text-sm font-bold mb-2 w-full"
                rules={[
                  {
                    required: true,
                    message: 'กรุณากรอกอีเมลล์สำหรับแจ้งเตือน',
                  },
                ]}
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
            <div className="inline-flex lg:w-1/2 mr-4">
              <Form.Item
                name=""
                label="facebook page id"
                className="block text-gray-700 text-sm font-bold mb-2 w-full"
                rules={[
                  {
                    required: true,
                    message: 'กรุณากรอก facebook page id',
                  },
                ]}
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
            <div className="inline-flex lg:w-1/2 ml-4">
              <Form.Item
                name=""
                label="รหัสหน่วยงานภาครัฐสำหรับเชือมต่อระบบ E-GP"
                className="block text-gray-700 text-sm font-bold mb-2 w-full"
                rules={[
                  {
                    required: true,
                    message: 'กรุณากรอกรหัสหน่วยงานภาครัฐสำหรับเชือมต่อระบบ E-GP',
                  },
                ]}
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
            <div className="inline-flex lg:w-1/6 ">
              <Form.Item
                name="activities_image"
                className="block text-gray-700 text-sm font-bold mb-2 w-auto h-auto text-center"
                rules={[
                  {
                    required: true,
                    message: 'กรุณากรอกเลือกภาพปกกิจกรรม',
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
            </div>
            <div className="lg:w-5/6 ">
              <Form.Item
                name="#"
                label="ชื่อผู้บริหารคนที่ 1"
                className="block text-gray-700 text-sm font-bold mb-2 w-full"
                rules={[
                  {
                    required: true,
                    message: 'กรุณากรอกชื่อผู้บริหารคนที่ 1',
                  },
                ]}
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
                name="#"
                label="ตำแหน่งผู้บริหารคนที่ 1"
                className="block text-gray-700 text-sm font-bold mb-2 w-full"
                rules={[
                  {
                    required: true,
                    message: 'กรุณากรอกชื่อตำแหน่งผู้บริหารคนที่ 1',
                  },
                ]}
              >
                <TextArea
                  id="#"
                  type="text"
                  placeholder="ตำแหน่งผู้บริหารคนที่ 1"
                  className="resize-none border rounded-md"
                  autoSize={{ minRows: 1, maxRows: 3 }}
                />
              </Form.Item>
            </div>
          </div>
          <div className="lg:inline-flex w-full">
            <div className="inline-flex lg:w-1/6 ">
              <Form.Item
                name="activities_image"
                className="block text-gray-700 text-sm font-bold mb-2 w-auto h-auto text-center"
                rules={[
                  {
                    required: true,
                    message: 'กรุณากรอกเลือกภาพปกกิจกรรม',
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
            </div>
            <div className="lg:w-5/6 ">
              <Form.Item
                name="#"
                label="ชื่อผู้บริหารคนที่ 2"
                className="block text-gray-700 text-sm font-bold mb-2 w-full"
                rules={[
                  {
                    required: true,
                    message: 'กรุณากรอกชื่อผู้บริหารคนที่ 2',
                  },
                ]}
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
                name="#"
                label="ตำแหน่งผู้บริหารคนที่ 2"
                className="block text-gray-700 text-sm font-bold mb-2 w-full"
                rules={[
                  {
                    required: true,
                    message: 'กรุณากรอกชื่อตำแหน่งผู้บริหารคนที่ 2',
                  },
                ]}
              >
                <TextArea
                  id="#"
                  type="text"
                  placeholder="ตำแหน่งผู้บริหารคนที่ 2"
                  className="resize-none border rounded-md"
                  autoSize={{ minRows: 1, maxRows: 3 }}
                />
              </Form.Item>
            </div>
          </div>
          <div className="lg:inline-flex w-full">
            <div className="inline-flex lg:w-1/6 ">
              <Form.Item
                name="activities_image"
                className="block text-gray-700 text-sm font-bold mb-2 w-auto h-auto text-center"
                rules={[
                  {
                    required: true,
                    message: 'กรุณากรอกเลือกภาพปกกิจกรรม',
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
            </div>
            <div className="lg:w-5/6 ">
              <Form.Item
                name="#"
                label="ชื่อผู้บริหารคนที่ 3"
                className="block text-gray-700 text-sm font-bold mb-2 w-full"
                rules={[
                  {
                    required: true,
                    message: 'กรุณากรอกชื่อผู้บริหารคนที่ 3',
                  },
                ]}
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
                name="#"
                label="ตำแหน่งผู้บริหารคนที่ 3"
                className="block text-gray-700 text-sm font-bold mb-2 w-full"
                rules={[
                  {
                    required: true,
                    message: 'กรุณากรอกชื่อตำแหน่งผู้บริหารคนที่ 3',
                  },
                ]}
              >
                <TextArea
                  id="#"
                  type="text"
                  placeholder="ตำแหน่งผู้บริหารคนที่ 3"
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
