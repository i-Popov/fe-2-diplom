import React from 'react';
import { Container } from '../UI/Container';
import comp from '../../assets/images/group_icon1.png';
import build from '../../assets/images/group_icon2.png';
import planet from '../../assets/images/group_icon3.png';
import styles from './styles.module.scss';

const HowItWorks = () => {
  return (
    <section className={styles.work} id="work">
      <Container>
        <div className={styles.work__head}>
          <h2>Как это работает</h2>
          <button>Узнать больше</button>
        </div>
        <div className={styles.work__main}>
          <div className={styles.work__main__item}>
            <img src={comp} alt="Удобный заказ на сайте" />
            <p>Удобный заказ на сайте</p>
          </div>
          <div className={styles.work__main__item}>
            <img src={build} alt="Нет необходимости ехать в офис" />
            <p>Нет необходимости ехать в офис</p>
          </div>
          <div className={styles.work__main__item}>
            <img src={planet} alt="Огромный выбор направлений" />
            <p>Огромный выбор направлений</p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HowItWorks;
