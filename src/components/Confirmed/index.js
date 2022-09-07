import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { numSpc } from '../../helpers';
import iconRuble from '../../assets/images/icon_ruble.png';
import iconOrderTicketSend from '../../assets/images/icon_order_ticket_send.png';
import iconOrderTicketPrint from '../../assets/images/icon_order_ticket_print.png';
import iconOrderTicketPresent from '../../assets/images/icon_order_ticket_present.png';
import iconRateService from '../../assets/images/icon_rate_service.png';

const OrderConfirmed = (props) => {
  return (
    <div>
      <div>
        <div>
          <h2>Благодарим Вас за заказ!</h2>
          <div>
            <div>
              <h4>№Заказа 285АА</h4>
              <div>
                <p>сумма</p>
                <p>
                  {numSpc(props.ticketsAdult * props.payAdult + props.ticketsChild * props.payChild)}
                  <img src={iconRuble} alt="..." />
                </p>
              </div>
            </div>
            <div>
              <div>
                <div>
                  <div>
                    <div>
                      <img src={iconOrderTicketSend} alt="..." />
                    </div>
                    <p>
                      билеты будут
                      <br />
                      отправлены
                      <br />
                      на ваш e-mail
                    </p>
                  </div>
                  <div>
                    <div>
                      <img src={iconOrderTicketPrint} alt="..." />
                    </div>
                    <p>распечатайте и сохраняйте билеты до даты поездки</p>
                  </div>
                  <div>
                    <div>
                      <img src={iconOrderTicketPresent} alt="..." />
                    </div>
                    <p>предьявите распечатанные билеты при посадке</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2>
                {props.firstName} {props.patronymic}!
              </h2>
              <p>Ваш заказ успешно оформлен.</p>
              <p>В ближайшее время с вами свяжется наш оператор для подтверждения.</p>
              <h4>Благодарим Вас за оказанное доверие и желаем приятного путешествия!</h4>
            </div>
            <div>
              <div>
                <h4>Оценить сервис</h4>
                <div>
                  <img src={iconRateService} alt="..." />
                  <img src={iconRateService} alt="..." />
                  <img src={iconRateService} alt="..." />
                  <img src={iconRateService} alt="..." />
                  <img src={iconRateService} alt="..." />
                </div>
                <div>
                  <NavLink to="/" type="button">
                    вернуться на главную
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
