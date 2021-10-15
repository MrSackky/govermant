import { FilePdfTwoTone, InboxOutlined } from '@ant-design/icons';
import {
  Button, Form, Input, notification, Switch, Typography, Upload
} from 'antd';
import axios from 'axios';
import { useRouter } from 'next/router';
// import UserNav from '../components/navigation/User';
import React, { useEffect, useState } from 'react';
/* components */
import Layout from '../../../../components/layout/LayoutAdmin';
/* utils */
import {
  absoluteUrl, apiInstance
} from '../../../../middleware/utils';



const { Text, Title } = Typography;

const { TextArea } = Input;

export default function Home(props) {
  const [api, contextHolder] = notification.useNotification();
  const { user, origin } = props;
  const [previewImage, setPreviewImage] = useState(null)
  const [previewVisible, setPreviewVisible] = useState(false)
  const [file_name_ori, setFile_name_ori] = useState('')

  const router = useRouter();


  useEffect(() => {
  }, []);

  const [active, setActive] = useState(1);
  const actived = () => {
    active ? setActive(0) : setActive(1);
  };

  async function onSubmitHandler(value) {
    const data = {
      organization_id: user.organization_id,
      file_name: value.file_subject,
      file_name_ori: file_name_ori,
      file_subject: value.file_subject,
      file_url: value.file_url ? value.file_url : "",
      is_show: active,
      download: '0',
      is_deleted: '0'
    };

    const addactivitiesData = await apiInstance().post(
      'admin/management/add-documents',
      data,
    );
    if (addactivitiesData.data.status == 200) {
      openNotificationRegisterSuccess();
      setTimeout(function () { //Start the timer
        router.push('/admin/management/documents')
      }.bind(this), 2000)
    } else {
      openNotificationRegisterFail(addactivitiesData.data.message);
    }
  }



  const openNotificationRegisterSuccess = () => {
    api.success({
      message: `เพิ่มเอกสารสำเร็จ`,
      description: 'เพิ่มเอกสารแล้ว',
      placement: 'topRight',
    });
  };

  const openNotificationRegisterFail = messgae => {
    api.error({
      message: `พบปัญหาระหว่างการเพิ่มเอกสาร`,
      description: messgae,
      placement: 'topRight',
    });
  };


  const { Dragger } = Upload;

  const [form] = Form.useForm();

  const onReset = () => {
    setActive(1)
    form.resetFields();
  };

  const imageUploadprops = {
    name: 'file',
    multiple: false,
    listType: 'text',
    maxCount: 1,
    action: "/api/upload/documents",
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
        setFile_name_ori(res.data.data.list[0]._name)
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
      titlePage={
        'เพิ่มเอกสาร'
      }
      url={origin}
      indexMenu={'2'}
      origin={origin}
      props={props}
      indexSubMenu={"1"}
      indexMenu={"sub-1-5"}
      titlePage="จัดการคลังเอกสาร"
      _routes={[
        {
          path: '/admin/dashborad',
          breadcrumbName: 'หน้าหลัก',
        },
        {
          path: '/admin/management/documents',
          breadcrumbName: 'จัดการคลังเอกสาร',
        },
        {
          path: '/admin/management/documents/add-documents',
          breadcrumbName: 'เพิ่มเอกสาร',
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
        >
          <Form.Item
            name="file_subject"
            label="ชื่อเอกสาร :"
            className="block text-gray-700 text-sm font-bold mb-2 w-full"
            rules={[
              {
                required: true,
                message: 'กรุณากรอกชื่อเอกสาร',
              },
            ]}
          >
            <TextArea
              id="#"
              type="text"
              placeholder="ชื่อเอกสาร"
              className="resize-none border rounded-md"
              autoSize={{ minRows: 1, maxRows: 3 }}
            />
          </Form.Item>
          <Form.Item
            name="file_name"
            label="แนบไฟล์ :"
            className="block text-gray-700 text-sm font-bold mb-2 w-full"
          // rules={[
          //   {
          //     required: true,
          //     message: 'กรุณากรอกเลือกเอกสาร',
          //   },
          // ]}
          >
            <Dragger
              maxCount={1}
              // listType="picture"
              accept=".pdf"
              {...imageUploadprops}
            >

              {previewVisible && <> <p className="ant-upload-drag-icon">
                <FilePdfTwoTone />
              </p>
                <p className="ant-upload-text">
                  อัพโหลดไฟล์เรียบร้อย<br />
                  คลิก หรือ ลากไฟล์มาที่บริเวณนี้เพื่ออัปโหลด
                </p>
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
          <hr
            style={{
              backgroundColor: '#C4C4C4',
              height: 2,
              width: '100%',
            }}
          />
          <br /><p>หรือ Download จาก url</p>
          <Form.Item
            name="file_url"
            label="ที่อยู่ url :"
            className="block text-gray-700 text-sm font-bold mb-2 w-full"
          // rules={[
          //   {
          //     required: true,
          //     message: 'กรุณากรอกที่อยู่ url ของเอกสาร',
          //   },
          // ]}
          >
            <TextArea
              id="#"
              type="text"
              placeholder="ที่อยู่ url"
              className="resize-none border rounded-md"
              autoSize={{ minRows: 1, maxRows: 3 }}
            />
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
