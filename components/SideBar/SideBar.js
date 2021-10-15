import React from "react";
import { Layout } from "antd";
// import "./SideBar.module.css"
const SideBar = ({ menu }) => {
  return (
    <Layout.Sider
      className="sidebar h-auto"
      breakpoint={"lg"}
      theme="light"
      collapsedWidth={0}
      trigger={null}
    >
        {menu}
    </Layout.Sider>
  );
};

export default SideBar;