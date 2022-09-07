import React from 'react';
import Carousel from '../Slider';
import { Container } from '../UI/Container';
import styles from './styles.module.scss';

const Reviews = () => {
  return (
    <section className={styles.reviews} id="reviews">
      <Container>
        <h2>Отзывы</h2>
        <Carousel />
      </Container>
    </section>
  );
};

export default Reviews;
