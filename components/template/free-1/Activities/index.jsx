import { ArrowDownOutlined } from "@ant-design/icons";
import { Divider } from 'antd';
import React, { useEffect, useState } from "react";

export default function Index({ activities }) {
  const [data, setData] = useState([])

  const [activitiesTemp, setActivitiesTemp] = useState([
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
    setData(...data, activities)
    // fetch({ pagination });
  }, [])

  const moreActivities = async (params = {}) => {
    const updatedCarsArray = [...data, ...activitiesTemp];
    // console.log('Activities')
    setData(updatedCarsArray)
  };

  return (
    <div>


      <div class="grid md:grid-cols-1 sm:grid-cols-1  gap-4">
        {
          data.map((obj) => {
            return <div class="inline-block mb-4">

              <div class=" md:w-1/3 float-left mr-4">
                <img class="h-auto w-full object-fill md:h-full " src={obj.image} alt="Man looking at item at a store" />
              </div>
              <div class="p-4">
                <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Case study</div>
                <a href="#" class="block mt-1 text-lg leading-tight font-medium text-black hover:underline">Finding customers for your new business</a>
                <p class="mt-2 text-gray-500">Getting a new business off the ground is a lot of hard work. Here are five ideas you can use to find your first customers.</p>
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
