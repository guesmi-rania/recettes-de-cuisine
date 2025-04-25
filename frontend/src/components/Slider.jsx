import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import '../styles/Slider.css'; // Pour les styles personnalisés si tu veux

const Slider = () => {
  return (
    <div className="slider-container">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
      >
        <SwiperSlide><img src="/images/delicious-cake-with-fruits-chocolate.jpg" alt="Slide 1" /></SwiperSlide>
        <SwiperSlide><img src="/images/delicious-candy-bar-with-mousse-desserts-biscuits-shape-hearts.jpg" alt="Slide 2" /></SwiperSlide>
        <SwiperSlide><img src="/images/different-fresh-donuts-with-confetti-blue-background.jpg" alt="Slide 3" /></SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slider;
