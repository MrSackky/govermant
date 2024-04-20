import { Button, Divider, Input, Radio, Space, Typography } from 'antd';
import React, { useEffect, useState } from "react";
const { TextArea } = Input;
const { Text } = Typography;
Text
export default function Index({ news }) {
  const [data, setData] = useState([])
  const [dataDetailPoll, setDataDetailPoll] = useState('<h2 style="box-sizing: border-box; border-width: 0px; border-style: solid; border-color: rgba(229, 231, 235, var(--tw-border-opacity)); --tw-border-opacity: 1; --tw-shadow: 0 0 #0000; --tw-ring-inset: var(--tw-empty, ); --tw-ring-offset-width: 0px; --tw-ring-offset-color: #fff; --tw-ring-color: rgba(59, 130, 246, 0.5); --tw-ring-offset-shadow: 0 0 #0000; --tw-ring-shadow: 0 0 #0000; margin: 0px 0px 0.5em; padding: 0px; font-size: inherit; font-weight: 500; color: rgba(0, 0, 0, 0.85); font-family: Kanit; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">Taj Mahal: A breathtaking ode to love</h2>' +
    '<p style="box-sizing: border-box; border-width: 0px; border-style: solid; border-color: rgba(229, 231, 235, var(--tw-border-opacity)); --tw-border-opacity: 1; --tw-shadow: 0 0 #0000; --tw-ring-inset: var(--tw-empty, ); --tw-ring-offset-width: 0px; --tw-ring-offset-color: #fff; --tw-ring-color: rgba(59, 130, 246, 0.5); --tw-ring-offset-shadow: 0 0 #0000; --tw-ring-shadow: 0 0 #0000; margin: 0px 0px 1em; color: rgba(0, 0, 0, 0.85); font-family: Kanit; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">No trip to India is complete without visiting this spectacular monument,<span>&nbsp;</span><strong style="box-sizing: border-box; border-width: 0px; border-style: solid; border-color: rgba(229, 231, 235, var(--tw-border-opacity)); --tw-border-opacity: 1; --tw-shadow: 0 0 #0000; --tw-ring-inset: var(--tw-empty, ); --tw-ring-offset-width: 0px; --tw-ring-offset-color: #fff; --tw-ring-color: rgba(59, 130, 246, 0.5); --tw-ring-offset-shadow: 0 0 #0000; --tw-ring-shadow: 0 0 #0000; font-weight: bolder;">counted among the Seven Wonders of the World</strong>.</p>' +
    '<p style="box-sizing: border-box; border-width: 0px; border-style: solid; border-color: rgba(229, 231, 235, var(--tw-border-opacity)); --tw-border-opacity: 1; --tw-shadow: 0 0 #0000; --tw-ring-inset: var(--tw-empty, ); --tw-ring-offset-width: 0px; --tw-ring-offset-color: #fff; --tw-ring-color: rgba(59, 130, 246, 0.5); --tw-ring-offset-shadow: 0 0 #0000; --tw-ring-shadow: 0 0 #0000; margin: 0px 0px 1em; color: rgba(0, 0, 0, 0.85); font-family: Kanit; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">Tourists frequently admit that Taj Mahal "simply cannot be described with words". And that’s probably true. The more you try the more speechless you become. Words give only a semblance of truth. The real truth about its beauty is revealed when you adore<span>&nbsp;</span><strong style="box-sizing: border-box; border-width: 0px; border-style: solid; border-color: rgba(229, 231, 235, var(--tw-border-opacity)); --tw-border-opacity: 1; --tw-shadow: 0 0 #0000; --tw-ring-inset: var(--tw-empty, ); --tw-ring-offset-width: 0px; --tw-ring-offset-color: #fff; --tw-ring-color: rgba(59, 130, 246, 0.5); --tw-ring-offset-shadow: 0 0 #0000; --tw-ring-shadow: 0 0 #0000; font-weight: bolder;">different shades of “Taj” depending on the time of the day</strong><span>&nbsp;</span>or when you admire the exquisite inlay work in different corners of the façade.</p>' +
    '<h3 style="box-sizing: border-box; border-width: 0px; border-style: solid; border-color: rgba(229, 231, 235, var(--tw-border-opacity)); --tw-border-opacity: 1; --tw-shadow: 0 0 #0000; --tw-ring-inset: var(--tw-empty, ); --tw-ring-offset-width: 0px; --tw-ring-offset-color: #fff; --tw-ring-color: rgba(59, 130, 246, 0.5); --tw-ring-offset-shadow: 0 0 #0000; --tw-ring-shadow: 0 0 #0000; margin: 0px 0px 0.5em; padding: 0px; font-size: inherit; font-weight: 500; color: rgba(0, 0, 0, 0.85); font-family: Kanit; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">Masterpiece of the world’s heritage</h3>'
  )

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
      <div>
        <span className='text-xl'>Taj Mahal: A breathtaking ode to love</span>
        <div class=" tracking-wide text-sm text-indigo-500 font-semibold">[ 6 ตุลาคม 2564 ถึง 6 ตุลาคม 2565 ]</div>
        <div dangerouslySetInnerHTML={{ __html: dataDetailPoll ? dataDetailPoll : "" }} />
      </div>
      <Divider />

      <div class="grid md:grid-cols-1 sm:grid-cols-1  gap-4">
        {

          data.map((obj) => {
            return <div class="inline-block mb-1">

              <div class="p-1">

                {obj.no}. Finding customers for your new business Finding customers for your new business Finding customers for your new business Finding customers for your new business<br />
                <Radio.Group >
                  <Space direction="vertical">
                    <Radio value={1}>A new business Finding customers</Radio>
                    <Radio value={2}>B new business Finding customers</Radio>
                    <Radio value={3}>C new business Finding customers</Radio>
                    <Radio value={4}>D new business Finding customers</Radio>
                  </Space>
                </Radio.Group>


              </div>
            </div>

          })
        }
      </div>
      <Button
        // type="primary"
        style={{
          backgroundColor: '#059669',
          borderColor: '#059669',
          height: 40,
          width: 110,
          // marginBottom: '0px !important',
          color: 'white !important',
          marginBottom: '0px',
          marginTop: '10px',
        }}
        htmlType="submit"
        className="text-center bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full lg:w-1/4"
      >
        <Text className="text-custom-white ">ส่งความคิดเห็น</Text>
      </Button>
      <Divider />
    </div>
  )
}
