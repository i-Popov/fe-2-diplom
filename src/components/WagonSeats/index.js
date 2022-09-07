import React, { useState } from 'react';
import { numSpc } from '../../helpers';
import iconRubSmall from '../../assets/images/icon_ruble_small.png';
import iconRub from '../../assets/images/icon_ruble.png';
import airImg from '../../assets/images/icon_vagon_conditioner.png';
import airCheckedImg from '../../assets/images/icon_vagon_conditioner_checked.png';
import wifiImg from '../../assets/images/icon_vagon_wifi.png';
import wifiCheckedImg from '../../assets/images/icon_vagon_wifi_checked.png';
import wearImg from '../../assets/images/icon_vagon_linens.png';
import wearCheckedImg from '../../assets/images/icon_vagon_linens_checked.png';
import foodImg from '../../assets/images/icon_vagon_cup.png';
import foodCheckedImg from '../../assets/images/icon_vagon_cup_checked.png';
import styles from './styles.module.scss';

const WagonSeats = (props) => {
  const [air] = useState(props.train.coach.have_air_conditioning ? props.train.coach.have_air_conditioning : false);
  const [wifi] = useState(props.train.coach.have_wifi ? props.train.coach.have_wifi : false);
  const [wear] = useState(props.train.coach.is_linens_included ? props.train.coach.is_linens_included : false);
  const [food] = useState(props.train.coach.have_food ? props.train.coach.have_food : false);

  const seatsMath = Math.ceil(props.train.coach.available_seats / 2);

  const seatFirst = props.train.seats.map((el) => {
    let active = '';
    props.seatNumber.map((find) => (+find === el.index ? (active = 'active') : ''));

    return el.index <= 32 ? (
      <button
        className={`seats-index ${el.available} ${active}`}
        key={el.index}
        disabled={el.available}
        onClick={props.setSeatNumber}
      >
        {el.index}
      </button>
    ) : (
      ''
    );
  });

  const seatSecond = props.train.seats.map((el) => {
    let active = '';
    props.seatNumber.map((find) => (+find === el.index ? (active = 'active') : ''));
    return el.index <= 32 ? (
      ''
    ) : (
      <button
        className={`seats-index two-row ${el.available} ${active}`}
        key={el.index}
        disabled={el.available}
        onClick={props.setSeatNumber}
      >
        {el.index}
      </button>
    );
  });

  return (
    <div className={styles.wagon}>
      <div className={styles.wagon__head}>
        <div className={styles.wagon__head__number}>
          <p className={styles.wagon__head__wagonText}>Вагоны</p>
          <p className={styles.wagon__head__white}>07</p>
          <p className={styles.wagon__head__black}>09</p>
        </div>
        <p className={styles.wagon__head__text}>Нумерация вагонов начинается с головы поезда</p>
      </div>

      <div className={styles.wagon__info}>
        <div className={styles.wagon__info__number}>
          <p className={styles.wagon__info__number__num}>07</p>
          <p className={styles.wagon__info__number__descr}>вагон</p>
        </div>

        <div className={styles.wagon__info__seats}>
          <p className={styles.wagon__info__seats__num}>
            Места <span>{props.train.coach.available_seats}</span>
          </p>
          <p className={styles.wagon__info__seats__item}>
            Верхние <span>{seatsMath}</span>
          </p>
          <p className={styles.wagon__info__seats__item}>
            Нижние <span>{seatsMath}</span>
          </p>
        </div>

        <div className={styles.wagon__info__cost}>
          <p className={styles.wagon__info__cost__rub}>Стоимость</p>
          <p className={styles.wagon__info__cost__life}>
            {numSpc(props.train.coach.top_price)}
            <img src={iconRubSmall} alt="..." />
          </p>
          <p className={styles.wagon__info__cost__life}>
            {numSpc(props.train.coach.bottom_price)}
            <img src={iconRubSmall} alt="..." />
          </p>
        </div>

        <div className={styles.wagon__info__service}>
          <p className={styles.wagon__info__service__fpk}>Обслуживание ФПК</p>
          <div className={styles.wagon__info__service__items}>
            <div className={styles.wagon__info__service__item}>
              <img src={!air ? airImg : airCheckedImg} alt="кондиционер" />
              <p>кондиционер</p>
            </div>
            <div className={styles.wagon__info__service__item}>
              <img src={!wifi ? wifiImg : wifiCheckedImg} alt="WI-FI" />
              <p>WiFi</p>
            </div>
            <div className={styles.wagon__info__service__item}>
              <img src={!wear ? wearImg : wearCheckedImg} alt="белье" />
              <p>белье</p>
            </div>
            <div className={styles.wagon__info__service__item}>
              <img src={!food ? foodImg : foodCheckedImg} alt="питание" />
              <p>питание</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.wagon__info__people}>
        <p>11 человек выбирают места в этом поезде</p>
      </div>

      <div className="vagon-places-container">
        <img className="image-vagon-places" src={props.image} alt="..." />
        <div className={`train-${props.train.coach.class_type}-container`}>{seatFirst}</div>
        <div className={`train-${props.train.coach.class_type}-container-two`}>{seatSecond}</div>
      </div>

      {props.sumTicketsPay !== 0 && (
        <div className={styles.wagon__info__sum}>
          <p>{numSpc(props.sumTicketsPay)}</p>
          <img src={iconRub} alt="руб" />
        </div>
      )}
    </div>
  );
};

export default WagonSeats;
