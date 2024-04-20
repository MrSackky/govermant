import { ArrowDownOutlined } from "@ant-design/icons";
import { Button, Divider, Input, Typography } from 'antd';
import React, { useEffect, useState } from "react";
const { TextArea } = Input;
const { Text } = Typography;
export default function Index({ news }) {
  const [data, setData] = useState([])

  const [newsTemp, setNewsTemp] = useState([
    {
      question_title: "Finding customers for your new business Finding customers for your new business Finding customers for your new business Finding",
      category: "category",
      description: "description",
      image: '\\images\\templates\\free-1\\banner-1.png',
      question_num: 10,
      answer_num: 10
    },
    {
      question_title: "Finding customers for your new business Finding customers for your new business Finding customers for your new business Finding",
      category: "category",
      description: "description",
      image: '\\images\\templates\\free-1\\banner-1.png',
      question_num: 10,
      answer_num: 10
    },
    {
      question_title: "Finding customers for your new business Finding customers for your new business Finding customers for your new business Finding",
      category: "category",
      description: "description",
      image: '\\images\\templates\\free-1\\banner-1.png',
      question_num: 10,
      answer_num: 10
    },
    {
      question_title: "Finding customers for your new business Finding customers for your new business Finding customers for your new business Finding",
      category: "category",
      description: "description",
      image: '\\images\\templates\\free-1\\banner-1.png',
      question_num: 10,
      answer_num: 10
    },
    {
      question_title: "Finding customers for your new business Finding customers for your new business Finding customers for your new business Finding",
      category: "category",
      description: "description",
      image: '\\images\\templates\\free-1\\banner-1.png',
      question_num: 10,
      answer_num: 10
    },
    {
      question_title: "Finding customers for your new business Finding customers for your new business Finding customers for your new business Finding",
      category: "category",
      description: "description",
      image: '\\images\\templates\\free-1\\banner-1.png',
      question_num: 10,
      answer_num: 10
    },
    {
      question_title: "Finding customers for your new business Finding customers for your new business Finding customers for your new business Finding",
      category: "category",
      description: "description",
      image: '\\images\\templates\\free-1\\banner-1.png',
      question_num: 10,
      answer_num: 10
    },
    {
      question_title: "Finding customers for your new business Finding customers for your new business Finding customers for your new business Finding",
      category: "category",
      description: "description",
      image: '\\images\\templates\\free-1\\banner-1.png',
      question_num: 10,
      answer_num: 10
    }

  ]);

  useEffect(() => {
    setData(...data, news)
    // fetch({ pagination });
  }, [])

  const moreActivities = async (params = {}) => {
    const updatedCarsArray = [...data, ...newsTemp];
    // console.log('Activities')
    setData(updatedCarsArray)
  };

  const columns = [
    {
      title: 'กระทู้',
      dataIndex: 'question_title',
      key: 'question_title',
      render: question_title => <a href="/template/free/borad">{question_title}</a>,
    },
    {
      title: 'ดู',
      dataIndex: 'question_num',
      key: 'question_num',
      width: '5%',
    },
    {
      title: 'ตอบ',
      dataIndex: 'answer_num',
      key: 'answer_num',
      width: '5%',
    },

  ]

  return (
    <div>


      <div class="grid md:grid-cols-1 sm:grid-cols-1  gap-4">
        {
          data.map((obj) => {
            return <div class="inline-block mb-4">
              <Divider orientation="left"> ความคิดเห็นที่ .... </Divider>
              <div class="p-1">
                <div class=" tracking-wide text-sm text-indigo-500 font-semibold">[ 6 ตุลาคม 2564 | USER ]
                  <a href="#" class="ml-1 mt-1 text-lg leading-tight font-medium text-black hover:underline"> Finding customers for your new business Finding customers for your new business Finding customers for your new business Finding customers for your new business</a>
                </div>

              </div>
            </div>

          })
        }
      </div>
      <Divider className="mb-4 mt-4"

      ><p
        onClick={() => moreActivities()}
        style={{
          paddingLeft: "1em",
          paddingRight: "1em",
          cursor: 'pointer'
        }}>ดูเพิ่ม <ArrowDownOutlined /> </p></Divider>
      <Divider orientation="left"> แสดงความคิดเห็น </Divider>
      <TextArea rows={4} />
      <Button
        // type="primary"
        style={{
          backgroundColor: '#059669',
          borderColor: '#059669',
          height: 40,
          width: 110,
          // marginBottom: '0px !important',
          color: 'white !important',
          marginBottom: '20px',
          marginTop: '10px',
        }}
        htmlType="submit"
        className="text-center bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full lg:w-1/4"
      >
        <Text className="text-custom-white ">บันทึก</Text>
      </Button>
    </div>
  )
}
