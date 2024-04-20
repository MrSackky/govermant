import { ArrowDownOutlined } from "@ant-design/icons";
import { Divider, Table } from 'antd';
import React, { useEffect, useState } from "react";

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
        <Table columns={columns} dataSource={data} pagination={false} style={{ marginBottom: "15px" }} />
      </div>
      <Divider className="mb-4 mt-4"

      ><p
        onClick={() => moreActivities()}
        style={{
          paddingLeft: "1em",
          paddingRight: "1em",
          cursor: 'pointer'
        }}>ดูเพิ่ม <ArrowDownOutlined /> </p></Divider>
    </div>
  )
}
