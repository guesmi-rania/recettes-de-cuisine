// src/components/Slider.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import '../styles/Slider.css';

const Slider = () => {
  return (
    <div className="slider-container">
      <Swiper
        className="custom-swiper"
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
      >
        <SwiperSlide>
          <img
            src="/images/delicious-cake-with-fruits-chocolate.jpg"
            alt="Gâteau aux fruits et chocolat"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="/images/delicious-candy-bar-with-mousse-desserts-biscuits-shape-hearts.jpg"
            alt="Barres chocolatées et mousse"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="/images/different-fresh-donuts-with-confetti-blue-background.jpg"
            alt="Donuts colorés"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slider;
