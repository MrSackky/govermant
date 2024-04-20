import {
	Button, Input, Modal, notification, Table
} from 'antd';
import Link from 'next/link';
import Router from 'next/router';
// import UserNav from '../components/navigation/User';
import { useEffect, useState } from 'react';
/* components */
import Layout from '../../../../components/layout/LayoutAdmin';
/* utils */
import { absoluteUrl, apiInstance, convertDateDBtoDatePickerNoTime, convertDatetoThaiDate } from '../../../../middleware/utils';


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
			title: 'ชื่อวันหยุด',
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
		Router.push('/admin/setting/general/' + id);
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
		<Layout titlePage={"จัดการวันหยุด"} isMain={true} indexMenu={"sub-6-3"} title="Government - Admin management" url={origin} origin={origin} user={login} props={props}
			_routes={[
				{
					path: '/admin/dashborad',
					breadcrumbName: 'หน้าหลัก',
				}, {
					path: '/admin/setting/general',
					breadcrumbName: 'จัดการหน้าวันหยุดพิเศษ',
				}]}
		>
			<div>
				{contextHolder}
				<div className="w-full lg:inline-flex justify-between">
					<div className="w-full lg:w-1/2 py-2 justify-center">
						<Link href="/admin/setting/general/add-holiday">
							<a
								//onClick={(e) => handleLogout(e)}
								className="lg:inline-flex lg:w-auto px-2 py-2 rounded h-8 text-white bg-green-600 font-bold items-center justify-center hover:bg-green-600 hover:text-white"
							>
								เพิ่มวันหยุด
							</a>
						</Link>
					</div>
					<div className="text-right w-full justify-items-end lg:w-auto py-2">
						<Search placeholder="input search text"
							onSearch={onSearch}
							enterButton
							allowClear
						/>
					</div>
				</div>

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
