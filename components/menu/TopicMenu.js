import React from "react";
import { Menu } from "antd";
import Cookies from 'js-cookie';
import Router, { useRouter } from 'next/router';
import Link from 'next/link';
const { SubMenu } = Menu;

const TopicMenu = ({ topics, selectedKey, changeSelectedKey, selectedSubKey }) => {
    const styledTopics = [];
    topics.forEach((topic, index) => {
        if (topic.children) {
            const styledTopicsChildren = [];

            topic.children.forEach((topicChildren, indexChildren) => {
                styledTopicsChildren.push(
                    <Menu.Item key={'sub-' + index + "-" + indexChildren} onClick={changeSelectedKey} >
                        {topicChildren.title}
                    </Menu.Item>
                )
            });

            styledTopics.push(
                <SubMenu key={index} icon={topic.icon} title={topic.title}>
                    {/* {topic.title} */}
                    {styledTopicsChildren}
                    {/* <Menu.Item key="sub-1">{JSON.stringify()}</Menu.Item> */}
                </SubMenu>
            )
        } else {
            styledTopics.push(
                <Menu.Item key={index} onClick={changeSelectedKey} icon={topic.icon}>
                    {topic.title}
                </Menu.Item>
            )
        }

    }

    );

    styledTopics.push(
        <li className="ant-menu-item">
            <Link
                href="#"
                className="w-full"
            >
                <a
                    style={{
                        width: "100%",
                        color: "#ffffff"
                    }}
                    onClick={(e) => handleLogout(e)}
                    className="inline-flex w-auto w-full rounded h-8 text-white bg-red-600 font-bold items-center justify-center hover:bg-red-600 hover:text-white"
                >
                    ออกจากระบบ
                </a>
            </Link>
        </li>

    )


    const handleLogout = (e) => {
        e.preventDefault()
        console.log("handleLogout")
        Cookies.remove('token')
        Router.push('/login');
    };

    return (
        <Menu mode="inline" selectedKeys={[selectedKey]} defaultOpenKeys={[selectedSubKey]}>
            {styledTopics}
        </Menu>
    );
}
export default TopicMenu;