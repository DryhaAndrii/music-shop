'use client';

import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './styles.scss';

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
      modules={[Pagination, Autoplay, Navigation]}

      className='swiper'
      autoplay={{
        delay: 5000
      }}

    >
      <SwiperSlide>
        <img src="/images/SliderBanners/slider3.jpg">
        </img>
      </SwiperSlide>
      <SwiperSlide>
        <img src="/images/SliderBanners/slider4.jpg">
        </img>
      </SwiperSlide>
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
