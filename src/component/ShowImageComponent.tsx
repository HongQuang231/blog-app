import { useState, useEffect } from "react";
import swiper from "swiper";
import { getHomeImage } from "../api/homeApi";
import { IHome } from "../interface/MainPageInterface";
import SwiperComponent from "./SwiperComponent";
import { navigationSocial } from "../data/fakeData";

const ShowImageComponent = () => {
  const [dataMainPage, setDataMainPage] = useState<IHome[]>();

  useEffect(() => {
    getHomeImage().then((image) => {
      setDataMainPage(image)
    })
  }, [])
  return (
    <>
      {dataMainPage && (
        <div className="flex">
          <div className="flex-1 flex items-center justify-center custom-home-swipper">
            <SwiperComponent dataHome={dataMainPage} />
          </div>
          <div className="w-0 flex justify-center items-center gap-20 md:gap-10 rotate-90">
            {navigationSocial.map(data => (
              <a href={data.href} className="text-sm font-semibold leading-6 text-white">
                {data.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default ShowImageComponent;