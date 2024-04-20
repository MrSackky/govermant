import { Menu } from 'antd';
const { SubMenu } = Menu;
export default function Navbar() {

  return (
    <Menu className="justify-center" mode="horizontal">
      <Menu.Item key="mail" >
        <a href="/template/free/example-page" rel="noopener noreferrer">
          หน้าตัวอย่าง
        </a>
      </Menu.Item>
      <Menu.Item key="menu2">
        <a href="#" >
          เมนูตัวอย่าง 2
        </a>
      </Menu.Item>


      <Menu.Item key="menu3">
        <a href="#">
          เมนูตัวอย่าง 3
        </a>
      </Menu.Item>

      <Menu.Item key="menu4">
        <a href="#" >
          เมนูตัวอย่าง 4
        </a>
      </Menu.Item>

      <Menu.Item key="menu5">
        <a href="#" >
          เมนูตัวอย่าง 5
        </a>
      </Menu.Item>

      <Menu.Item key="menu6">
        <a href="#" >
          เมนูตัวอย่าง 6
        </a>
      </Menu.Item>

      <Menu.Item key="menu7">
        <a href="#" >
          เมนูตัวอย่าง 7
        </a>
      </Menu.Item>

      <Menu.Item key="menu8">
        <a href="#" >
          เมนูตัวอย่าง 8
        </a>
      </Menu.Item>

      <SubMenu key="SubMenu" title="เมนูตัวอย่าง 9 - Submenu">

        <Menu.Item key="setting:1">Option 1</Menu.Item>
        <Menu.Item key="setting:2">Option 2</Menu.Item>

        <Menu.Item key="setting:3">Option 3</Menu.Item>
        <Menu.Item key="setting:4">Option 4</Menu.Item>
      </SubMenu>
      {/* <Menu.Item key="menu1">
        <a href="" target="_blank" rel="noopener noreferrer">
          เมนู 1
        </a>
      </Menu.Item>
      <Menu.Item key="alipay">
        <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
          Navigation Four - Link
        </a>
      </Menu.Item>
      <Menu.Item key="alipay">
        <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
          Navigation Four - Link
        </a>
      </Menu.Item>
      <Menu.Item key="alipay">
        <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
          Navigation Four - Link
        </a>
      </Menu.Item>
      <Menu.Item key="alipay">
        <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
          Navigation Four - Link
        </a>
      </Menu.Item>
      <Menu.Item key="alipay">
        <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
          Navigation Four - Link
        </a>
      </Menu.Item>
      <Menu.Item key="alipay">
        <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
          Navigation Four - Link
        </a>
      </Menu.Item>
      <Menu.Item key="alipay">
        <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
          Navigation Four - Link
        </a>
      </Menu.Item>
      <Menu.Item key="alipay">
        <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
          Navigation Four - Link
        </a>
      </Menu.Item>
      <Menu.Item key="alipay">
        <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
          Navigation Four - Link
        </a>
      </Menu.Item> */}
    </Menu>
  )
}
