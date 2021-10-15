import { DragOutlined } from '@ant-design/icons';
import {
  Button,
  DatePicker,
  Empty,
  Form, List, Modal,
  notification,
  Row,
  Select,
  Spin,
  Switch,
  Typography,
  Upload
} from 'antd';
import moment from 'moment';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
// import UserNav from '../components/navigation/User';
import { useEffect, useRef, useState } from 'react';
import ReactDragListView from 'react-drag-listview';
/* components */
import Layout from '../../../../components/layout/LayoutAdmin';
import ModalAddMenu from '../../../../components/managemnet/poll-menu/add-menu';
import ModalAddMenuSub from '../../../../components/managemnet/poll-menu/add-menu-sub';
import ModalEditMenu from '../../../../components/managemnet/poll-menu/edit-menu';
import ModalEditMenuSub from '../../../../components/managemnet/poll-menu/edit-menu-sub';
/* utils */
import {
  absoluteUrl,
  apiInstance,
  convertDateDBtoDatePickerWithTime
} from '../../../../middleware/utils';


const { Text, Title } = Typography;
const { Option } = Select;
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });
const config = require('./../../config');

export default function Home(props) {
  const editor = useRef(null);
  const [content, setContent] = useState('');
  const { user, origin } = props;
  const [url, setUrl] = useState('');
  const [pollData, setPollData] = useState(null);
  const [menus, setMenus] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataDelete, setDataDelete] = useState(null);
  const [dataEdit, setDataEdit] = useState(null);
  const [visibleModalDelete, setVisibleModalDelete] = useState(false);
  const [visibleEditModal, setVisibleEditModal] = useState(false);
  const [visibleEditMenuSubModal, setVisibleEditMenuSubModal] = useState(false);
  const [visibleAddSubMenuModal, setVisibleAddSubMenuModal] = useState(false);
  const [visibleModalMenuSubDelete, setVisibleModalMenuSubDelete] = useState(
    false,
  );
  const [fields, setFields] = useState([
    {
      name: ['poll_title'],
      value: '',
    },
  ]);
  const [api, contextHolder] = notification.useNotification();
  const router = useRouter();
  const { pollId } = router.query;
  const { Dragger } = Upload;
  const [date, setDate] = useState('');
  const [active, setActive] = useState(1);
  const [form] = Form.useForm();

  async function onSubmitHandler(value) {
    var date_s_Str = moment(value.poll_date_s).format();
    var date_e_Str = moment(value.poll_date_e).format();
    const data = {
      poll_title: value.poll_title,
      poll_date_s: date_s_Str,
      poll_detail: value.poll_detail,
      poll_date_e: date_e_Str,
      is_identity: active,
    };
    // console.log(data)
    const registerData = await apiInstance().put('/poll/' + pollId, data);
    if (registerData.data.status == 200) {
      openNotificationRegisterSuccess();
      fetchPollData();
      setTimeout(
        function () {
          //Start the timer
          router.push('/admin/management/polls');
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

  const onDelete = async value => {
    // console.log('DELETE')

    const registerData = await apiInstance().delete(
      'pollmenu/' + dataDelete.poll_questions_id,
      {},
    );
    if (registerData.data.status == 200) {
      openNotificationSuccess();
      // fetchOrganizationData();
      setVisibleModalDelete(false);
      fetch();
      fetchPollQuestionData();
    } else {
      openNotificationFail(registerData.data.message);
    }
  };

  const onMenuSubDelete = async value => {
    // console.log('DELETE')

    const registerData = await apiInstance().delete(
      'pollmenu/poll-option/' + dataDelete.poll_option_id,
      {},
    );
    if (registerData.data.status == 200) {
      openNotificationSuccess();
      // fetchOrganizationData();
      setVisibleModalMenuSubDelete(false);
      fetch();
      fetchPollQuestionData();
    } else {
      openNotificationFail(registerData.data.message);
    }
  };

  const fetch = async (params = {}) => {
    setLoading(true);
    // setVisibleEditModal(false)
    const menuData = await apiInstance().get(
      'pollmenu?organization_id=' + (!user ? 0 : user.organization_id),
    );
    console.log(menuData);
    setMenus(menuData.data.results);
    setTimeout(
      function () {
        //Start the timer
        setLoading(false);
      }.bind(this),
      800,
    );
  };

  const hideModal = () => {
    setVisibleModalDelete(false);
  };

  const hideMenuSubModal = () => {
    setVisibleModalMenuSubDelete(false);
  };

  const showModal = data => {
    console.log('data deletd');
    console.log(data);
    setDataDelete(data);
    setVisibleModalDelete(true);
  };
  const showDeletMenuSubModal = data => {
    console.log('data deletd');
    console.log(data);
    setDataDelete(data);
    setVisibleModalMenuSubDelete(true);
  };

  const onclikEditModal = (value, obj) => {
    // compareSync
    console.log('onclikEditModal');
    setDataEdit(obj);
    setVisibleEditModal(value);
  };

  const onclikEditMenuSubModal = (value, obj) => {
    // compareSync
    setDataEdit(obj);
    setVisibleEditMenuSubModal(value);
  };

  const onclikAddSubMenuModal = (value, obj) => {
    // compareSync
    console.log('onclikEditModal');
    setDataEdit(obj);
    setVisibleAddSubMenuModal(value);
  };

  const hideEditModal = () => {
    // setVisibleModalDelete(false)
    setVisibleEditModal(false);
  };
  const hideSubMenuModal = () => {
    // setVisibleModalDelete(false)
    setVisibleAddSubMenuModal(false);
  };
  const hideEditMenuSubModal = () => {
    // setVisibleModalDelete(false)
    setVisibleEditMenuSubModal(false);
  };


  useEffect(() => {
    fetchPollData();
    fetchPollQuestionData();
  }, []);

  const onResetForm = () => {
    setActive(pollData.is_use == 1 ? 1 : 0);
    setFields([
      {
        name: ['poll_title'],
        value: pollData.poll_title,
      },
      {
        name: ['poll_date_s'],

        value: moment(
          convertDateDBtoDatePickerWithTime(pollData.data.poll.poll_date_s),
        ),
      },
      {
        name: ['poll_date_e'],

        value: moment(
          convertDateDBtoDatePickerWithTime(pollData.data.poll.poll_date_e),
        ),
      },
      {
        name: ['poll_detail'],
        value: pollData.poll_detail,
      },
      {
        name: ['is_identity'],
        value: pollData.is_identity,
      },
    ]);
  };
  const fetchPollQuestionData = async () => {
    setLoading(true)
    const _pollQuestionData = await apiInstance().get('pollmenu/' + pollId);
    console.log(_pollQuestionData)
    setQuestions(_pollQuestionData.data.pollQuestions)
    setLoading(false)

  };
  const fetchPollData = async () => {
    const _pollData = await apiInstance().get('poll/' + pollId);
    console.log(_pollData.data.poll.poll_date_s);
    console.log(_pollData.data.poll.poll_date_e);
    console.log(
      convertDateDBtoDatePickerWithTime(_pollData.data.poll.poll_date_s),
    );
    console.log(
      convertDateDBtoDatePickerWithTime(_pollData.data.poll.poll_date_e),
    );
    setActive(_pollData.data.poll.is_identity);
    setFields([
      {
        name: ['poll_title'],
        value: _pollData.data.poll.poll_title,
      },
      {
        name: ['poll_date_s'],
        value: moment(
          convertDateDBtoDatePickerWithTime(_pollData.data.poll.poll_date_s),
        ),
      },
      {
        name: ['poll_date_e'],
        value: moment(
          convertDateDBtoDatePickerWithTime(_pollData.data.poll.poll_date_e),
        ),
      },
      {
        name: ['poll_detail'],
        value: _pollData.data.poll.poll_detail,
      },
      {
        name: ['is_identity'],
        value: _pollData.data.poll.is_identity,
      },
    ]);
  };

  function onChange(value, dateString) {
    // console.log('Selected Time: ', value);
    // console.log('Formatted Selected Time: ', dateString);
    setDate(dateString);
  }

  const onDragEnd = async (fromIndex, toIndex, type, index) => {
    setLoading(true);
    /* IGNORES DRAG IF OUTSIDE DESIGNATED AREA */
    if (toIndex < 0) return;

    /* REORDER PARENT OR SUBLIST, ELSE THROW ERROR */
    if (type === 'LIST-ITEM') {
      const _data = {
        menu_id: questions[fromIndex].poll_questions_id,
        menu_seq: toIndex,
      };
      const menuData = await apiInstance().put('pollmenu/reorder-menu', _data);

      const _dataRevert = {
        menu_id: questions[toIndex].poll_questions_id,
        menu_seq: fromIndex,
      };
      const menuDataRevert = await apiInstance().put(
        'pollmenu/reorder-menu',
        _dataRevert,
      );
      // console.log(menuDataRevert)
      return fetchPollQuestionData();
      // const categories = reorder(data, fromIndex, toIndex);
      // return setData(categories);
    } else if (type === 'SUBLIST-ITEM') {
      const _data = {
        menu_id: questions[index].options[fromIndex].poll_option_id,
        menu_seq: toIndex,
      };
      const menuData = await apiInstance().put('pollmenu/reorder-menu-options', _data);

      const _dataRevert = {
        menu_id: questions[index].options[toIndex].poll_option_id,
        menu_seq: fromIndex,
      };
      const menuDataRevert = await apiInstance().put(
        'pollmenu/reorder-menu-options',
        _dataRevert,
      );
      return fetchPollQuestionData();
    } else return new Error('NOT A VALID LIST');
  };

  const openNotificationSuccess = () => {
    api.success({
      message: `ลบข้อมูลสำเร็จ`,
      description: 'ลบข้อมูลสำเร็จ',
      placement: 'topRight',
    });
  };

  const openNotificationFail = messgae => {
    api.error({
      message: `พบปัญหาระหว่างการลบข้อมูล`,
      description: messgae,
      placement: 'topRight',
    });
  };

  return (
    <Layout
      title="Government - Admin management"
      titlePage={
        'แก้ไขแบบสำรวจความคิดเห็น ' + (pollData ? pollData.poll_title : '')
      }
      url={origin}
      indexSubMenu={'1'}
      indexMenu={'sub-1-6'}
      titlePage="แก้ไขแบบสำรวจความคิดเห็น"
      _routes={[
        {
          path: '/admin/dashborad',
          breadcrumbName: 'หน้าหลัก',
        },
        {
          path: '/admin/management/polls',
          breadcrumbName: 'จัดการแบบสำรวจความคิดเห็น',
        },
        {
          path: '/admin/management/polls/add-poll',
          breadcrumbName: 'แก้ไขแบบสำรวจความคิดเห็น',
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
            form={form}
          >
            <Form.Item
              name="poll_title"
              label="ชื่อแบบสำรวจ"
              className="block text-gray-700 text-sm font-bold mb-2 w-full form-organization"
              rules={[
                {
                  required: true,
                  message: 'กรุณากรอกชื่อแบบสำรวจ',
                },
              ]}
            >
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="#"
                type="text"
                placeholder="ชื่อแบบสำรวจ"
              />
            </Form.Item>
            <div style={{ clear: 'both' }}></div>
            <Form.Item
              name="poll_detail"
              label="คำอธิบายแบบสำรวจ"
              className="block text-gray-700 text-sm font-bold mb-2 w-full form-organization"
              style={{ textAlign: 'left !important' }}
              rules={[
                {
                  required: true,
                  message: 'กรุณากรอกคำอธิบายแบบสำรวจ',
                },
              ]}
            >
              <JoditEditor
                ref={editor}
                value={content}
                config={config.config(user)}
                height={'700px'}
                tabIndex={1} // tabIndex of textarea
                onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                onChange={newContent => { }}
              />
            </Form.Item>
            <div style={{ clear: 'both' }}></div>
            <Form.Item
              name="poll_date_s"
              label="วันที่เปิดให้แสดงความคิดเห็น"
              className="block text-gray-700 text-sm font-bold mb-2 w-full form-organization"
              style={{ textAlign: 'left !important' }}
              rules={[
                {
                  required: true,
                  message: 'กรุณากรอกเลือกวันที่เปิดให้แสดงความคิดเห็น',
                },
              ]}
            >
              {/* <DatePicker
                format="YYYY-MM-DD HH:mm:ss"
                showTime={{ format: 'HH:mm:ss' }}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              // showTime={{ defaultValue: moment('00:00:00') }}
              /> */}
              <DatePicker
                className="w-full"
                showTime
                onChange={onChange}
                style={{
                  width: '100%',
                }}
              />
            </Form.Item>
            <div style={{ clear: 'both' }}></div>
            <Form.Item
              name="poll_date_e"
              label="วันที่ปิดให้แสดงความคิดเห็น"
              className="block text-gray-700 text-sm font-bold mb-2 w-full form-organization"
              style={{ textAlign: 'left !important' }}
              rules={[
                {
                  required: true,
                  message: 'กรุณากรอกเลือกวันที่ปิดให้แสดงความคิดเห็น',
                },
              ]}
            >
              {/* <DatePicker
                format="YYYY-MM-DD HH:mm:ss"
                showTime={{ format: 'HH:mm:ss' }}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              // showTime={{ defaultValue: moment('00:00:00') }}
              /> */}
              <DatePicker
                className="w-full"
                showTime
                onChange={onChange}
                style={{
                  width: '100%',
                }}
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
            <div>
              <ModalAddMenu fetch={fetch} user={user} pollId={pollId} fetchPollQuestionData={fetchPollQuestionData} />
              <ModalEditMenu
                _visible={visibleEditModal}
                hideEditModal={hideEditModal}
                fetch={fetchPollQuestionData}
                user={user}
                dataEdit={dataEdit}
              />
              <ModalEditMenuSub
                _visible={visibleEditMenuSubModal}
                hideModal={hideEditMenuSubModal}
                fetch={fetchPollQuestionData}
                dataEdit={dataEdit}
              />
              <ModalAddMenuSub
                _visible={visibleAddSubMenuModal}
                hideModal={hideSubMenuModal}
                fetch={fetchPollQuestionData}
                dataEdit={dataEdit}
              />
              <Spin spinning={loading}>
                <ReactDragListView
                  nodeSelector=".ant-list.draggable"
                  lineClassName="dragLine"
                  onDragEnd={(fromIndex, toIndex) =>
                    onDragEnd(fromIndex, toIndex, 'LIST-ITEM')
                  }
                >
                  {questions.length == 0 && <Empty />}
                  {questions.map((obj, index) => (
                    <List
                      header={
                        <>
                          <Typography.Text strong className="grabbable">
                            <DragOutlined className="icon" />
                            {obj.poll_questions_title}
                          </Typography.Text>
                          <Button
                            className="ml-2"
                            type="default"
                            onClick={() => {
                              onclikEditModal(true, obj);
                            }}
                          >
                            แก้ไข
                          </Button>

                          <Button
                            style={{
                              backgroundColor: '#059669',
                              color: 'white',
                              borderColor: '#059669',
                            }}
                            onClick={() => {
                              onclikAddSubMenuModal(true, obj);
                            }}
                            className="ml-2"
                            type="success"
                          >
                            เพิ่มตัวเลือก
                          </Button>

                          <Button
                            className="ml-2"
                            type="danger"
                            onClick={() => showModal(obj)}
                          >
                            ลบ
                          </Button>
                        </>
                      }
                      key={index}
                      className="draggable"
                    >
                      <ReactDragListView
                        nodeSelector=".ant-list-item.draggable-item"
                        lineClassName="dragLine"
                        onDragEnd={(fromIndex, toIndex) =>
                          onDragEnd(fromIndex, toIndex, 'SUBLIST-ITEM', index)
                        }
                      >
                        <>
                          {obj.options.map((item, index2) => (
                            <List.Item
                              key={index2}
                              className="draggable-item"
                            >
                              <DragOutlined className="icon" />
                              <List.Item.Meta
                                title={item.poll_options_name + " ( " + item.poll_options_score + " ) | จำนวนผู้เลือกตัวเลือกนี้ ( " + item.poll_option_total_score + " )"}
                                className="grabbable"
                              />
                              <Button
                                className="mr-1"
                                type="default"
                                onClick={() => {
                                  onclikEditMenuSubModal(true, item);
                                }}
                              >
                                แก้ไข
                              </Button>
                              <Button
                                className="mr-2"
                                type="danger"
                                onClick={() => showDeletMenuSubModal(item)}
                              >
                                ลบ
                              </Button>
                            </List.Item>
                          ))}
                        </>
                      </ReactDragListView>
                    </List>
                  ))}
                </ReactDragListView>
              </Spin>
            </div>

            <Modal
              title="คุณต้องการลบข้อมูลหรือไม่?"
              visible={visibleModalDelete}
              onOk={onDelete}
              onCancel={hideModal}
              okText="ลบ"
              cancelText="ยกเลิก"
              okButtonProps={{
                type: 'primary',
                danger: true,
              }}
            >
              <p>
                คุณต้องการลบ "
                {dataDelete ? dataDelete.poll_questions_title : ''}" หรือไม่?{' '}
              </p>
            </Modal>

            <Modal
              title="คุณต้องการลบข้อมูลหรือไม่?"
              visible={visibleModalMenuSubDelete}
              onOk={onMenuSubDelete}
              onCancel={hideMenuSubModal}
              okText="ลบ"
              cancelText="ยกเลิก"
              okButtonProps={{
                type: 'primary',
                danger: true,
              }}
            >
              <p>
                คุณต้องการลบ "
                {dataDelete ? dataDelete.poll_options_name : ''}" หรือไม่?{' '}
              </p>
            </Modal>
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
