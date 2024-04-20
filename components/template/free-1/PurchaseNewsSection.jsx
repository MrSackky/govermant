import { Divider } from 'antd';
// import styles from '../../../styles/templateBasic.module.scss';

export default function PurchaseNews({ news }) {

  return (
    <div style={{
      marginBottom: '25px',

    }}>
      <Divider orientation="left" style={{ marginBottom: "0px" }}><div class="uppercase tracking-wide text-2xl  font-semibold mb-2 ">ข่าวจัดซื้อจัดจ้าง</div></Divider>

      <div class="grid " style={{
        paddingLeft: '25px'
      }}>
        {
          news.map((obj) => {
            return <div class="">

              <div class="p-1">
                <div class=" tracking-wide text-sm text-indigo-500 font-semibold">[ 6 ตุลาคม 2564 ]
                  <a href="#" class="ml-1 mt-1 text-lg leading-tight font-medium text-black hover:underline"> Finding customers for your new business Finding customers for your new business Finding customers for your new business Finding customers for your new business</a>
                </div>

              </div>
            </div>

          })
        }
      </div>
      <p class="text-right"><a href="/template/free/all-purchase-news" class="ml-1 mt-1 text-sm leading-tight font-medium text-black hover:underline">ข่าวจัดซื้อจัดจ้างทั้งหมด</a></p>

    </div>
  )
}
