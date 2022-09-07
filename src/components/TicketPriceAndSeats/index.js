import React from 'react';
import iconRubleSmall from '../../assets/images/icon_ruble_small.png';
import { numSpc } from '../../helpers';
import styles from './styles.module.scss';

const TicketPriceAndSeats = (props) => {
  return (
    <div className={styles.seats}>
      <p className={styles.seats__name}>{props.name}</p>
      <p className={styles.seats__number}>{props.seats}</p>

      <div className={styles.seats__price}>
        <p className={styles.seats__from}>от</p>
        <h4 className={styles.seats__cost}>{numSpc(props.price)}</h4>
        <img className={styles.seats__icon} src={iconRubleSmall} alt="..." />
      </div>
    </div>
  );
};

export default TicketPriceAndSeats;
