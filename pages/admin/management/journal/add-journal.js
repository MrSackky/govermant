import { FilePdfTwoTone, InboxOutlined } from '@ant-design/icons';
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
  const [journal_ori, setJournal_ori] = useState('')
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 15,
  });
  const editor = useRef(null)
  const [content, setContent] = useState('')
  const [previewImage, setPreviewImage] = useState(null)
  const [imageLandingPage, setImageLandingPage] = useState(null)
  const [previewVisibleImage, setPreviewVisibleImage] = useState(false)
  const [previewFile, setPreviewFile] = useState(null)
  const [previewVisibleFile, setPreviewVisibleFile] = useState(false)

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
      journal_subject: value.journal_subject,
      journal_detail: value.journal_detail,
      journal_file: value.journal_subject,
      journal_ori: journal_ori,
      journal_img: imageLandingPage,
      is_show: active,
      is_deleted: '0'
    };

    const addactivitiesData = await apiInstance().post(
      'admin/management/add-journal',
      data,
    );
    if (addactivitiesData.data.status == 200) {
      openNotificationRegisterSuccess();
      setTimeout(function () { //Start the timer
        router.push('/admin/management/journal')
      }.bind(this), 2000)
    } else {
      openNotificationRegisterFail(addactivitiesData.data.message);
    }
  }

  const validateURL = inputText => {
    setUrl(validator.trim(inputText));
  };

  const openNotificationRegisterSuccess = () => {
    api.success({
      message: `เพิ่มวารสารสำเร็จ`,
      description: 'เพิ่มวารสารสำเร็จแล้ว',
      placement: 'topRight',
    });
  };

  const openNotificationRegisterFail = messgae => {
    api.error({
      message: `พบปัญหาระหว่างการเพิ่มวารสาร`,
      description: messgae,
      placement: 'topRight',
    });
  };

  const contentStyle = {
    height: 'auto',
    textAlign: 'center',
  };


  const handleTableChange = (pagination, filters, sorter) => {
    fetch({
      sortField: sorter.field,
      sortOrder: sorter.order,
      pagination,
      ...filters,
    });
  };

  const { Dragger } = Upload;

  // const dropimg = {
  //   name: 'file',
  //   multiple: true,
  //   action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  //   onChange(info) {
  //     const { status } = info.file;
  //     if (status !== 'uploading') {
  //       console.log(info.file, info.fileList);
  //     }
  //     if (status === 'done') {
  //       message.success(`${info.file.name} file uploaded successfully.`);
  //     } else if (status === 'error') {
  //       message.error(`${info.file.name} file upload failed.`);
  //     }
  //   },
  //   onDrop(e) {
  //     console.log('Dropped files', e.dataTransfer.files);
  //   },
  // };

  const [form] = Form.useForm();

  const onReset = () => {
    setActive(1)
    resetImagePreview()
    form.resetFields();
  };

  const fileUploadprops = {
    name: 'file',
    multiple: false,
    listType: 'text',
    maxCount: 1,
    action: "/api/upload/journal",
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
        setJournal_ori(res.data.data.list[0]._name)
        // setImageLandingPage(res.data.data.list[0]._name)
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
          setPreviewFile(info.file.url || info.file.preview)
          setPreviewVisibleFile(true)
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

  const imageUploadprops = {
    name: 'file',
    multiple: false,
    listType: 'text',
    maxCount: 1,
    action: "/api/upload/journal",
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
        // setJournal_ori(res.data.data.list[0]._name)
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
          setPreviewVisibleImage(true)
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
    setPreviewVisibleFile(false)
    setPreviewVisibleImage(false)
    setPreviewFile(null)
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
      indexMenu={"sub-1-7"}
      titlePage="เพิ่มวารสาร"
      _routes={[
        {
          path: '/admin/dashborad',
          breadcrumbName: 'หน้าหลัก',
        },
        {
          path: '/admin/management/journal',
          breadcrumbName: 'จัดการวารสาร',
        },
        {
          path: '/admin/management/journal/add-journal',
          breadcrumbName: 'เพิ่มวารสาร',
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
            name="journal_subject"
            label="ชื่อวารสาร :"
            className="block text-gray-700 text-sm font-bold mb-2 w-full"
            rules={[
              {
                required: true,
                message: 'กรุณากรอกชื่อวารสาร',
              },
            ]}
          >
            <TextArea
              id="#"
              type="text"
              placeholder="ชื่อวารสาร"
              className="resize-none border rounded-md"
              autoSize={{ minRows: 1, maxRows: 3 }}
            />
          </Form.Item>
          <Form.Item
            name="journal_ori"
            label="แนบไฟล์ :"
            className="block text-gray-700 text-sm font-bold mb-2 w-full"
            rules={[
              {
                required: true,
                message: 'กรุณากรอกเลือกเอกสาร',
              },
            ]}
          >
            <Dragger
              maxCount={1}
              // listType="picture"
              accept=".pdf"
              {...fileUploadprops}
            >

              {previewVisibleFile && <> <p className="ant-upload-drag-icon">
                <FilePdfTwoTone />
              </p>
                <p className="ant-upload-text">
                  อัพโหลดไฟล์เรียบร้อย<br />
                  คลิก หรือ ลากไฟล์มาที่บริเวณนี้เพื่ออัปโหลด
                </p>
              </>
              }
              {!previewVisibleFile && <>
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
            name="journal_detail"
            label="รายละเอียด :"
            className="block text-gray-700 text-sm font-bold mb-2 w-full"
            rules={[
              {
                required: true,
                message: 'กรุณากรอกรายละเอียดวารสาร',
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
            name="journal_img"
            label="ภาพปกวารสาร :"
            className="block text-gray-700 text-sm font-bold mb-2 w-full"
            rules={[
              {
                required: true,
                message: 'กรุณากรอกเลือกภาพปกวารสาร',
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

              {previewVisibleImage && <><Image
                // width={200}
                preview={false}
                src={previewImage}
              />
              </>
              }
              {!previewVisibleImage && <>
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
