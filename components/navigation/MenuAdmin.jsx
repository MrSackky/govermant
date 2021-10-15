import Link from 'next/link';
import { useEffect, useState } from 'react'
import { Layout, Menu, Button, Row, Col, } from 'antd';
import Router, { useRouter } from 'next/router';
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
  DashboardOutlined,
  UnorderedListOutlined,
  UserOutlined
} from '@ant-design/icons';

const { SubMenu } = Menu;
const MenuAdmin = ({ indexMenu  }) => {
  const [collapsed, setCollapsed] = useState(false)
  const [subOpened, setSubOpened] = useState([])

  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  };

  useEffect(() => {
    // renderKeyMenu();
  }, [])
  function renderKeySubMenu() {
    let numbers = []
      switch (indexMenu) {
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
      case "10":
        // setSubOpened(["sub1"])
        numbers.push("sub1")
       // break;
    
      default:
        // setSubOpened([])

       // break;
    }
    return numbers
  }
    function renderKeyMenu() {
    let numbers = []
    numbers.push(indexMenu)
  
    return numbers
  }

  const gotoPage = (key) => {
    console.log("key")
    console.log(key)
    switch (key) {
      case "1":
        Router.push('/admin/dashborad');
        break;
      case "2":
        Router.push('/admin/management/activities');
        break;
      case "3":
        Router.push('/admin/management/information');
        break;
      case "4":
        Router.push('/admin/management/purchase-news');
        break;
      case "5":
        Router.push('/admin/management/banner');
        break;
      case "6":
        Router.push('/admin/management/webboard');
        break;
      case "7":
        Router.push('/admin/management/documents');
        break;
      case "8":
        Router.push('/admin/management/polls');
        break;
      case "9":
        Router.push('/admin/management/journal');
        break;
      case "10":
        Router.push('/admin/management/blessing-list');
        break;
      case "11":
        Router.push('/admin/management-menu/primary-menu');
        break;
      case "12":
        Router.push('/admin/management-menu/secoundary-menu');
        break;
      case "13":
        Router.push('/admin/management-complain');
        break;
      case "14":
        Router.push('/admin/management-contact');
        break;
      case "15":
        Router.push('/admin/report');
        break;
      case "16":
        Router.push('/admin/setting/profile');
        break;
      case "17":
        Router.push('/admin/setting/theme');
        break;
      case "18":
        Router.push('/admin/setting/cover');
        break;
      case "19":
        Router.push('/admin/setting/general');
        break;
      default:
        Router.push('/404');
        break;
    }

  };

  return (
    <>
      <center><Link href="/admin/dashborad">
        <a className="inline-flex items-center p-3 mr-4 ">
          <img
            className="h-7 w-auto"
            src={
              '../../assets/images/logo-government.png'
            }
          />
        </a>
      </Link></center>
      <Menu
        defaultSelectedKeys={renderKeyMenu()}
        defaultOpenKeys={renderKeySubMenu()}
        mode="inline"
        // theme="dark"
        inlineCollapsed={collapsed}
        className=" h-full"
        onSelect={(item, key) => {
          console.log(item)
          gotoPage(item.key);
          console.log(key)
        }}
      >
        <Menu.Item key="1" icon={<DashboardOutlined />}>
          หน้าหลัก
        </Menu.Item>
        <SubMenu key="sub1" icon={<MailOutlined />} title="จัดการเนื้อหา">
          <Menu.Item key="2"  icon={<DashboardOutlined />}>ข่าวกิจกรรม</Menu.Item>
          <Menu.Item key="3">ข่าวประชาสัมพันธ์</Menu.Item>
          <Menu.Item key="4">ข่าวจัดซื้อจัดจ้าง</Menu.Item>
          <Menu.Item key="5">ลิงค์หน่วยงานที่เกี่ยวข้อง</Menu.Item>
          <Menu.Item key="6">กระดานข่าว</Menu.Item>
          <Menu.Item key="7">คลังเอกสาร</Menu.Item>
          <Menu.Item key="8">สำรวจความคิดเห็น</Menu.Item>
          <Menu.Item key="9">วารสาร</Menu.Item>
          <Menu.Item key="10">รายชื่อถวายพระพร</Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" icon={<MailOutlined />} title="จัดการเมนู">
          <Menu.Item key="11">เมนูหลัก</Menu.Item>
          <Menu.Item key="12">เมนูรอง</Menu.Item>
        </SubMenu>
        <Menu.Item key="13" icon={<UnorderedListOutlined />}>
          ข้อมูลเมนูร้องทุกข์
        </Menu.Item>
        <Menu.Item key="14" icon={<UnorderedListOutlined />}>
          ข้อมูลเมนูติดต่อเรา
        </Menu.Item>
        <Menu.Item key="15" icon={<UnorderedListOutlined />}>
          รายงานสรุป
        </Menu.Item>
        <SubMenu key="sub3" icon={<MailOutlined />} title="ตั้งค่าระบบ">
          <Menu.Item key="16">ข้อมูลองค์กร(จัดการโลโก้)</Menu.Item>
          <Menu.Item key="17">จัดการธีม</Menu.Item>
          <Menu.Item key="18">ส่วนหัวเว็บไซต์</Menu.Item>
          <Menu.Item key="19">จัดการอื่นๆ</Menu.Item>
        </SubMenu>
        {/* <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
          <Menu.Item key="5">Option 5</Menu.Item>
          <Menu.Item key="6">Option 6</Menu.Item>
          <Menu.Item key="7">Option 7</Menu.Item>
          <Menu.Item key="8">Option 8</Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
          <Menu.Item key="9">Option 9</Menu.Item>
          <Menu.Item key="10">Option 10</Menu.Item>
          <SubMenu key="sub3" title="Submenu">
            <Menu.Item key="11">Option 11</Menu.Item>
            <Menu.Item key="12">Option 12</Menu.Item>
          </SubMenu>
        </SubMenu> */}
      </Menu>
    </>
  );
};

export default MenuAdmin;
