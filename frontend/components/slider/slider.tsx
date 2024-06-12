'use client';

import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './styles.scss';

// import required modules
import { Pagination, Autoplay, Navigation } from 'swiper/modules';

export default function Slider() {
  return (

    <Swiper
      slidesPerView={1}
      spaceBetween={30}
      loop={true}
      pagination={{
        clickable: true,
      }}
      navigation={{
        nextEl: '.swiper-button-forward',
        prevEl: '.swiper-button-backward',
      }}
      modules={[Pagination, Autoplay,Navigation]}

      className='swiper'
      autoplay={{
        delay: 5000
      }}

    >
      <SwiperSlide>
        <img src="https://mayak-music.com.ua/image/cache/catalog/%D0%91%D0%90%D0%9D%D0%9D%D0%95%D0%A0%D0%AB/EarthSeries_Banner-1920x464.jpg">
        </img>
      </SwiperSlide>
      <SwiperSlide>
        <img src="https://mayak-music.com.ua/image/cache/catalog/%D0%91%D0%90%D0%9D%D0%9D%D0%95%D0%A0%D0%AB/yamaha-p145-banner-1920x464.jpg">
        </img>
      </SwiperSlide>
      <SwiperSlide>
        <img src="https://jam.ua/files/images/cort/x_series/X_series-banner-2018.jpg">
        </img>
      </SwiperSlide>


      <SwiperSlide>Slide 4</SwiperSlide>
      <div className="swiper-button-backward">
        <span className="material-symbols-outlined">
          chevron_left
        </span>
      </div>
      <div className="swiper-button-forward">
        <span className="material-symbols-outlined">
          chevron_right
        </span>
      </div>
    </Swiper >

  );
}
