import { Divider } from 'antd';
export default function News({ banners }) {

  return (
    <div style={{ paddingBottom: "20px" }}>

      <Divider orientation="left"><div class="uppercase tracking-wide text-2xl  font-semibold mb-2 ">ลิงค์หน่วยงานที่เกี่ยวข้อง</div></Divider>
      <div class="grid md:grid-cols-6 sm:grid-cols-1  gap-4">
        {
          banners.map((obj) => {
            return <div class="">

              <div class="md:flex-shrink-0 md:w-full">
                <img class="h-auto w-full object-fill md:h-full " src={obj.image} alt="Man looking at item at a store" />
              </div>

            </div>

          })
        }
      </div>
    </div>
  )
}
