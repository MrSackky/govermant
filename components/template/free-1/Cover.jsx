import { Carousel, Image, Menu } from 'antd';
const { SubMenu } = Menu;
export default function Covers({ banners }) {

  return (
    <Carousel
      draggable
      key={'banner'}
      autoplaySpeed={5000}
      lazyLoad
      autoplay>
      {
        banners.map((obj) => {
          return <div>
            <Image
              // width={200}
              preview={false}
              className="w-full"
              src={obj}
            />
          </div>
        })
      }
    </Carousel>
  )
}
