import Link from 'next/link';
import Router, { useRouter } from 'next/router';
/* utils */
import { absoluteUrl, checkIsLogin, apiInstance, convertDateDBtoDatePickerNoTime, convertDatetoThaiDate } from '../../../middleware/utils';

/* components */
import Layout from '../../../components/layout/LayoutAdmin';
// import UserNav from '../components/navigation/User';
import { useEffect, useState } from 'react'

import {
  Carousel,
  Row,
  Col,
  Typography,
  Image,
  Button,
  Input,
  Card,
  notification,
  Table,
  Modal
} from 'antd';
const { Search } = Input;

export default function Home(props) {
  const { user, origin } = props;
  const [login, setLogin] = useState(null)
  const [api, contextHolder] = notification.useNotification();
  const [search, setSearch] = useState("")
  const [data, setData] = useState([])
  const [dataDelete, setDataDelete] = useState(null)
  const [filters, setFilters] = useState(null)
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  })
  const [loading, setLoading] = useState(false)
  const [visibleModalDelete, setVisibleModalDelete] = useState(false)
  const columns = [
    {
      title: 'ชื่อ landing page',
      dataIndex: 'intro_title',
      sorter: true,
      // render: name => `${name.first} ${name.last}`,
      // width: '20%',
      // defaultSortOrder: 'descend',
    },
    {
      title: 'ช่วงเวลาที่แสดง',
      dataIndex: '',
      sorter: true,
      key: 'intro_date_s',
      render: (data) => <>
        <span > {convertDatetoThaiDate(convertDateDBtoDatePickerNoTime(data.intro_date_s))} ถึง {convertDatetoThaiDate(convertDateDBtoDatePickerNoTime(data.intro_date_e))}</span>
      </>,
      // render: name => `${name.first} ${name.last}`,
      // width: '20%',
      // defaultSortOrder: 'descend',
    },
    {
      title: 'สถานะการใช้งาน',
      dataIndex: '',
      sorter: true,
      key: 'is_use',
      render: (data) => <>
        <span > {data.is_use ? "ใช้งาน" : "ไม่ใช้งาน"}</span>
      </>,
      // render: name => `${name.first} ${name.last}`,
      // width: '20%',
      // defaultSortOrder: 'descend',
    },
    {
      title: '',
      dataIndex: '',
      key: 'x',
      render: (data) => <>
        <Button type="primary" size={"default"} onClick={() => gotoPage(data.intro_id)} > แก้ไข </Button>
        <Button className="ml-1" type="danger" onClick={() => showModal(data)} size={"default"} > ลบ </Button>
      </>,
    },
    // {
    //   title: 'Gender',
    //   dataIndex: 'gender',
    //   // filters: [
    //   //   { text: 'Male', value: 'male' },
    //   //   { text: 'Female', value: 'female' },
    //   // ],
    //   width: '20%',
    // },
    // {
    //   title: 'Email',
    //   dataIndex: 'email',
    // },
  ];

  useEffect(() => {
    fetch({ pagination });
  }, [])

  const fetch = async (params = {}) => {
    setLoading(true)
    const addactivitiesData = await apiInstance().get(
      'admin/management/landing-page?isAdmin=1&results=' + params.pagination.pageSize + '&page=' + params.pagination.current + "&search=" + search + "&sortField=" + params.sortField + "&sortOrder=" + params.sortOrder + "&filters=" + params.filters
    );

    setData(addactivitiesData.data.results)
    setPagination({
      ...params.pagination,
      total: addactivitiesData.data.totalCount,
      // 200 is mock data, you should read it from server
      // total: data.totalCount,
    })
    setLoading(false)
  };

  const showModal = (data) => {
    console.log('data deletd')
    console.log(data)
    setDataDelete(data)
    setVisibleModalDelete(true)
  };

  const gotoPage = (id) => {
    Router.push('/admin/management-auto-landingpage/landing-page/' + id);

  };

  const onSearch = async (_search) => {
    setLoading(true)
    setSearch(_search)
    setPagination({
      pageSize: pagination.pageSize,
      current: 1
    })
    const anding_pageData = await apiInstance().get(
      'admin/management/landing-page?isAdmin=1&results=' + pagination.pageSize + '&page=1&search=' + _search + "&filters=" + filters
    );

    setData(anding_pageData.data.results)
    setLoading(false)
  }

  const handleTableChange = (pagination, filters, sorter) => {
    console.log(sorter)
    setPagination({
      pageSize: pagination.pageSize,
      current: pagination.current
    })
    setFilters(filters.package)
    fetch({
      sortField: sorter.columnKey,
      sortOrder: sorter.order,
      pagination,
      filters: filters.package,
    });
  };

  const onDelete = async () => {
    // console.log('DELETE')
    // const data = {
    //   'organization_name': value.organization_name,
    // }
    // console.log(data)
    const registerData = await apiInstance().delete('admin/management/landing-page/' + dataDelete.intro_id, {});
    if (registerData.data.status == 200) {
      openNotificationSuccess()
      // fetchOrganizationData();
      setVisibleModalDelete(false)
      fetch({ pagination });
    } else {
      openNotificationFail(registerData.data.message)

    }
  }

  const hideModal = () => {
    setVisibleModalDelete(false)
  };


  const openNotificationSuccess = () => {
    api.success({
      message: `ลบข้อมูลสำเร็จ`,
      description: 'ลบข้อมูลสำเร็จ',
      placement: 'topRight',
    });
  };

  const openNotificationFail = (messgae) => {
    api.error({
      message: `พบปัญหาระหว่างการลบข้อมูล`,
      description: messgae,
      placement: 'topRight',
    });
  };

  return (
    <Layout titlePage={"จัดการหน้า landing page"} isMain={true} indexMenu={"3"} title="Government - Admin management" url={origin} origin={origin} user={login} props={props}
      _routes={[
        {
          path: '/admin/dashborad',
          breadcrumbName: 'หน้าหลัก',
        }, {
          path: '/admin/management-auto-landingpage',
          breadcrumbName: 'จัดการหน้า landing page',
        }]}
    >
      <div>
        {contextHolder}
        <Row >
          <Col span={24} className=" pb-1">
            <Row>
              <Col span={18} className="">
                <Row className="items-center">
                  <Link href="/admin/management-auto-landingpage/add-landingpage">
                    <a
                      //onClick={(e) => handleLogout(e)}
                      className="lg:inline-flex lg:w-auto w-full px-2 py-2 rounded h-8 text-white bg-green-600 font-bold items-center justify-center hover:bg-green-600 hover:text-white"
                    >
                      เพิ่ม landing page
                    </a>
                  </Link>
                </Row>
              </Col>
              <Col span={6} className="flex items-center justify-end justify-items-end">
                <Row className=" justify-end justify-items-end ">
                  <Search placeholder="input search text"
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
          rowKey={record => record.organization_id}
          dataSource={data}
          pagination={pagination}
          loading={loading}
          onChange={handleTableChange}
        />
      </div>

      <Modal
        title="คุณต้องการลบข้อมูลหรือไม่?"
        visible={visibleModalDelete}
        onOk={onDelete}
        onCancel={hideModal}
        okText="ลบ"
        cancelText="ยกเลิก"
        okButtonProps={{
          'type': "primary",
          'danger': true
        }}
      >
        <p>คุณต้องการลบ "{dataDelete ? dataDelete.intro_title : ""}" หรือไม่?  </p>

      </Modal>


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
