import Link from 'next/link';
import { Layout, Menu, Breadcrumb, Image, Row, Col } from 'antd';
import Cookies from 'js-cookie';
import Router, { useRouter } from 'next/router';
import { useState } from 'react';
const _Header = ({ props }) => {
  const [active, setActive] = useState(false);

  const handleLogout = (e) => {
    e.preventDefault()
    console.log("handleLogout")
    Cookies.remove('token')
    Router.push('/login');
  };


  return (
    <>
      <Row className="">
        <Col span={24}>
          <nav className="z-50 w-full flex items-center  flex-wrap  h-14  bg-white pt-1 pb-1">
            <div className="lg:w-1/6 xl:w-1/6 2xl:w-1/6 sm:w-3/6 md:w-3/6 pl-3 lg:hidden ">
              <Link href="/">
                <a className="inline-flex items-center p-2 mr-4 ">
                  <img
                    className="h-7 w-auto"
                    src='assets/images/logo-government.png'
                  />
                </a>
              </Link>
            </div>

            <button
              className="pr-3 inline-flex p-3 hover:bg-green-600 rounded lg:hidden text-green-900 ml-auto hover:text-white outline-none mr-1"

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
            {/* <div
                className={`${active ? '' : 'hidden'
                  } bg-white w-full lg:inline-flex lg:flex-grow sm:w-6/6 lg:w-4/6 justify-center pl-3 pr-3 content-center`}
              >
                <div className="text-center lg:inline-flex lg:flex-row lg:w-auto w-full lg:items-center justify-center items-start  flex flex-col lg:h-auto">
                  <Link href="/#property">
                    <a
                      className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-green-900 font-bold items-center justify-center   hover:text-green-900 "
                    >
                      คุณสมบัติ
                    </a>
                  </Link>
                  <Link href="/#package">
                    <a
                      className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-green-900 font-bold items-center justify-center  hover:text-green-900"
                    >
                      แพคเกจ
                    </a>
                  </Link>
                  <Link href="/#contact">
                    <a
                      className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-green-900 font-bold items-center justify-center hover:text-green-900"
                    >
                      ติดต่อเรา
                    </a>
                  </Link>
                </div>
                <div className="lg:hidden h-1 border-t-2 border-gray-200"></div>
              </div> */}
            <div
              className={`${active ? '' : 'hidden'
                }  text-center bg-white w-full lg:inline-flex lg:flex-grow lg:w-1/6 justify-end sm:h-12 md:h-12 px-2 items-center pb-18`}
            >
              <div className="lg:inline-flex lg:flex-row lg:w-auto w-full lg:items-center justify-center items-start  flex flex-col lg:h-auto">


                <Link
                 href="#"
                >
                  <a
                    onClick={(e) => handleLogout(e)}
                    className="lg:inline-flex lg:w-auto w-full px-2 py-2 rounded h-8 text-white bg-red-600 font-bold items-center justify-center hover:bg-red-600 hover:text-white"
                  >
                    ออกจากระบบ
                  </a>
                </Link>
                <div className="lg:hidden h-4"></div>
              </div>
            </div>
          </nav>
        </Col>
      </Row>
    </>
  );
};

export default _Header;
