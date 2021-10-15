import Link from 'next/link';
import { Row, Col, Typography } from 'antd';
const { Title } = Typography;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

library.add(fas, fab, far);

export default function Footer() {
  return (
    <footer className="bg-black text-white p-8">
      <div className="grid divide-y divide-white">
        <div className="grid lg:grid-cols-8  gap-4 pb-5">
          <div className="col-span-5 pl-3 pr-3">
            <span className="text-white text-xl">ติดต่อเรา</span><br />
            <div className="mt-1.5">
              <span className="text-white text-sm mt-0.5">ห้างหุ้นส่วนจำกัด ไอซีที อินทิเกรเตอร์ 299/139 หมู่บ้านกาญจน์กนกวิลล์ 10 หมู่ที่ 6 ต.สันผักหวาน อ.หางดง จ.เชียงใหม่ 50230</span><br />
            </div>

          </div>
         
          <div className="pl-3 lg:col-span-2 col-span-5 lg:justify-self-end pr-3 text-center lg:text-left">
            <div>
              <a className=' text-white hover:text-white' href="tel:+66652659288">
                <FontAwesomeIcon icon={['fas', 'phone']} className="mr-1" /> 06-5265-9288
              </a>
            </div>
            <div>
              <a className=' text-white hover:text-white' href="mailto:ictintegrator.co@gmail.com">
                <FontAwesomeIcon icon={['fas', 'envelope']} className="mr-1" /> ictintegrator.co@gmail.com
              </a>
            </div>
            <div>
              <a className=' text-white hover:text-white' target='_blank' href='https://lin.ee/akjH02U'>
                <FontAwesomeIcon icon={['fab', 'line']} className="mr-1" /> LineID : @icti

              </a>
            </div>
          </div>
       

          <div className='pr-3 w-full lg:col-span-1 col-span-5 text-center'>
            <div>
              <Link href='/register'>
                <a className='lg:inline-flex  w-full px-3 py-2 rounded h-8 text-white bg-green-600 font-bold items-center justify-center hover:bg-green-600 hover:text-white'>
                  สมัครใช้งาน
                </a>
              </Link>
            </div>
            <div className='mt-1.5'>
              <Link href='/login' >
                <a className='lg:inline-flex w-full px-3 py-2 rounded h-8 text-gray-700 bg-white font-bold items-center justify-center hover:bg-white hover:text-gray-700'>
                  เข้าสู่ระบบ
                </a>
              </Link>
            </div>

          </div>
        </div>
        <div className='pt-3 flex lg:justify-between grid lg:grid-cols-8 text-center lg:text-left'>
          <div className='pl-3 pr-3 lg:col-span-7 col-span-8'>
            <span className='text-sm'>© Government, Inc. 2021. Web Content Mangement System</span>
          </div>
          <div className='pr-3 pl-3 lg:col-span-1 col-span-8 lg:justify-self-end'>
            
          <span> 
            <a className=' text-white hover:text-white' target='_blank'  href="https://www.facebook.com/Spider-Gov-552060354858001/?ref=page_internal"
                  target="https://www.facebook.com/Spider-Gov-552060354858001/?ref=page_internal">
            Follow us:  <FontAwesomeIcon icon={['fab', 'facebook']} className="ml-2 mr-1 text-lg" />

            </a></span>
          </div>
        </div>
      </div>



    </footer>
  );
}
