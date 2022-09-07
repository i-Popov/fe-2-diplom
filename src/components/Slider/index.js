import React from 'react';
import Slider from 'react-slick';
import data from './SliderData.json';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './styles.module.scss';

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 2500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
  };

  const renderSlides = () =>
    data.slider.map((item, i) => (
      <div className={styles.slider__item} key={i}>
        <div className={styles.slider__image}>
          <img src={item.img} alt={item.title} />
        </div>
        <div className={styles.slider__descr}>
          <p className={styles.slider__descr__title}>{item.title}</p>
          <p className={styles.slider__descr__text}>{item.description}</p>
        </div>
      </div>
    ));

  return <Slider {...settings}>{renderSlides()}</Slider>;
};

export default Carousel;
