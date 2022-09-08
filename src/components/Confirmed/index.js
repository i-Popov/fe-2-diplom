import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { numSpc } from '../../helpers';
import { Container } from '../UI/Container';
import iconRuble from '../../assets/images/icon_ruble.png';
import iconOrderTicketSend from '../../assets/images/icon_order_ticket_send.png';
import iconOrderTicketPrint from '../../assets/images/icon_order_ticket_print.png';
import iconOrderTicketPresent from '../../assets/images/icon_order_ticket_present.png';
import iconRateService from '../../assets/images/icon_rate_service.png';
import styles from './styles.module.scss';

const OrderConfirmed = (props) => {
  return (
    <section>
      <div className={styles.success}>
        <Container>
          <h2>Благодарим Вас за заказ!</h2>
        </Container>
      </div>
      <div className={styles.data}>
        <Container>
          <div className={styles.data__row}>
            <div className={styles.data__number}>
              <h4>№Заказа 285АА</h4>
              <div className={styles.data__number__sum}>
                <p className={styles.data__number__text}>сумма</p>
                <p className={styles.data__number__total}>
                  {numSpc(props.ticketsAdult * props.payAdult + props.ticketsChild * props.payChild)}
                  <img src={iconRuble} alt="..." />
                </p>
              </div>
            </div>
            <div className={styles.data__info}>
              <div className={styles.data__info__row}>
                <div className={styles.data__info__item}>
                  <img src={iconOrderTicketSend} alt="..." />
                  <p>
                    Билеты будут отправлены на ваш <br /> <strong>e-mail</strong>
                  </p>
                </div>
                <div className={styles.data__info__item}>
                  <img src={iconOrderTicketPrint} alt="..." />
                  <p>
                    {' '}
                    <strong>Распечатайте</strong> и сохраняйте билеты до даты поездки
                  </p>
                </div>
                <div className={styles.data__info__item}>
                  <img src={iconOrderTicketPresent} alt="..." />
                  <p>
                    <strong>Предьявите</strong> распечатанные билеты при посадке
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.data__thanks}>
              <h2>
                {props.firstName} {props.patronymic}!
              </h2>
              <p>
                Ваш заказ успешно оформлен. <br /> В ближайшее время с вами свяжется наш оператор для подтверждения.
              </p>
              <p className={styles.data__thanks__text}>
                Благодарим Вас за оказанное доверие и желаем приятного путешествия!
              </p>
            </div>
            <div className={styles.data__rate}>
              <div className={styles.data__rate__star}>
                <h4>Оценить сервис</h4>
                <div className={styles.data__rate__img}>
                  <img src={iconRateService} alt="..." />
                  <img src={iconRateService} alt="..." />
                  <img src={iconRateService} alt="..." />
                  <img src={iconRateService} alt="..." />
                  <img src={iconRateService} alt="..." />
                </div>
              </div>
              <div className={styles.data__rate__button}>
                <NavLink to="/" type="button">
                  вернуться на главную
                </NavLink>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => {
  return {
    ticketsAdult: state.passengersAndPay.ticketsAdult,
    payAdult: state.passengersAndPay.payAdult,
    ticketsChild: state.passengersAndPay.ticketsChild,
    payChild: state.passengersAndPay.payChild,
    firstName: state.orderTicketsSeats.user.first_name,
    patronymic: state.orderTicketsSeats.user.patronymic,
  };
};

export default connect(mapStateToProps)(OrderConfirmed);
