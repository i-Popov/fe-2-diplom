import React from 'react';
import styles from './styles.module.scss';

const ProgressLine = (props) => {
  return (
    <section>
      <ul className={styles.progress}>
        <li className={`${styles.progress__part} ${styles.completed} ${styles.big}`}>
          <p className={styles.progress__part__number}>1</p>
          <p className={styles.progress__part__title}>Билеты</p>
          <img src={props.tickets} alt="..." />
        </li>
        <li
          className={`${styles.progress__part} ${props.passengersClass === '' ? '' : styles.completed} ${styles.small}`}
        >
          <p className={styles.progress__part__number}>2</p>
          <p className={styles.progress__part__title}>Пассажиры</p>
          <img src={props.passengers} alt="..." />
        </li>
        <li className={`${styles.progress__part} ${props.paymentClass === '' ? '' : styles.completed} ${styles.small}`}>
          <p className={styles.progress__part__number}>3</p>
          <p className={styles.progress__part__title}>Оплата</p>
          <img src={props.payment} alt="..." />
        </li>
        <li className={`${styles.progress__part} ${props.checkClass === '' ? '' : styles.completed} ${styles.big}`}>
          <p className={styles.progress__part__number}>4</p>
          <p className={styles.progress__part__title}>Проверка</p>
        </li>
      </ul>
    </section>
  );
};

export default ProgressLine;
