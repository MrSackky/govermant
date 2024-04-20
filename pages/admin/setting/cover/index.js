import { DragOutlined } from '@ant-design/icons';
import { Button, Image, Input, List, Modal, notification, Spin, Typography } from 'antd';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
// import UserNav from '../components/navigation/User';
import React, { useEffect, useState } from 'react';
import ReactDragListView from 'react-drag-listview';
/* components */
import Layout from '../../../../components/layout/LayoutAdmin';
import ModalAddMenu from '../../../../components/managemnet/cover-menu/add-menu';
import ModalEditMenu from '../../../../components/managemnet/cover-menu/edit-menu';
/* utils */
import {
  absoluteUrl,
  apiInstance
} from '../../../../middleware/utils';



const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });
const { Text, Title } = Typography;

const { TextArea } = Input;
const config = require('./../../config');

export default function Home(props) {
  const [api, contextHolder] = notification.useNotification();
  const { user, origin } = props;
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [visibleEditModal, setVisibleEditModal] = useState(false);
  const [dataEdit, setDataEdit] = useState(null);
  const [visibleModalDelete, setVisibleModalDelete] = useState(false)
  const [dataDelete, setDataDelete] = useState(null)


  useEffect(() => {
    fetchCoverData();
  }, []);


  const fetchCoverData = async () => {
    setLoading(true)
    const _pollQuestionData = await apiInstance().get('/covermenu?organization_id=' + (user ? user.organization_id : 0));
    console.log(_pollQuestionData)
    setQuestions(_pollQuestionData.data.results)
    setLoading(false)

  };

  const onDelete = async value => {
    // console.log('DELETE')

    const registerData = await apiInstance().delete(
      'covermenu/' + dataDelete.customer_headers,
      {},
    );
    if (registerData.data.status == 200) {
      openNotificationSuccess();
      // fetchOrganizationData();
      setVisibleModalDelete(false);
      fetchCoverData();
      // fetchPollQuestionData();
    } else {
      openNotificationFail(registerData.data.message);
    }
  };

  const onclikEditModal = (value, obj) => {
    // compareSync
    console.log('onclikEditModal');
    setDataEdit(obj);
    setVisibleEditModal(value);
  };


  const hideEditModal = (data) => {
    // setVisibleModalDelete(false)
    setVisibleEditModal(false);
    if (data.status == 200) {
      openNotificationSuccess();
    } else {
      openNotificationFail(data.message);
    }
    fetchCoverData();

  };

  const openNotificationSuccess = () => {
    api.success({
      message: `บันทึกมูลสำเร็จ`,
      description: 'บันทึกมูลสำเร็จ',
      placement: 'topRight',
    });
  };

  const openNotificationFail = messgae => {
    api.error({
      message: `พบปัญหาระหว่างการบันทึกข้อมูล`,
      description: messgae,
      placement: 'topRight',
    });
  };

  const showModal = (data) => {
    setDataDelete(data)
    setVisibleModalDelete(true)
  };


  const openNotificationDeleteSuccess = () => {
    api.success({
      message: `ลบข้อมูลสำเร็จ`,
      description: 'ลบข้อมูลสำเร็จ',
      placement: 'topRight',
    });
  };

  const onDeleteHeader = async () => {
    // console.log('DELETE')
    // const data = {
    //   'organization_name': value.organization_name,
    // }
    // console.log(data)
    const registerData = await apiInstance().delete('covermenu/' + dataDelete.header_id, {});
    if (registerData.data.status == 200) {
      openNotificationDeleteSuccess()
      // fetchOrganizationData();
      setVisibleModalDelete(false)
      fetchCoverData();

    } else {
      openNotificationFail(registerData.data.message)

    }
  }
  const hideModal = () => {
    setVisibleModalDelete(false)
  };


  const onDragEnd = async (fromIndex, toIndex, type, index) => {
    setLoading(true);
    /* IGNORES DRAG IF OUTSIDE DESIGNATED AREA */
    if (toIndex < 0) return;

    /* REORDER PARENT OR SUBLIST, ELSE THROW ERROR */
    if (type === 'LIST-ITEM') {
      const _data = {
        header_id: questions[fromIndex].header_id,
        seq: toIndex,
      };
      const menuData = await apiInstance().put('covermenu/reorder-menu', _data);

      const _dataRevert = {
        header_id: questions[toIndex].header_id,
        seq: fromIndex,
      };
      const menuDataRevert = await apiInstance().put(
        'covermenu/reorder-menu',
        _dataRevert,
      );
      // console.log(menuDataRevert)
      return fetchCoverData();
      // const categories = reorder(data, fromIndex, toIndex);
      // return setData(categories);
    } else if (type === 'SUBLIST-ITEM') {
      // console.log(' onDragEnd LIST-ITEM');
      // console.log(fromIndex);
      // console.log(toIndex);
      // console.log(type);
      // console.log(index);
      // console.log(menus[index].menu_subs[fromIndex]);
      // console.log(menus[index].menu_subs[toIndex]);
      // const _data = {
      //   menu_sub_id: menus[index].menu_subs[fromIndex].menu_sub_id,
      //   menu_seq: toIndex,
      // };
      // const menuData = await apiInstance().put('menu/reorder-menu-sub', _data);

      // const _dataRevert = {
      //   menu_sub_id: menus[index].menu_subs[toIndex].menu_sub_id,
      //   menu_seq: fromIndex,
      // };
      // const menuDataRevert = await apiInstance().put(
      //   'menu/reorder-menu-sub',
      //   _dataRevert,
      // );

      // // const subList = reorder(data[index].subList, fromIndex, toIndex);
      // // const categories = JSON.parse(JSON.stringify(data));
      // // categories[index].subList = subList;
      // // return setData(categories);
      // return fetch();
    } else return new Error('NOT A VALID LIST');
  };

  return (
    <Layout
      title="Government - Admin management"
      url={origin}
      origin={origin}
      // user={login}
      indexMenu={"sub-6-2"}
      indexSubMenu={"6"}
      titlePage="ส่วนหัวเว็บไซต์"
      _routes={[
        {
          path: '/admin/dashborad',
          breadcrumbName: 'หน้าหลัก',
        },
        {
          path: '/admin/setting/cover',
          breadcrumbName: 'ส่วนหัวเว็บไซต์',
        },
      ]}
    >
      {contextHolder}
      <link
        rel="stylesheet"
        href="https://unpkg.com/react-quill@1.3.3/dist/quill.snow.css"
      ></link>
      <div>
        <ModalAddMenu fetch={fetchCoverData} user={user} />
        <ModalEditMenu
          _visible={visibleEditModal}
          hideEditModal={hideEditModal}
          fetch={fetchCoverData}
          user={user}
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
            {/* {questions.length == 0 && <Empty />} */}
            {questions.map((obj, index) => (
              <List
                header={
                  <>
                    <Typography.Text strong className="grabbable ">
                      <DragOutlined className="icon" />

                      {/* {obj.header_image} */}
                      <Image
                        // width={200}
                        preview={false}
                        src={'..\\..\\..\\uploads\\c-' +
                          user.organization_id +
                          '\\cover\\' +
                          obj.header_image}

                        style={{
                          paddingRight: '5px'
                        }}
                      />
                      {obj.header_link && <>
                        <br /><span className="ml-8 ml-2 mb-4">[ <a href={obj.header_link} target='_blank'>{obj.header_link}</a> ]</span><br />
                      </>
                      }
                      <br />
                      <Button
                        className="ml-8 ml-2"
                        type="default"
                        onClick={() => {
                          onclikEditModal(true, obj);
                        }}
                      >
                        แก้ไข
                      </Button>

                      <Button
                        className="ml-2 mr-2"
                        type="danger"
                        onClick={() => showModal(obj)}
                      >
                        ลบ
                      </Button>
                    </Typography.Text>

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
                ></ReactDragListView>
              </List>
            ))}
          </ReactDragListView>
        </Spin>
      </div>
      <Modal
        title="คุณต้องการลบข้อมูลหรือไม่?"
        visible={visibleModalDelete}
        onOk={onDeleteHeader}
        onCancel={hideModal}
        okText="ลบ"
        cancelText="ยกเลิก"
        okButtonProps={{
          'type': "primary",
          'danger': true
        }}
      >
        <p>คุณต้องการลบ "{dataDelete ? dataDelete.header_image : ""}" หรือไม่?  </p>

      </Modal>

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
