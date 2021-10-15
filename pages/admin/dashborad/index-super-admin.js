import Link from 'next/link';
import Router, { useRouter } from 'next/router';
/* utils */
import { absoluteUrl, checkIsLogin, apiInstance, convertDatetoThaiDate, convertDateDBtoDatePickerNoTime, addDays, formatDateWithoutTime, bytesToMB, bytesToSize } from '../../../middleware/utils';

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
  Statistic,
  Table,

} from 'antd';

const { Search } = Input;
import { LikeOutlined } from '@ant-design/icons';
const { Text, Title } = Typography;
import moment from 'moment';


export default function Home(props) {
  const { origin } = props;
  const [data, setData] = useState([])
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  })
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState("")
  const [filters, setFilters] = useState(null)
  const [totalUser, setTotalUser] = useState(0)
  const [totalWillExpired, setTotalWillExpired] = useState(0)
  const [totalExpired, setTotalExpired] = useState(0)
  const [apiTxt, setApiTxt] = useState('dashborad-all')
  const [today, setToday] = useState(null)
  const [willExpried, setWillExpried] = useState(null)
  const [expried, setExpried] = useState(null)
  const [apiTxtWillExpried, setApiTxtWillExpried] = useState('dashborad-will-expried')
  const [txtMenu, setTextMenu] = useState('ผู้ใช้ทั้งหมด')

  useEffect(() => {
    var _filters = []
    pagination.filters = _filters
    fetch({ pagination });
    fetchWillExprired({ pagination })
    fetchExprired({ pagination })
  }, [])

  const columns = [
    {
      title: 'วันที่สมัคร',
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
      title: 'วันที่หมดอายุ',
      dataIndex: '',
      sorter: true,
      key: 'date_expired',
      render: (data) => <>
        <span > {convertDatetoThaiDate(convertDateDBtoDatePickerNoTime(data.date_expired))} </span>
      </>,
      // render: name => `${name.first} ${name.last}`,
      // width: '20%',
      // defaultSortOrder: 'descend',
    },
    {
      title: 'ชื่อหน่วยงาน',
      dataIndex: 'organization_name',
      sorter: true,
      // render: name => `${name.first} ${name.last}`,
      // width: '20%',
      // defaultSortOrder: 'descend',
    },
    {
      title: 'ใช้พื้นที่',
      dataIndex: '',
      sorter: true,
      key: 'size_used',
      render: (data) => <>
        <span > {bytesToSize(data.size_used)}  </span>
      </>
      // render: name => `${name.first} ${name.last}`,
      // width: '20%',
      // defaultSortOrder: 'descend',
    },
    {
      title: 'package',
      dataIndex: '',
      key: 'package',
      sorter: true,
      render: (data) => <>
        <span > {data.packages.name_package} </span>
      </>,
      filters: [
        {
          text: 'Free Package',
          value: 1,
        },
        {
          text: 'Connect Package',
          value: 2,
        },
        {
          text: 'Standard Package',
          value: 3,
        },
        {
          text: 'Premium Package',
          value: 4,
        },
      ],
      // render: name => `${name.first} ${name.last}`,
      // width: '20%',
      // defaultSortOrder: 'descend',
    },
    {
      title: 'สถานะ',
      dataIndex: '',
      key: 'is_use',
      sorter: true,
      render: (data) => <>
        <span > {data.is_use == 1 ? "ใช้งาน" : "ไม่ใช้งาน"} </span>
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
        <Button type="primary" size={"default"} onClick={() => gotoPage(data.organization_id)} > แก้ไข </Button>
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
  const gotoPage = (id) => {
    console.log(id)
    Router.push('/admin/management-organization/organization/' + id);

  };

  const usedSize = async (size_used) => {
    var _size = await bytesToMB(parseInt(size_used))

    return _size
  }

  const handleTableChange = (pagination, filters, sorter) => {
    console.log(sorter)
    setPagination({
      pageSize: pagination.pageSize,
      current: pagination.current
    })
    setFilters(filters.package)

    switch (apiTxt) {
      case "dashborad-will-expried":
        fetchWillExpriredData({
          sortField: sorter.columnKey,
          sortOrder: sorter.order,
          pagination,
          filters: filters.package,
        })
        break;
      case "dashborad-expried":
        fetchExpriredData({
          sortField: sorter.columnKey,
          sortOrder: sorter.order,
          pagination,
          filters: filters.package,
        })
        break;
      default:
        fetchData({
          sortField: sorter.columnKey,
          sortOrder: sorter.order,
          pagination,
          filters: filters.package,
        });
        break;
    }

  };

  const onSearch = async (_search) => {
    setLoading(true)
    setSearch(_search)
    setPagination({
      pageSize: pagination.pageSize,
      current: 1
    })
    var _today = moment().format('YYYY-MM-DD');
    var _willExpried = addDays(_today, 31);
    var willExpriedDateString = await formatDateWithoutTime(_willExpried)

    switch (apiTxt) {

      case "dashborad-will-expried":
        fetchWillExpriredData({
          pagination: {
            pageSize: pagination.pageSize,
            current: 1
          },
          search: _search
        })

        break;
      case "dashborad-expried":
        fetchExpriredData({
          pagination: {
            pageSize: pagination.pageSize,
            current: 1
          },
          search: _search
        })

        break;

      case "dashborad-all":
        fetchData({
          pagination: {
            pageSize: pagination.pageSize,
            current: 1
          },
          search: _search
        })
        break;

    }
    // const addactivitiesData = await apiInstance().get(
    //   'organization/' + apiTxt + '?results=' + pagination.pageSize + '&page=1&search=' + _search + "&filters=" + filters
    // );

    // setData(addactivitiesData.data.results)
    // setLoading(false)
  }
  const fetch = async (params = {}) => {
    setLoading(true)
    const addactivitiesData = await apiInstance().get(
      'organization/' + apiTxt + '?results=' + params.pagination.pageSize + '&page=' + params.pagination.current + "&search=" + search + "&sortField=" + params.sortField + "&sortOrder=" + params.sortOrder + "&filters=" + params.filters
    );

    setData(addactivitiesData.data.results)
    setPagination({
      ...params.pagination,
      total: addactivitiesData.data.totalCount,
      // 200 is mock data, you should read it from server
      // total: data.totalCount,
    })
    setTotalUser(addactivitiesData.data.totalCount)
    setLoading(false)
  };

  const fetchData = async (params = {}) => {
    setLoading(true)
    const addactivitiesData = await apiInstance().get(
      'organization/dashborad-all?results=' + params.pagination.pageSize + '&page=' + params.pagination.current + "&search=" + (params.search ? params.search : "") + "&sortField=" + params.sortField + "&sortOrder=" + params.sortOrder + "&filters=" + params.filters
    );

    setData(addactivitiesData.data.results)
    setPagination({
      ...params.pagination,
      total: addactivitiesData.data.totalCount,
      // 200 is mock data, you should read it from server
      // total: data.totalCount,
    })
    // setTotalUser(addactivitiesData.data.totalCount)
    setLoading(false)
  };

  const fetchWillExprired = async (params = {}) => {
    var myCurrentDate = new Date();
    var _today = moment().format('YYYY-MM-DD');
    // var _today = myCurrentDate;
    console.log("_today")
    console.log(_today)
    var _willExpried = addDays(_today, 31);
    console.log("_willExpried")

    var willExpriedDateString = await formatDateWithoutTime(_willExpried)

    pagination.today = _today
    pagination.willExpried = willExpriedDateString
    // setExpried(_expried)
    setPagination({
      pageSize: pagination.pageSize,
      current: 1
    })
    const _Data = await apiInstance().get(
      'organization/' + apiTxtWillExpried + '?results=' + params.pagination.pageSize + "&page=1&search=" + search + "&sortField=" + params.sortField + "&sortOrder=" + params.sortOrder + "&filters=" + params.filters + "&today=" + params.pagination.today + "&willExpried=" + params.pagination.willExpried
    );
    console.log("_Data fetchWillExprired")
    console.log(_Data)


    setTotalWillExpired(_Data.data.totalCount)
  };

  const fetchWillExpriredData = async (params = {}) => {
    var myCurrentDate = new Date();
    var _today = moment().format('YYYY-MM-DD');
    // var _today = myCurrentDate;
    console.log("_today")
    console.log(_today)
    var _willExpried = addDays(_today, 31);
    console.log("_willExpried")

    var willExpriedDateString = await formatDateWithoutTime(_willExpried)

    params.pagination.today = _today
    params.pagination.willExpried = willExpriedDateString
    // setExpried(_expried)
    setPagination({
      pageSize: pagination.pageSize,
      current: 1
    })
    const _Data = await apiInstance().get(
      'organization/' + apiTxtWillExpried + '?results=' + params.pagination.pageSize + "&page=" + params.pagination.current + "&search=" + (params.search ? params.search : "") + "&sortField=" + params.sortField + "&sortOrder=" + params.sortOrder + "&filters=" + params.filters + "&today=" + params.pagination.today + "&willExpried=" + params.pagination.willExpried
    );
    console.log("_Data fetchWillExprired")
    console.log(_Data)

    setData(_Data.data.results)
    setPagination({
      ...params.pagination,
      total: _Data.data.totalCount,
      // 200 is mock data, you should read it from server
      // total: data.totalCount,
    })
    // setTotalWillExpired(_Data.data.totalCount)
    setLoading(false)
  };

  const fetchExprired = async (params = {}) => {
    var myCurrentDate = new Date();
    var _today = moment().format('YYYY-MM-DD');
    // var _today = myCurrentDate;
    console.log("_today")
    console.log(_today)
    var _willExpried = addDays(_today, 31);
    console.log("_willExpried")

    var willExpriedDateString = await formatDateWithoutTime(_willExpried)

    params.pagination.today = _today
    params.pagination.willExpried = willExpriedDateString
    // setExpried(_expried)
    setPagination({
      pageSize: pagination.pageSize,
      current: 1
    })
    const _Data = await apiInstance().get(
      'organization/dashborad-expried?results=' + params.pagination.pageSize + "&page=" + params.pagination.current + "&search=" + search + "&sortField=" + params.sortField + "&sortOrder=" + params.sortOrder + "&filters=" + params.filters + "&today=" + params.pagination.today + "&willExpried=" + params.pagination.willExpried
    );
    console.log("_Data fetchWillExprired")
    console.log(_Data)


    setTotalExpired(_Data.data.totalCount)
  };

  const fetchExpriredData = async (params = {}) => {
    var myCurrentDate = new Date();
    var _today = moment().format('YYYY-MM-DD');
    // var _today = myCurrentDate;
    console.log("_today")
    console.log(_today)
    var _willExpried = addDays(_today, 31);
    console.log("_willExpried")

    var willExpriedDateString = await formatDateWithoutTime(_willExpried)

    params.pagination.today = _today
    params.pagination.willExpried = willExpriedDateString
    // setExpried(_expried)
    setPagination({
      pageSize: pagination.pageSize,
      current: 1
    })
    const _Data = await apiInstance().get(
      'organization/dashborad-expried?results=' + params.pagination.pageSize + "&page=" + params.pagination.current + "&search=" + (params.search ? params.search : "") + "&sortField=" + params.sortField + "&sortOrder=" + params.sortOrder + "&filters=" + params.filters + "&today=" + params.pagination.today + "&willExpried=" + params.pagination.willExpried
    );
    console.log("_Data fetchWillExprired")
    console.log(_Data)

    setData(_Data.data.results)
    setPagination({
      ...params.pagination,
      total: _Data.data.totalCount,
      // 200 is mock data, you should read it from server
      // total: data.totalCount,
    })
    // setTotalExpired(_Data.data.totalCount)
    setLoading(false)
  };

  const handleStatisticClick = (value) => {
    setSearch("")
    switch (value) {

      case "willExpried":
        setTextMenu("ผู้ใช้ที่กำลังจะหมดอายุ")
        setApiTxt("dashborad-will-expried")

        fetchWillExpriredData({
          pagination: {
            pageSize: pagination.pageSize,
            current: 1
          },
        })
        break;
      case "expried":
        setTextMenu("ผู้ใช้ที่หมดอายุ")
        setApiTxt("dashborad-expried")
        fetchExpriredData({
          pagination: {
            pageSize: pagination.pageSize,
            current: 1
          },
        })
        break;

      default:
        setTextMenu("ผู้ใช้ทั้งหมด")
        setApiTxt("dashborad-all")
        fetchData({
          pagination: {
            pageSize: pagination.pageSize,
            current: 1
          },
        })
        break;
    }

  }
  const promiseState = async value =>
    new Promise(resolve => setApiTxt(value, resolve));

  const onChangeSearch = (value) => {
    console.log(value)
    setSearch(value.target.value)
  }
  return (
    <div>
      <Row>

        <Col span={4} className="lg:col-3 md:col-12 p-4 rounded-lg text-white bg-green-600 mr-4 mt-2">
          <a onClick={() => { handleStatisticClick('all') }}> <Statistic title="จำนวนผู้ใช้ทั้งหมด" value={totalUser} prefix={<LikeOutlined />} valueStyle={{
            color: "white",
            fontSize: "2rem"
          }} /></a>
        </Col>

        <Col span={4} className="lg:col-3 md:col-12 p-4 rounded-lg text-white bg-yellow-600 mr-4 mt-2">
          <a onClick={() => { handleStatisticClick('willExpried') }}><Statistic title="กำลังจะหมดอายุ" value={totalWillExpired} prefix={<LikeOutlined />} valueStyle={{
            color: "white",
            fontSize: "2rem"
          }} /></a>
        </Col>

        <Col span={4} className="lg:col-3 md:col-12 p-4 rounded-lg text-white bg-red-600 mr-4 mt-2">
          <a onClick={() => { handleStatisticClick('expried') }}> <Statistic title="หมดอายุ" value={totalExpired} prefix={<LikeOutlined />} valueStyle={{
            color: "white",
            fontSize: "2rem"
          }} /></a>
        </Col>
      </Row>

      <Row className="w-full mt-4">

        <Row className="w-full">
          <Col className="lg:col-3 md:col-12">
            <Title level={2} className="mr-2">{txtMenu}</Title>
          </Col>
          <Col className="lg:col-9 md:col-12">
            <Search placeholder="input search text"
              value={search}
              onChange={(value) => onChangeSearch(value)}
              onSearch={onSearch}
              enterButton
              allowClear
            />
          </Col>
        </Row>
        <Row className="w-full">
          <Col span={24}>
            <Table
              className="w-full"
              columns={columns}
              rowKey={record => record.organization_id}
              dataSource={data}
              pagination={pagination}
              loading={loading}
              onChange={handleTableChange}
            />
          </Col>
        </Row>



      </Row>
    </div>
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
