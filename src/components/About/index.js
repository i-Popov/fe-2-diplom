import React from 'react';
import styles from './styles.module.scss';
import { Container } from '../UI/Container';

const About = () => {
  return (
    <section className={styles.about} id="about">
      <Container>
        <h2 className={styles.about__title}>о нас</h2>
        <div className={styles.about__description}>
          <p>
            Мы рады видеть вас! Мы работаем для Вас с 2003 года. 14 лет мы наблюдаем, как с каждым днем <br /> все
            больше людей заказывают жд билеты через интернет.
          </p>
          <p>
            Сегодня можно заказать железнодорожные билеты онлайн всего в 2 клика, но стоит ли это делать? <br /> Мы
            расскажем о преимуществах заказа через интернет.
          </p>
          <p className={styles.about__description__bold}>
            Покупать жд билеты дешево можно за 90 суток до отправления поезда. <br /> Благодаря динамическому
            ценообразованию цена на билеты в это время самая низкая.
          </p>
        </div>
      </Container>
    </section>
  );
};

export default About;
