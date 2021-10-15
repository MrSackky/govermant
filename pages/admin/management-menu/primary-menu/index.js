import { DragOutlined } from '@ant-design/icons';
// import UserNav from '../components/navigation/User';
import {
  Button,
  Empty,
  Input,
  List,
  Modal,
  notification,
  Spin,
  Tag,
  Typography
} from 'antd';
import React, { useEffect, useState } from 'react';
import ReactDragListView from 'react-drag-listview';
/* components */
import Layout from '../../../../components/layout/LayoutAdmin';
import ModalAddMenu from '../../../../components/managemnet/primary-menu/add-menu';
import ModalAddMenuSub from '../../../../components/managemnet/primary-menu/add-menu-sub';
import ModalEditMenu from '../../../../components/managemnet/primary-menu/edit-menu';
import ModalEditMenuSub from '../../../../components/managemnet/primary-menu/edit-menu-sub';
/* utils */
import { absoluteUrl, apiInstance } from '../../../../middleware/utils';

const { Text, Title } = Typography;

const { TextArea } = Input;

/*
  This example uses react-drag-listview, and AntDesign which can be found
  at their respective links below:
  https://github.com/raisezhang/react-drag-listview#readme
  https://ant.design/docs/react/introduce
*/

/* MOCK DATA: parent list as Value, subList as subList */
const mockData = [
  {
    id: 'category-one',
    value: 'Category One',
    subList: [
      'Eget odio bibendum commodo malesuada Mattis montes.',
      'Nullam at rhoncus. Erat pretium pharetra auctor.',
      'Justo sed interdum sociosqu a molestie nascetur nostra metus.',
    ],
  },
  {
    id: 'category-two',
    value: 'Category Two',
    subList: [
      'Senectus libero blandit consectetuer penatibus gravida quisque lacinia id nunc.',
      'Elit. Ac. Nulla justo nibh. Fringilla, class Tempor consequat proin.',
    ],
  },
];

export default function Home(props) {
  const [api, contextHolder] = notification.useNotification();
  const [menus, setMenus] = useState([]);
  const { user, origin } = props;
  const [login, setLogin] = useState(null);
  const [data, setData] = useState(mockData);
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

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async (params = {}) => {
    setLoading(true);
    // setVisibleEditModal(false)
    const menuData = await apiInstance().get(
      'menu?organization_id=' + (!user ? 0 : user.organization_id),
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
  /*
    REORDER ACCEPTS:
      list: arr, accepts array of data to be reordered,
      fromIndex: int, onDragStart index,
      toIndex: int, onDragEnd index,
  */

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  /*
    ON DRAG END EVENT HANDLER ACCEPTS:
      fromIndex: int, onDragStart index,
      toIndex: int, onDragEnd index,
      type: str, ReactDragListView Identifier,
      index: MUST be parent list index,
  */

  const onDragEnd = async (fromIndex, toIndex, type, index) => {
    setLoading(true);
    /* IGNORES DRAG IF OUTSIDE DESIGNATED AREA */
    if (toIndex < 0) return;

    /* REORDER PARENT OR SUBLIST, ELSE THROW ERROR */
    if (type === 'LIST-ITEM') {
      const _data = {
        menu_id: menus[fromIndex].menu_id,
        menu_seq: toIndex,
      };
      const menuData = await apiInstance().put('menu/reorder-menu', _data);

      const _dataRevert = {
        menu_id: menus[toIndex].menu_id,
        menu_seq: fromIndex,
      };
      const menuDataRevert = await apiInstance().put(
        'menu/reorder-menu',
        _dataRevert,
      );
      // console.log(menuDataRevert)
      return fetch();
      // const categories = reorder(data, fromIndex, toIndex);
      // return setData(categories);
    } else if (type === 'SUBLIST-ITEM') {
      console.log(' onDragEnd LIST-ITEM');
      console.log(fromIndex);
      console.log(toIndex);
      console.log(type);
      console.log(index);
      console.log(menus[index].menu_subs[fromIndex]);
      console.log(menus[index].menu_subs[toIndex]);
      const _data = {
        menu_sub_id: menus[index].menu_subs[fromIndex].menu_sub_id,
        menu_seq: toIndex,
      };
      const menuData = await apiInstance().put('menu/reorder-menu-sub', _data);

      const _dataRevert = {
        menu_sub_id: menus[index].menu_subs[toIndex].menu_sub_id,
        menu_seq: fromIndex,
      };
      const menuDataRevert = await apiInstance().put(
        'menu/reorder-menu-sub',
        _dataRevert,
      );

      // const subList = reorder(data[index].subList, fromIndex, toIndex);
      // const categories = JSON.parse(JSON.stringify(data));
      // categories[index].subList = subList;
      // return setData(categories);
      return fetch();
    } else return new Error('NOT A VALID LIST');
  };
  /*\
    nodeSelector={}, DRAGGABLE ELEMENT IDENTIFIER, i.e 'li', ant-list.draggable>
    ALL STYLES APPLIED TO lineClassName MUST BE OVERRIDDEN WITH !important
  */

  const onDelete = async value => {
    // console.log('DELETE')

    const registerData = await apiInstance().delete(
      'menu/' + dataDelete.menu_id,
      {},
    );
    if (registerData.data.status == 200) {
      openNotificationSuccess();
      // fetchOrganizationData();
      setVisibleModalDelete(false);
      fetch();
    } else {
      openNotificationFail(registerData.data.message);
    }
  };
  const onMenuSubDelete = async value => {
    // console.log('DELETE')

    const registerData = await apiInstance().delete(
      'menu-sub/' + dataDelete.menu_sub_id,
      {},
    );
    if (registerData.data.status == 200) {
      openNotificationSuccess();
      // fetchOrganizationData();
      setVisibleModalMenuSubDelete(false);
      fetch();
    } else {
      openNotificationFail(registerData.data.message);
    }
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

  return (
    <Layout
      title="Government - Admin management"
      url={origin}
      origin={origin}
      user={login}
      isMain={true}
      indexSubMenu={'2'}
      indexMenu={'sub-2-0'}
      titlePage={'เมนูหลัก'}
      _routes={[
        {
          path: '/admin/dashborad',
          breadcrumbName: 'หน้าหลัก',
        },
        {
          path: '',
          breadcrumbName: 'เมนูหลัก',
        },
      ]}
    >
      <div>
        {contextHolder}
        <ModalAddMenu fetch={fetch} user={user} />
        <ModalEditMenu
          _visible={visibleEditModal}
          hideEditModal={hideEditModal}
          fetch={fetch}
          user={user}
          dataEdit={dataEdit}
        />
        <ModalEditMenuSub
          _visible={visibleEditMenuSubModal}
          hideModal={hideEditMenuSubModal}
          fetch={fetch}
          user={user}
          dataEdit={dataEdit}
        />
        <ModalAddMenuSub
          _visible={visibleAddSubMenuModal}
          hideModal={hideSubMenuModal}
          fetch={fetch}
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
            {menus.length == 0 && <Empty />}
            {menus.map((obj, index) => (
              <List
                header={
                  <>
                    <Typography.Text strong className="grabbable">
                      <DragOutlined className="icon" />
                      {obj.menu_title}
                    </Typography.Text>
                    <Tag
                      color={obj.is_show == 1 ? 'success' : 'default'}
                      style={{ marginLeft: '10px', marginRight: '0px' }}
                    >
                      {obj.is_show == 1 ? 'ใช้งาน' : 'ไม่ใช้งาน'}
                    </Tag>
                    <Button
                      className="ml-2"
                      type="default"
                      onClick={() => {
                        onclikEditModal(true, obj);
                      }}
                    >
                      แก้ไข
                    </Button>
                    {obj.have_sub == 1 && (
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
                        เพิ่มเมนูย่อย
                      </Button>
                    )}
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
                  {obj.have_sub == 1 && (
                    <>
                      {obj.menu_subs.map((item, index2) => (
                        <List.Item key={index2} className="draggable-item">
                          <DragOutlined className="icon" />
                          <List.Item.Meta
                            title={item.menu_title}
                            className="grabbable"
                          />
                          <Tag
                            color={item.is_show == 1 ? 'success' : 'default'}
                            style={{ marginLeft: '10px', marginRight: '10px' }}
                          >
                            {item.is_show == 1 ? 'ใช้งาน' : 'ไม่ใช้งาน'}
                          </Tag>
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
                  )}
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
          คุณต้องการลบ "{dataDelete ? dataDelete.menu_title : ''}" หรือไม่?{' '}
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
          คุณต้องการลบ "{dataDelete ? dataDelete.menu_title : ''}" หรือไม่?{' '}
        </p>
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
