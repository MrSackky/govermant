import { ArrowDownOutlined } from "@ant-design/icons";
import { Divider } from 'antd';
import React, { useEffect, useState } from "react";

export default function Index({ news }) {
  const [data, setData] = useState([])

  const [newsTemp, setNewsTemp] = useState([
    {
      title: "title",
      category: "category",
      description: "description",
      image: '..\\..\\images\\templates\\free-1\\banner-1.png',
    },
    {
      title: "title",
      category: "category",
      description: "description",
      image: '..\\..\\images\\templates\\free-1\\banner-1.png',

    },
    {
      title: "title",
      category: "category",
      description: "description",
      image: '..\\..\\images\\templates\\free-1\\banner-1.png',


    },
    {
      title: "title",
      category: "category",
      description: "description",
      image: '..\\..\\images\\templates\\free-1\\banner-1.png',


    },
    {
      title: "title",
      category: "category",
      description: "description",
      image: '..\\..\\images\\templates\\free-1\\banner-1.png',

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

  return (
    <div>


      <div class="grid md:grid-cols-1 sm:grid-cols-1  gap-4">
        {
          data.map((obj) => {
            return <div class="inline-block mb-4">

              <div class="p-1">
                <div class=" tracking-wide text-sm text-indigo-500 font-semibold">[ 6 ตุลาคม 2564 ]
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
    </div>
  )
}
