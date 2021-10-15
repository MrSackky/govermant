import { FilePdfTwoTone, InboxOutlined } from '@ant-design/icons';
import {
  Button, Form, notification, Row, Select,
  Switch, Typography, Upload
} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import axios from 'axios';
import moment from 'moment';
import { useRouter } from 'next/router';
// import UserNav from '../components/navigation/User';
import { useEffect, useState } from 'react';
import validator from 'validator';
/* components */
import Layout from '../../../../components/layout/LayoutAdmin';
/* utils */
import {
  absoluteUrl, apiInstance
} from '../../../../middleware/utils';

const { Text, Title } = Typography;
const { Option } = Select;

export default function Home(props) {
  const { user, origin } = props;
  const [url, setUrl] = useState('');
  const [documentsData, setDocumentsData] = useState(null);
  const [active, setActive] = useState(1);
  const [previewImage, setPreviewImage] = useState(null);
  const [imageLandingPage, setImageLandingPage] = useState(null);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [file_name_ori, setFile_name_ori] = useState('')
  const [fields, setFields] = useState([
    {
      name: ['file_subject'],
      value: '',
    },
  ]);
  const [api, contextHolder] = notification.useNotification();
  const router = useRouter();
  const { documentsId } = router.query;
  const { Dragger } = Upload;

  async function onSubmitHandler(value) {
    // console.log("value")
    // console.log(value)
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
    // console.log(data)
    const registerData = await apiInstance().put(
      '/documents/' + documentsId,
      data,
    );
    if (registerData.data.status == 200) {
      openNotificationRegisterSuccess();
      fetchDocumentsData();
      setTimeout(
        function () {
          //Start the timer
          router.push('/admin/management/documents');
        }.bind(this),
        2000,
      );
    } else {
      openNotificationRegisterFail(registerData.data.message);
    }
  }

  const openNotificationRegisterSuccess = () => {
    api.success({
      message: `บันทึกข้อมูลสำเร็จ`,
      description: 'บันทึกข้อมูลสำเร็จ',
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
  const validateURL = inputText => {
    setUrl(validator.trim(inputText));
  };

  useEffect(() => {
    fetchDocumentsData();
  }, []);

  const onResetForm = () => {
    setActive(documentsData.is_show == 1 ? 1 : 0);
    setFields([
      {
        name: ['file_subject'],
        value: documentsData.file_subject,
      },
      {
        name: ['file_url'],
        value: documentsData.file_url,
      },
      {
        name: ['file_name_ori'],
        value: documentsData.file_name_ori,
      },
      {
        name: ['is_show'],
        value: documentsData.is_show,
      },
    ]);
  };
  const fetchDocumentsData = async () => {
    const _documentsData = await apiInstance().get('documents/' + documentsId);
    setDocumentsData(_documentsData.data.documents)
    setActive(_documentsData.data.documents.is_show);
    setFields([
      {
        name: ['file_subject'],
        value: _documentsData.data.documents.file_subject,
      },
      {
        name: ['file_url'],
        value: _documentsData.data.documents.file_url,
      },
      {
        name: ['file_name_ori'],
        value: _documentsData.data.documents.file_name_ori,
      },
      {
        name: ['is_show'],
        value: _documentsData.data.documents.is_show,
      },
    ]);
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
        'แก้ไขเอกสาร ' + (documentsData ? documentsData.file_subject : '')
      }
      url={origin}
      indexSubMenu={"1"}
      indexMenu={"sub-1-5"}
      origin={origin}
      props={props}
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
          path: '/admin/management/add-documents',
          breadcrumbName: 'แก้ไขเอกสาร',
        },
      ]}
    >
      <div>
        {contextHolder}
        {/* {JSON.stringify(organizationData)} */}
        <Row>
          {/* {JSON.stringify(organizationData)} */}
          <Form
            name="basic"
            className="w-full"
            layout="vertical"
            onFinish={onSubmitHandler}
            requiredMark={true}
            fields={fields}
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
            <div style={{ clear: 'both' }}></div>

            <Form.Item
              name="file_name"
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
            <div style={{ clear: 'both' }}></div>
            <hr
              style={{
                backgroundColor: 'black',
                height: 2,
                width: '100%',
              }}
            />
            <p>หรือ Download จาก url</p>
            <div style={{ clear: 'both' }}></div>
            <Form.Item
              name="file_url"
              label="ที่อยู่ url :"
              className="block text-gray-700 text-sm font-bold mb-2 w-full"
              rules={[
                {
                  required: true,
                  message: 'กรุณากรอกที่อยู่ url ของเอกสาร',
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
            <div style={{ clear: 'both' }}></div>
            <Form.Item className="flex mt-6">
              <div className="lg:inline-flex w-full">
                <div className="lg:inline-flex text-left w-1/2">
                  <Switch
                    className="swt-btn"
                    checked={active}
                    onClick={value => setActive(value ? 1 : 0)}
                  />
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
