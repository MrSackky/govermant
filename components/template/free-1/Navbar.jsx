import Head from 'next/head'
import { Row, Col, Divider, Typography  } from 'antd';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router'

export default function Navbar() {
        const route = useRouter()
        const { Title } = Typography;
        const [active, setActive] = useState(false);

        const handleClick = () => {
          setActive(!active);
        };
return (
    <>
       <nav className="fixed z-50 w-full flex items-center flex-wrap  h-14  bg-white pt-1 pb-1 lg:px-24 md:px-12 px-1 bg-green-100">
       <div className="lg:w-1/6 xl:w-1/6 2xl:w-1/6 sm:w-3/6 md:w-3/6 pl-3 cursor-pointer">
        <Link href="/">
              <img
                className="h-7 w-auto"
                src={'\\images\\logo-government.png'}
                alt="logo"
              />
          </Link>
        </div>

        <button
          className="pr-3 inline-flex p-3 hover:bg-green-600 rounded lg:hidden text-green-900 ml-auto hover:text-white outline-none mr-1"
          onClick={handleClick}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <div
          className={`${
            active ? '' : 'hidden'
          } bg-white w-full lg:inline-flex lg:flex-grow sm:w-6/6 lg:w-4/6 justify-end  pl-3 pr-3 content-center bg-green-100`}
        >
          <div className="text-center lg:inline-flex lg:flex-row lg:w-auto w-full lg:items-center justify-center items-start  flex flex-col lg:h-auto">
              <div
                onClick={handleClick}
                className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-green-900 font-bold items-center justify-center   hover:text-green-900  cursor-pointer"
              >
                หน้าหลัก
              </div>
              <div
                onClick={handleClick}
                className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-green-900 font-bold items-center justify-center  hover:text-green-900 cursor-pointer"
              >
                คลังเอกสาร
              </div>
              <div
                onClick={handleClick}
                className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-green-900 font-bold items-center justify-center hover:text-green-900 cursor-pointer"
              >
                ร้องเรียนการทุจริต
              </div>
              <div
                onClick={handleClick}
                className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-green-900 font-bold items-center justify-center hover:text-green-900 cursor-pointer"
              >
                สำรวจความคิดเห็น
              </div>
              <div
                onClick={handleClick}
                className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-green-900 font-bold items-center justify-center hover:text-green-900 cursor-pointer"
              >
                ติดต่อเรา
              </div>
          </div>
          <div className="lg:hidden h-1 border-t-2 border-gray-200"></div>
        </div>
      </nav>
    </>
)
}