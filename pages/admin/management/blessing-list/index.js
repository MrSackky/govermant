import {
  Button,
  Input, Modal,
  notification, Table, Typography
} from 'antd';
// import UserNav from '../components/navigation/User';
import { useEffect, useState } from 'react';
/* components */
import Layout from '../../../../components/layout/LayoutAdmin';
/* utils */
import { absoluteUrl, apiInstance, convertDateDBtoDatePickerNoTime, convertDatetoThaiDate } from '../../../../middleware/utils';

const { Text, Title } = Typography;

const { TextArea, Search } = Input;


export default function Home(props) {
  const [api, contextHolder] = notification.useNotification();
  const { user, origin } = props;
  const [login, setLogin] = useState(null)
  const [shouldRun, setShouldRun] = useState(true)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState("")
  const [visibleModalDelete, setVisibleModalDelete] = useState(false)
  const [dataDelete, setDataDelete] = useState(null)
  const [filters, setFilters] = useState(null)
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  })
  const columns = [
    {
      title: 'วันที่',
      dataIndex: '',
      sorter: true,
      key: 'date_created',
      render: (data) => <>
        <span > {convertDatetoThaiDate(convertDateDBtoDatePickerNoTime(data.date_created))} </span>
      </>,
      // render: name => `${name.first} ${name.last}`,
      // width: '20%',
      // defaultSortOrder: 'descend',
    },
    {
      title: 'ชื่อกิจกรรมถวายพระพร',
      // dataIndex: 'intro_id',
      key: 'intro_id',
      sorter: true,
      render: data => `${data.intros.intro_title}`,
      // width: '20%',
      // defaultSortOrder: 'descend',
    },
    {
      title: 'ชื่อผู้ถวายพระพร',
      dataIndex: 'name_blessing',
      sorter: true,
      // render: name => `${name.first} ${name.last}`,
      // width: '20%',
      // defaultSortOrder: 'descend',
    },
    {
      title: 'คำถวายพระพร',
      dataIndex: 'text_blessing',
      sorter: true,
      // render: name => `${name.first} ${name.last}`,
      // width: '20%',
      // defaultSortOrder: 'descend',
    },
    {
      title: 'ตำแหน่ง',
      dataIndex: 'position_blessing',
      sorter: true,
      // render: name => `${name.first} ${name.last}`,
      // width: '20%',
      // defaultSortOrder: 'descend',
    },
    {
      title: 'ชื่อสถานที่ทำงาน',
      dataIndex: 'work_blessing',
      sorter: true,
      // render: name => `${name.first} ${name.last}`,
      // width: '20%',
      // defaultSortOrder: 'descend',
    },
    {
      title: '',
      dataIndex: '',
      key: 'x',
      render: (data) => <>
        <Button className="ml-1" type="danger" onClick={() => showModal(data)} size={"default"} > ลบ </Button>
      </>,
    },
  ];

  useEffect(() => {
    var _filters = []
    pagination.filters = _filters
    fetch({ pagination });
  }, [])

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
  const onSearch = async (_search) => {
    setLoading(true)
    setSearch(_search)
    setPagination({
      pageSize: pagination.pageSize,
      current: 1
    })
    const addblessingData = await apiInstance().get(
      'blessing?organization_id=' + (user ? user.organization_id : 0) + '&results=' + pagination.pageSize + '&page=1&search=' + _search + "&filters=" + filters
    );

    setData(addblessingData.data.results)
    setLoading(false)
  }
  const fetch = async (params = {}) => {
    setLoading(true)
    const addblessingData = await apiInstance().get(
      'blessing?organization_id=' + (user ? user.organization_id : 0) + '&results=' + params.pagination.pageSize + '&page=' + params.pagination.current + "&search=" + search + "&sortField=" + params.sortField + "&sortOrder=" + params.sortOrder + "&filters=" + params.filters
    );

    setData(addblessingData.data.results)
    setPagination({
      ...params.pagination,
      total: addblessingData.data.totalCount,
      // 200 is mock data, you should read it from server
      // total: data.totalCount,
    })
    setLoading(false)
  };

  const showModal = (data) => {
    console.log('data deleted')
    console.log(data)
    setDataDelete(data)
    setVisibleModalDelete(true)
  };

  const hideModal = () => {
    setVisibleModalDelete(false)
  };

  const onDeleteOrganization = async () => {
    // console.log('DELETE')
    // const data = {
    //   'organization_name': value.organization_name,
    // }
    // console.log(data)
    const registerData = await apiInstance().delete('blessing/' + dataDelete.intro_blessing_id, {});
    if (registerData.data.status == 200) {
      openNotificationSuccess()
      // fetchOrganizationData();
      setVisibleModalDelete(false)
      fetch({ pagination });
    } else {
      openNotificationFail(registerData.data.message)

    }
  }

  const openNotificationSuccess = () => {
    api.success({
      message: `ลบข้อมูลสำเร็จ`,
      description: 'ลบข้อมูลสำเร็จ',
      placement: 'topRight',
    });
  };

  const openNotificationFail = (messgae) => {
    api.error({
      message: `พบปัญหาระหว่างการบันทึกข้อมูล`,
      description: messgae,
      placement: 'topRight',
    });
  };
  return (
    <Layout key={"home-blessing-list"} titlePage={"รายชื่อถวายพระพร"} title="Government - Admin management" url={origin} origin={origin} isMain={true}
      indexSubMenu={"1"}
      indexMenu={"sub-1-8"}
      user={login} props={props} _routes={[
        {
          path: '/admin/dashborad',
          breadcrumbName: 'หน้าหลัก',
        }, {
          path: '/admin/management/blessing-list',
          breadcrumbName: 'รายชื่อถวายพระพร',
        }]}>
      <div>
        {contextHolder}
        {/* <Row >
          <Col span={24} className=" pb-1">
            <Row>
              <Col span={18} className="">
                <Row className="items-center">
                  <Link href="/admin/management/activities/add-activities">
                    <a
                      //onClick={(e) => handleLogout(e)}
                      className="lg:inline-flex lg:w-auto w-full px-2 py-2 rounded h-8 text-white bg-green-600 font-bold items-center justify-center hover:bg-green-600 hover:text-white"
                    >
                      เพิ่มข่าวกิจกรรม
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
            </Row>
          </Col>
        </Row> */}

        <Table
          columns={columns}
          rowKey={record => record.intro_blessing_id}
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
          'type': "primary",
          'danger': true
        }}
      >
        <p>คุณต้องการลบ "{dataDelete ? dataDelete.intro_id : ""}" หรือไม่?  </p>

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
