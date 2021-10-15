import {
  Button, Col, Input, Modal,
  notification, Row, Table, Typography
} from 'antd';
import Link from 'next/link';
import Router from 'next/router';
// import UserNav from '../components/navigation/User';
import { useEffect, useState } from 'react';
/* components */
import Layout from '../../../../components/layout/LayoutAdmin';
/* utils */
import {
  absoluteUrl, apiInstance,
  convertDateDBtoDatePickerNoTime,
  convertDatetoThaiDate
} from '../../../../middleware/utils';

const { Text, Title } = Typography;

const { TextArea, Search } = Input;

export default function Home(props) {
  const [api, contextHolder] = notification.useNotification();
  const { user, origin } = props;
  const [login, setLogin] = useState(null);
  const [shouldRun, setShouldRun] = useState(true);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [visibleModalDelete, setVisibleModalDelete] = useState(false);
  const [dataDelete, setDataDelete] = useState(null);
  const [filters, setFilters] = useState(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const columns = [
    {
      title: 'วันที่สร้าง',
      dataIndex: '',
      sorter: true,
      key: 'date_created',
      render: data => (
        <>
          <span>
            {' '}
            {convertDatetoThaiDate(
              convertDateDBtoDatePickerNoTime(data.date_created),
            )}{' '}
          </span>
        </>
      ),
      // render: name => `${name.first} ${name.last}`,
      // width: '20%',
      // defaultSortOrder: 'descend',
    },
    {
      title: 'ชื่อลิงค์หน่วยงานที่เกี่ยวข้อง',
      dataIndex: 'banner_title',
      sorter: true,
      // render: name => `${name.first} ${name.last}`,
      // width: '20%',
      // defaultSortOrder: 'descend',
    },
    {
      title: '',
      dataIndex: '',
      key: 'x',
      render: data => (
        <>
          <Button
            type="primary"
            size={'default'}
            onClick={() => gotoPage(data.banner_id)}
          >
            {' '}
            แก้ไข{' '}
          </Button>
          <Button
            className="ml-1"
            type="danger"
            onClick={() => showModal(data)}
            size={'default'}
          >
            {' '}
            ลบ{' '}
          </Button>
        </>
      ),
    },
  ];
  const gotoPage = id => {
    console.log(id);
    Router.push('/admin/management/banner/' + id);
  };

  useEffect(() => {
    var _filters = [];
    pagination.filters = _filters;
    fetch({ pagination });
  }, []);

  const handleTableChange = (pagination, filters, sorter) => {
    console.log(sorter);
    setPagination({
      pageSize: pagination.pageSize,
      current: pagination.current,
    });
    setFilters(filters.package);
    fetch({
      sortField: sorter.columnKey,
      sortOrder: sorter.order,
      pagination,
      filters: filters.package,
    });
  };
  const onSearch = async _search => {
    setLoading(true);
    setSearch(_search);
    setPagination({
      pageSize: pagination.pageSize,
      current: 1,
    });
    const addactivitiesData = await apiInstance().get(
      'banner?organization_id=' +
      (user ? user.organization_id : 0) +
      '&results=' +
      pagination.pageSize +
      '&page=1&search=' +
      _search +
      '&filters=' +
      filters,
    );

    setData(addactivitiesData.data.results);
    setLoading(false);
  };
  const fetch = async (params = {}) => {
    setLoading(true);
    const addactivitiesData = await apiInstance().get(
      'banner?organization_id=' +
      (user ? user.organization_id : 0) +
      '&results=' +
      params.pagination.pageSize +
      '&page=' +
      params.pagination.current +
      '&search=' +
      search +
      '&sortField=' +
      params.sortField +
      '&sortOrder=' +
      params.sortOrder +
      '&filters=' +
      params.filters,
    );

    setData(addactivitiesData.data.results);
    setPagination({
      ...params.pagination,
      total: addactivitiesData.data.totalCount,
      // 200 is mock data, you should read it from server
      // total: data.totalCount,
    });
    setLoading(false);
  };

  const showModal = data => {
    console.log('data deleted');
    console.log(data);
    setDataDelete(data);
    setVisibleModalDelete(true);
  };

  const hideModal = () => {
    setVisibleModalDelete(false);
  };

  const onDeleteOrganization = async () => {
    // console.log('DELETE')
    // const data = {
    //   'organization_name': value.organization_name,
    // }
    // console.log(data)
    const registerData = await apiInstance().delete(
      'banner/' + dataDelete.banner_id,
      {},
    );
    if (registerData.data.status == 200) {
      openNotificationSuccess();
      // fetchOrganizationData();
      setVisibleModalDelete(false);
      fetch({ pagination });
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
      message: `พบปัญหาระหว่างการบันทึกข้อมูล`,
      description: messgae,
      placement: 'topRight',
    });
  };
  return (
    <Layout
      key={'home-banner'}
      titlePage={'จัดการลิงค์หน่วยงานที่เกี่ยวข้อง'}
      title="Government - Admin management"
      url={origin}
      origin={origin}
      isMain={true}
      indexSubMenu={'1'}
      indexMenu={'sub-1-3'}
      user={login}
      props={props}
      _routes={[
        {
          path: '/admin/dashborad',
          breadcrumbName: 'หน้าหลัก',
        },
        {
          path: '/admin/management/banner',
          breadcrumbName: 'จัดการลิงค์หน่วยงานที่เกี่ยวข้อง',
        },
      ]}
    >
      <div>
        {contextHolder}
        <Row>
          <Col span={24} className=" pb-1">
            <Row>
              <Col span={18} className="">
                <Row className="items-center">
                  <Link href="/admin/management/banner/add-banner">
                    <a
                      //onClick={(e) => handleLogout(e)}
                      className="lg:inline-flex lg:w-auto w-full px-2 py-2 rounded h-8 text-white bg-green-600 font-bold items-center justify-center hover:bg-green-600 hover:text-white"
                    >
                      เพิ่มลิงค์หน่วยงานที่เกี่ยวข้อง
                    </a>
                  </Link>
                </Row>
              </Col>
              <Col
                span={6}
                className="flex items-center justify-end justify-items-end"
              >
                <Row className=" justify-end justify-items-end ">
                  <Search
                    placeholder="input search text"
                    onSearch={onSearch}
                    enterButton
                    allowClear
                  />
                </Row>
              </Col>
              {/* <Col span={12} className="flex justify-items-end">
                    <div>

                  </Col> */}
            </Row>
          </Col>
        </Row>

        <Table
          columns={columns}
          rowKey={record => record.banner_id}
          dataSource={data}
          pagination={pagination}
          loading={loading}
          onChange={handleTableChange}
        />
      </div>

      <Modal
        title="คุณต้องการลบข้อมูลหรือไม่?"
        visible={visibleModalDelete}
        onOk={onDeleteOrganization}
        onCancel={hideModal}
        okText="ลบ"
        cancelText="ยกเลิก"
        okButtonProps={{
          type: 'primary',
          danger: true,
        }}
      >
        <p>
          คุณต้องการลบ "{dataDelete ? dataDelete.banner_title : ''}" หรือไม่?{' '}
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
