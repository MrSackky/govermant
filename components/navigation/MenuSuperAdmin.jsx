import Link from 'next/link';
import { useEffect, useState } from 'react'
import { Layout, Menu, Button, Row, Col, Image } from 'antd';
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
  UserOutlined,
  ToolOutlined
} from '@ant-design/icons';

const { SubMenu } = Menu;
const MenuSuperAdmin = ({ props, indexMenu }) => {
  const [collapsed, setCollapsed] = useState(false)
  const [menuIndex, setMenuIndex] = useState([]);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  };
  useEffect(() => {
    renderKeyMenu();
  }, [])
  function renderKeyMenu() {
    let numbers = []
    numbers.push(indexMenu)

    return numbers
    // let numbers = ["1"];
    // switch (key) {
    //   case "/admin/management-organization":
    //   case "/_next/data/development/admin/management-organization.json":
    //     numbers = ["2"];
    //     return numbers;
    //   case "/admin/management-information":
    //   case "/_next/data/development/admin/management-information.json":
    //     numbers = ["3"];
    //     return numbers;
    //   case "/admin/management-auto-landingpage":
    //   case "/_next/data/development/admin/management-auto-landingpage.json":
    //     numbers = ["4"];
    //     return numbers;
    //   default:
    //     numbers = ["1"];
    //     return numbers;
    // }
  }

  const gotoPage = (key) => {
    console.log("key")
    console.log(key)
    switch (key) {
      case "1":
        Router.push('/admin/dashborad');
        break;
      case "2":
        Router.push('/admin/management-organization');
        break;
      case "3":
        Router.push('/admin/management-information');
        break;
      case "4":
        Router.push('/admin/management-auto-landingpage');
        break;
      default:
        break;
    }

  };

  return (
    <>

      <center><Link href="/admin/dashborad">
        <a className="inline-flex items-center p-3 mr-4 ">
          <Image
            // width={200}
            preview={false}
            className="h-7 w-auto"
            src={'\\images\\logo-government.png'}
          />

        </a>
      </Link></center>
      <Menu
        defaultSelectedKeys={renderKeyMenu()}
        // defaultOpenKeys={['sub1']}
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
        <Menu.Item key="2" icon={<ToolOutlined />}>
          จัดการหน่วยงาน
        </Menu.Item>
        <Menu.Item key="3" icon={<ToolOutlined />}>
          จัดการข่าวประชาสัมพันธ์
        </Menu.Item>
        <Menu.Item key="4" icon={<ToolOutlined />}>
          จัดการวันหยุดพิเศษ
        </Menu.Item>
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

export default MenuSuperAdmin;
