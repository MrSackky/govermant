import { FilePdfTwoTone, InboxOutlined } from '@ant-design/icons';
import {
  Button, Form, Image, notification, Row, Select,
  Switch, Typography, Upload
} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
// import UserNav from '../components/navigation/User';
import { useEffect, useRef, useState } from 'react';
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
  const [journalData, setJournalData] = useState(null);
  const [previewImage, setPreviewImage] = useState(null)
  const [imageLandingPage, setImageLandingPage] = useState(null)
  const [previewVisibleImage, setPreviewVisibleImage] = useState(false)
  const [previewFile, setPreviewFile] = useState(null)
  const [previewVisibleFile, setPreviewVisibleFile] = useState(false)
  const [journal_ori, setJournal_ori] = useState('')
  const [fields, setFields] = useState([
    {
      name: ['question_title'],
      value: '',
    },
  ]);
  const [api, contextHolder] = notification.useNotification();
  const router = useRouter();
  const { journalId } = router.query;
  const { Dragger } = Upload;
  const [date, setDate] = useState('');
  const [active, setActive] = useState(1);
  const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });
  const config = require('../../config');
  const editor = useRef(null);
  const [content, setContent] = useState('');

  const [acept, setAcept] = useState('');
  const acepted = () => {
    acept ? setAcept(0) : setAcept(1);
  };
  async function onSubmitHandler(value) {
    // console.log("value")
    // console.log(value)
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
    // console.log(data)
    const registerData = await apiInstance().put(
      '/journal/' + journalId,
      data,
    );
    if (registerData.data.status == 200) {
      openNotificationRegisterSuccess();
      fetchJournalData();
      setTimeout(
        function () {
          //Start the timer
          router.push('/admin/management/journal');
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
    fetchJournalData();
  }, []);

  const onResetForm = () => {
    setActive(journalData.is_use == 1 ? 1 : 0);
    setFields([
      {
        name: ['journal_subject'],
        value: journalData.journal_subject,
      },
      {
        name: ['journal_detail'],
        value: journalData.journal_detail,
      },
      {
        name: ['journal_file'],
        value: journalData.journal_file,
      },
      {
        name: ['journal_ori'],
        value: journalData.journal_ori,
      },
      {
        name: ['journal_img'],
        value: journalData.journal_img,
      },
      {
        name: ['is_show'],
        value: journalData.is_show,
      },
    ]);
  };
  const fetchJournalData = async () => {
    const _journalData = await apiInstance().get('journal/' + journalId);
    setJournalData(_journalData.data.journal)
    setPreviewImage(
      '..\\..\\..\\uploads\\c-' +
      user.organization_id +
      '\\journal\\' +
      _journalData.data.journal.journal_img,
    );
    setPreviewVisibleImage(true);
    setPreviewVisibleFile(true);
    setImageLandingPage(_journalData.data.journal.journal_img);
    setActive(_journalData.data.journal.is_show);
    setFields([
      {
        name: ['journal_subject'],
        value: _journalData.data.journal.journal_subject,
      },
      {
        name: ['journal_detail'],
        value: _journalData.data.journal.journal_detail,
      },
      {
        name: ['journal_file'],
        value: _journalData.data.journal.journal_file,
      },
      {
        name: ['journal_ori'],
        value: _journalData.data.journal.journal_ori,
      },
      {
        name: ['journal_img'],
        value: _journalData.data.journal.journal_img,
      },
      {
        name: ['is_show'],
        value: _journalData.data.journal.is_show,
      },
    ]);
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
  };

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
        'แก้ไขวารสาร ' +
        (journalData ? journalData.journal_subject : '')
      }
      url={origin}
      indexSubMenu={"1"}
      indexMenu={"sub-1-7"}
      origin={origin}
      props={props}
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
          path: '/admin/management/add-journal',
          breadcrumbName: 'แก้ไขวารสาร',
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
            // initialValues={{ email: email, invitationCode: code }}
            layout="vertical"
            onFinish={onSubmitHandler}
            // onFinishFailed={onFinishFailed}
            requiredMark={true}
            fields={fields}
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
            <div style={{ clear: 'both' }}></div>
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
            <div style={{ clear: 'both' }}></div>
            <Form.Item>
              {journalData && <>
                {journalData.journal_ori && <><div class="ant-upload-text-icon" style={{ float: 'left', marginRight: '2px' }}><span role="img" aria-label="paper-clip" class="anticon anticon-paper-clip"><svg viewBox="64 64 896 896" focusable="false" data-icon="paper-clip" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M779.3 196.6c-94.2-94.2-247.6-94.2-341.7 0l-261 260.8c-1.7 1.7-2.6 4-2.6 6.4s.9 4.7 2.6 6.4l36.9 36.9a9 9 0 0012.7 0l261-260.8c32.4-32.4 75.5-50.2 121.3-50.2s88.9 17.8 121.2 50.2c32.4 32.4 50.2 75.5 50.2 121.2 0 45.8-17.8 88.8-50.2 121.2l-266 265.9-43.1 43.1c-40.3 40.3-105.8 40.3-146.1 0-19.5-19.5-30.2-45.4-30.2-73s10.7-53.5 30.2-73l263.9-263.8c6.7-6.6 15.5-10.3 24.9-10.3h.1c9.4 0 18.1 3.7 24.7 10.3 6.7 6.7 10.3 15.5 10.3 24.9 0 9.3-3.7 18.1-10.3 24.7L372.4 653c-1.7 1.7-2.6 4-2.6 6.4s.9 4.7 2.6 6.4l36.9 36.9a9 9 0 0012.7 0l215.6-215.6c19.9-19.9 30.8-46.3 30.8-74.4s-11-54.6-30.8-74.4c-41.1-41.1-107.9-41-149 0L463 364 224.8 602.1A172.22 172.22 0 00174 724.8c0 46.3 18.1 89.8 50.8 122.5 33.9 33.8 78.3 50.7 122.7 50.7 44.4 0 88.8-16.9 122.6-50.7l309.2-309C824.8 492.7 850 432 850 367.5c.1-64.6-25.1-125.3-70.7-170.9z"></path></svg></span></div>
                  <a href={'/uploads/c-' + user.organization_id + '/journal/' + journalData.journal_ori} target='_blank'>{journalData.journal_ori}</a></>}
              </>}
            </Form.Item>
            <div style={{ clear: 'both' }}></div>
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
            <div style={{ clear: 'both' }}></div>
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
            <div style={{ clear: 'both' }}></div>
            <Form.Item className="flex mt-6">
              <div className="lg:inline-flex w-full">
                <div className="lg:inline-flex text-left w-1/2">
                  <Switch
                    className="swt-btn"
                    checked={active}
                    onClick={value => setActive(value ? 1 : 0)}
                  />
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
    </Layout >
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
