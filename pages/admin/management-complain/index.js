import { Button, Input, notification, Table, Typography } from 'antd';
import Router from 'next/router';
// import UserNav from '../components/navigation/User';
import { useEffect, useState } from 'react';
/* components */
import Layout from '../../../components/layout/LayoutAdmin';
/* utils */
import {
  absoluteUrl,
  apiInstance,
  convertDateDBtoDatePickerNoTime,
  convertDatetoThaiDate
} from '../../../middleware/utils';

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
      title: 'วันที่',
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
    },
    {
      title: 'ผู้ร้องทุกข์',
      dataIndex: 'complain_name_posted',
      sorter: true,
    },
    {
      title: 'หัวข้อร้องทุกข์',
      dataIndex: 'complain_post',
      sorter: true,
    },
    {
      title: 'สถานะดำเนินการ',
      dataIndex: '',
      sorter: true,
      key: 'is_done',
      render: data => <>
        <span>
          {data.is_done == '1' ? "ดำเนินการแล้ว" : "ยังไม่ได้ดำเนินการ"}
        </span>
      </>,
    },
    {
      title: '',
      dataIndex: '',
      key: 'x',
      render: data => (
        <>
          <Button size={'default'} onClick={() => gotoPage(data.complain_id)}>
            {' '}
            รายละเอียด{' '}
          </Button>
        </>
      ),
    },
  ];
  const gotoPage = id => {
    console.log(id);
    Router.push('/admin/management-complain/' + id);
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
      'complain?organization_id=' +
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
      'complain?organization_id=' +
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
      'complain/' + dataDelete.complain_id,
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
      key={'home-complain'}
      titlePage={'จัดการข้อมูลเมนูร้องทุกข์'}
      title="Government - Admin management"
      url={origin}
      origin={origin}
      isMain={true}
      indexMenu={'3'}
      user={login}
      props={props}
      _routes={[
        {
          path: '/admin/dashborad',
          breadcrumbName: 'หน้าหลัก',
        },
        {
          path: '/admin/management-complain',
          breadcrumbName: 'จัดการข้อมูลเมนูร้องทุกข์',
        },
      ]}
    >
      <div>
        {contextHolder}
        <Table
          columns={columns}
          rowKey={record => record.complain_id}
          dataSource={data}
          pagination={pagination}
          loading={loading}
          onChange={handleTableChange}
        />
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
