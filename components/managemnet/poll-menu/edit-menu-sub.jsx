import { Button, Col, Form, Input, Modal, notification, Row, Select, Typography } from 'antd';
import dynamic from 'next/dynamic';
import React, { useEffect, useRef, useState } from 'react';
import { apiInstance } from '../../../middleware/utils';
const { Option } = Select;
const { TextArea } = Input;
// const config = require('./../../config');
const config = require('../../../pages/admin/config');
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });
const { Text, Title } = Typography;
export default function modal({ _visible, hideModal, fetch, dataEdit }) {
    let divRef = useRef(null);
    const [api, contextHolder] = notification.useNotification();
    // const [divRef] = useRef(null);
    const [visible, setVisible] = useState(false);
    const [patternMenuSelected, setPatternMenuSelected] = useState(1);
    const [content, setContent] = useState('')
    const [active, setActive] = useState(1)
    const [fields, setFields] = useState([
        {
            name: ['intro_title'],
            value: '',
        },
    ]);
    const [form] = Form.useForm();

    useEffect(() => {
        setVisible(_visible)
        fetchEditData()
    }, [dataEdit])

    const fetchEditData = async () => {
        if (dataEdit) {

            setFields([
                {
                    name: ['poll_options_name'],
                    value: (!dataEdit ? "" : dataEdit.poll_options_name),
                },
                {
                    name: ['poll_options_score'],
                    value: (!dataEdit ? 0 : dataEdit.poll_options_score),
                },
            ])

        }
    }

    const onSubmitHandler = async (value) => {

        const data = {
            "poll_options_name": value.poll_options_name,
            "poll_options_score": value.poll_options_score ? value.poll_options_score : 0,
        }
        console.log(data)
        const registerData = await apiInstance().put('/pollmenu/poll-option/' + (dataEdit ? dataEdit.poll_option_id : 0), data);
        if (registerData.data.status == 200) {
            openNotificationSuccess()
        } else {
            openNotificationFail(registerData.data.message)
        }
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

        setFields([
            {
                name: ['poll_options_name'],
                value: (!dataEdit ? "" : dataEdit.poll_options_name),
            },
            {
                name: ['poll_options_score'],
                value: (!dataEdit ? 0 : dataEdit.poll_options_score),
            },
        ])

    }



    return (
        <>
            {contextHolder}
            <Modal
                title={"แก้ไขเมนู " + (!dataEdit ? "" : dataEdit.poll_options_name)}
                className="mt-4"
                centered
                visible={_visible}
                // onOk={() => onOK()}
                onCancel={() => {
                    hideModal()
                }}
                width={1000}
                footer={null}
            >
                <Row>
                    <Col span={24}>
                        <Form
                            name="basic"
                            layout="vertical"
                            onFinish={onSubmitHandler}
                            requiredMark={true}
                            form={form}
                            fields={fields}
                        >
                            <Form.Item
                                name="poll_options_name"
                                label="ชื่อตัวเลือก"
                                style={{ float: 'left' }}
                                className="block text-gray-700 text-sm font-bold mb-2 w-2/3"
                                rules={[
                                    {
                                        required: true,
                                        message: 'กรุณากรอกชื่อตัวเลือก',
                                    },
                                ]}
                            >
                                <Input
                                    id="#"
                                    type="text"
                                    placeholder="ชื่อตัวเลือก"
                                    className="resize-none border rounded-md"
                                />
                            </Form.Item>

                            <Form.Item
                                className="flex mt-6 mb-0 w-1/3"
                                style={{ marginBottom: 0 }}
                            >
                                <div className="lg:inline-flex w-full mt-6">
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
                                name="poll_options_score"
                                label="คะแนนตัวเลือก"
                                style={{ float: 'left' }}
                                className="block text-gray-700 text-sm font-bold mb-2 w-2/3"
                                rules={[
                                    {
                                        required: true,
                                        message: 'กรุณากรอกคะแนนตัวเลือก',
                                    },
                                ]}
                            >
                                <Input
                                    id="#"
                                    type="number"
                                    placeholder="คะแนนตัวเลือก"
                                    className="resize-none border rounded-md"
                                />
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
                <div style={{ float: "left", clear: "both" }}
                    ref={divRef}>
                </div>
            </Modal>
        </>

    );
}
