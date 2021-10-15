import React, { useState } from "react";
import { Drawer, Button, Image, Avatar } from "antd";
import { MenuOutlined, UserOutlined } from "@ant-design/icons";

import Cookies from 'js-cookie';
import Router, { useRouter } from 'next/router';
// import "./NavBar.module.css";
// import logo from "./../../logo.svg";
import Link from 'next/link';

const NavBar = ({ menu, user }) => {
    const [visible, setVisible] = useState(false);


    return (
        <nav className="navbar">
            <Button
                className="menu-t"
                type="primary"
                icon={<MenuOutlined />}
                onClick={() => setVisible(true)}
            />
            <Drawer
                title="เมนู"
                className="h-screen"
                placement="left"
                // onClick={() => setVisible(false)}
                onClose={() => setVisible(false)}
                visible={visible}
            >
                {menu}
            </Drawer>
            <a href="/">
                <Image
                    // width={200}
                    preview={false}
                    className="h-7 w-auto"
                    src={'\\images\\logo-government.png'}
                />

            </a>
            <div className="flex flex-row ">
                <div className="pt-2">
                    <Avatar size={30} icon={<UserOutlined />} />

                </div>
                <div className="ml-2">
                    <h2>{!user ? "" : user.type_user == 1 ? "ผู้ดูแลระบบ" : user.name_organizations}</h2>
                    <span>User: {!user ? "" : user.email}</span>
                </div>
            </div>
            {/* <Link
                href="#"
            >
                <a
                    onClick={(e) => handleLogout(e)}
                    className="lg:inline-flex lg:w-auto w-full px-2 py-2 rounded h-8 text-white bg-red-600 font-bold items-center justify-center hover:bg-red-600 hover:text-white"
                >
                    ออกจากระบบ
                </a>
            </Link> */}
        </nav>
    );
};

export default NavBar;