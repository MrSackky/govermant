import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import ReactDOM from 'react-dom';
import { Modal, Button, Form, Input, Switch, Typography, Select, notification } from 'antd';
const { Option } = Select;
const { TextArea } = Input;
// const config = require('./../../config');
const config = require('../../../pages/admin/config');
import { absoluteUrl, checkIsLogin, apiInstance, convertDateDBtoDatePickerNoTime } from '../../../middleware/utils';
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });
const { Text, Title } = Typography;
export default function modal({ fetch, user }) {
    let divRef = useRef(null);
    const [api, contextHolder] = notification.useNotification();
    // const [divRef] = useRef(null);
    const [visible, setVisible] = useState(false);
    const [patternMenuSelected, setPatternMenuSelected] = useState(1);

    const [patternMenu, setPatternMenu] = useState([]);
    const editor = useRef(null)
    const [content, setContent] = useState('')
    const [active, setActive] = useState(1)
    const [isSubMenu, setIsSubMenu] = useState(0)
    const [isPatternMenu, setISPatternMenu] = useState(false);
    const [isShow, setIsShow] = useState(true);
    const [form] = Form.useForm();
    const actived = () => {
        active ? setActive(0) : setActive(1);
        // divRef.scrollIntoView({ behavior: "smooth" });
        // divRef.current.scrollIntoView({ behavior: 'smooth' });
    };
    useEffect(() => {
        fetchPattern()
    }, [])

    const fetchPattern = async () => {
        const menuData = await apiInstance().get(
            'menu/pattern-menu'
        );
        console.log(menuData)
        setPatternMenu(menuData.data.results)
    }

    const onSubmitHandler = async (value) => {


        // organization_id: organization_id,
        // menu_title: menu_title,
        // menu_detail: menu_detail,
        // menu_seq: menu_seq,
        // have_sub: have_sub,
        // is_show: is_show,
        // is_primary_menu: is_primary_menu,
        // is_pattern_menu: is_pattern_menu,
        // pattern_menu: pattern_menu,

        const data = {
            "organization_id": user.organization_id,
            "menu_title": value.menu_title,
            "menu_detail": content ? value.menu_detail : "",
            "menu_seq": 999999,
            "have_sub": isSubMenu ? 1 : 0,
            "is_show": active ? 1 : 0,
            "is_primary_menu": 1,
            "is_pattern_menu": value.pattern_menu == 1 ? 0 : 1,
            "pattern_menu": patternMenuSelected,
        }
        console.log(data)
        const registerData = await apiInstance().post('/menu', data);
        if (registerData.data.status == 200) {
            openNotificationSuccess()


        } else {
            openNotificationFail(registerData.data.message)

        }


        console.log("ON OK")
        setVisible(false)
        onReset()
        fetch()
    }

    const openNotificationSuccess = () => {
        api.success({
            message: `บันทึกมูลสำเร็จ`,
            description: 'บันทึกมูลสำเร็จ',
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


    const onReset = () => {
        setActive(1)
        setIsSubMenu(0)
        setISPatternMenu(false)
        setPatternMenuSelected(1)
        setIsShow(true)

        form.resetFields();

    }

    function handleChange(value) {
        console.log(`selected ${value}`);
        setPatternMenuSelected(value)
        if (!isSubMenu) {
            if (value != 1) {
                // setIsSubMenu(1)
                // setISPatternMenu(true)
                setIsShow(false)

            } else {
                // setIsSubMenu(0)

                // setISPatternMenu(false)
                setIsShow(true)

            }
        }

        // setMenu(value);
    }

    return (
        <>
            <a
                onClick={() => setVisible(true)}
                className="ml-4 lg:inline-flex lg:w-auto w-full px-2 py-2 rounded h-8 text-white bg-green-600 font-bold items-center justify-center hover:bg-green-600 hover:text-white"
            >
                เพิ่มเมนู
            </a>
            {contextHolder}
            <Modal
                title="เพิ่มเมนู"
                className="mt-4"
                centered
                visible={visible}
                // onOk={() => onOK()}
                onCancel={() => {
                    setVisible(false)
                    setActive(1)
                    setIsSubMenu(0)
                    form.resetFields();
                }}
                width={1000}
                footer={null}
            >

                <Form
                    name="basic"
                    layout="vertical"
                    onFinish={onSubmitHandler}
                    requiredMark={true}
                    form={form}
                >
                    <Form.Item
                        name="menu_title"
                        label="ชื่อเมนู"
                        style={{float:"left"}}
                        className="block text-gray-700 text-sm font-bold mb-2 w-2/3"
                        rules={[
                            {
                                required: true,
                                message: 'กรุณากรอกชื่อเมนู',
                            },
                        ]}
                    >
                        <Input
                            id="#"
                            type="text"
                            placeholder="ชื่อเมนู"
                            className="resize-none border rounded-md"
                        />
                    </Form.Item>
                    <Form.Item className="flex mt-6 mb-0 w-1/3" style={{ marginBottom: 0 }}>
                        <div className="lg:inline-flex w-full mt-6" >

                            <div className="text-center lg:text-right w-full lg:w-full">
                                <Button
                                    htmlType="button"
                                    onClick={onReset}
                                    style={{
                                        backgroundColor: '#C2CFE0',
                                        borderColor: '#C2CFE0',
                                        height: 40,
                                        width: 110,
                                        marginBottom: '0px !important',
                                        marginRight: '2px',
                                        color: 'white !important',
                                    }}
                                    // htmlType="submit"
                                    className="text-center bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full lg:w-1/4"
                                >
                                    <Text className="text-custom-black ">รีเซ็ท</Text>
                                </Button>
                                <Button
                                    // type="primary"
                                    style={{
                                        backgroundColor: '#059669',
                                        borderColor: '#059669',
                                        height: 40,
                                        width: 110,
                                        marginBottom: '0px !important',
                                        color: 'white !important',
                                    }}
                                    htmlType="submit"
                                    className="text-center bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full lg:w-1/4"
                                >
                                    <Text className="text-custom-white ">บันทึก</Text>
                                </Button>
                            </div>
                        </div>
                    </Form.Item>

                    <Form.Item
                        name="pattern_menu"
                        label="รูปแบบเมนู"
                        className="block text-gray-700 text-sm font-bold mb-2 w-full"
                    >
                        <Select
                            defaultValue={1}
                            className="w-full"
                            onChange={handleChange}
                        >
                            {/* <Option value="0">กำหนดเอง</Option> */}
                            {patternMenu ? patternMenu.map((object) => {
                                return <Option value={object.pattern_menu_id}>{object.pattern_title}  </Option>
                            }) : ""}
                        </Select>
                    </Form.Item>
                    <Form.Item className="flex mt-6 mb-0" style={{ marginBottom: 0 }}>
                        <div className="lg:inline-flex w-full">
                            <div className="inline-flex text-left lg:w-1/2">
                                <ul>
                                    <li className="inline-flex">
                                        <Switch checked={active} onClick={actived} />
                                        <p className="mx-2 text-sm">การแสดงผล</p>
                                    </li>
                                    <li className="inline-flex">
                                        <Switch checked={isSubMenu} onClick={(value) => {
                                            setIsSubMenu(value ? 1 : 0)
                                            if (patternMenuSelected == 1) {
                                                setIsShow(value ? false : true)
                                            }

                                        }} />
                                        <p className="mx-2 text-sm">ต้องการสร้าง เมนูย่อย</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </Form.Item>
                    {isShow == true && <>
                        <Form.Item
                            name="menu_detail"
                            label="รายละเอียด :"
                            className="block text-gray-700 text-sm font-bold mb-2 w-full"
                            visible={false}
                            rules={[
                                {
                                    required: true,
                                    message: 'กรุณากรอกรายละเอียด',
                                },
                            ]}
                        >
                            <JoditEditor
                                ref={editor}
                                value={content}
                                config={config.config(user)}
                                height={"700px"}
                                tabIndex={1} // tabIndex of textarea
                                onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                                onChange={newContent => { }}
                            />
                        </Form.Item>

                    </>}



                </Form>
                <div style={{ float: "left", clear: "both" }}
                    ref={divRef}>
                </div>
            </Modal>
        </>

    );
}
