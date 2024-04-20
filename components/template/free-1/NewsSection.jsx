import { Divider } from 'antd';
export default function News({ news }) {

  return (
    <div>

      <Divider orientation="left"><div class="uppercase tracking-wide text-2xl  font-semibold mb-2 ">ข่าวประชาสัมพันธ์</div></Divider>
      <div class="grid md:grid-cols-3 sm:grid-cols-1  gap-4">
        {
          news.map((obj) => {
            return <div class="">

              <div class="md:flex-shrink-0 md:w-2/3">
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
      <p class="text-right"><a href="/template/free/all-news" class="ml-1 mt-1 text-sm leading-tight font-medium text-black hover:underline">ข่าวประชาสัมพันธ์ทั้งหมด</a></p>
    </div>
  )
}
