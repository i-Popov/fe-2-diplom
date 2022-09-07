import React from 'react';
import { ucFL, numSpc } from '../../helpers';
import iconRuble from '../../assets/images/icon_ruble.png';
import iconWifiRocketCup from '../../assets/images/icons_wifiRocketCup.png';
import styles from './styles.module.scss';

const LastTickets = (props) => {
  return (
    <div className={styles.lastTicket}>
      <div className={styles.lastTicket__route}>
        <div>
          <p className={styles.lastTicket__route__city}>{ucFL(props.state.departure.from.city.name)}</p>
          <p className={styles.lastTicket__route__station}>{props.state.departure.from.railway_station_name}</p>
        </div>
        <div className={styles.lastTicket__route__right}>
          <p className={styles.lastTicket__route__city}>{ucFL(props.state.departure.to.city.name)}</p>
          <p className={styles.lastTicket__route__station}>{props.state.departure.to.railway_station_name}</p>
        </div>
      </div>
      <div className={styles.lastTicket__cost}>
        <div className={styles.lastTicket__cost__service}>
          <img src={iconWifiRocketCup} alt="Wi-Fi" />
        </div>
        <div className={styles.lastTicket__cost__price}>
          <p className={styles.lastTicket__cost__from}>от</p>
          <p className={styles.lastTicket__cost__rub}>{numSpc(props.state.min_price)}</p>
          <img src={iconRuble} alt="Рубль" />
        </div>
      </div>
    </div>
  );
};

export default LastTickets;
