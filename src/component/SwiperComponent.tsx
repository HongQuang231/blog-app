//import liraries
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import { dataMain } from '../data/fakeData';
import { getHomeImage } from '../api/homeApi';
import { IHome } from '../interface/MainPageInterface';

interface ISwiper {
  dataHome: IHome[];
}
const SwiperComponent = (props: ISwiper) => {
  const { dataHome } = props
  let timeout: any;
  const [swiper, onSwiperChange] = useState(0)
  const [mainDescription, setMainDescription] = useState<IHome>(dataHome[0]);

  useEffect(() => {
    const eleWrapper = document.getElementById('wrapper-des')
    if (eleWrapper && dataHome) {
      if (eleWrapper.classList.contains('animate-fade-up')) {
        eleWrapper.classList.remove("animate-fade-up");
      }
      timeout = setTimeout(() => {
        setMainDescription(dataHome[swiper]);
        eleWrapper.classList.add("animate-fade-up");
      }, 300)
    }
    return () => clearTimeout(timeout);
  }, [swiper])

  return (
    <>
      <div className="w-96 w-28em w-42em">
        {mainDescription && (
          <div className='mt-4' id='wrapper-des'>
            <div className='flex items-center justify-start gap-x-6'>
              <div className="text-xl text-white font-semibold">{
                swiper < 9 ? '0' + (swiper + 1) : swiper + 1
              }</div>
              <div className="text-xl text-white font-semibold w-full">{mainDescription.title}</div>
              <div className="w-full">
                <div className='bg-white h-1 w-full rounded-md'></div>
              </div>
            </div>
            <div className="font-normal text-white text-sm p-5">{mainDescription.description}</div>
          </div>
        )}
      </div>
      {dataHome &&
        <Swiper
          effect={'cards'}
          grabCursor={true}
          modules={[EffectCards]}
          className="mySwiper swiper-shadow width-height-swipper"
          initialSlide={swiper}
          onSlideChange={(swiper: SwiperClass) => {
            onSwiperChange(swiper.activeIndex)
          }}
        >
          {dataHome.map(main => {
            return (
              <SwiperSlide style={{ borderRadius: 18 }} key={main.id}>
                {
                  Number(main.id) === 1 ? (
                    <iframe className='width-height-swipper' src={main.linkImage} ></iframe>
                  ) : (
                    <img
                      src={main.linkImage}
                      alt=""
                      className='w-full h-full'
                      id={main.id + ''}
                    />
                  )
                }

              </SwiperSlide>
            )
          })}
        </Swiper>
      }
    </>
  );
};

export default SwiperComponent;
