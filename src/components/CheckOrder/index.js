import React from 'react';
import PassengersSideBar from '../PassengersSideBar';
import TicketPriceAndSeats from '../TicketPriceAndSeats';
import Passenger from '../Passenger';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { ucFL, numSpc } from '../../helpers';
import ProgressLine from '../ProgressLine';
import { Container } from '../UI/Container';
import iconRuble from '../../assets/images/icon_ruble.png';
import progressStateSelected from '../../assets/images/progress_state_selected.png';
import iconSearchThere from '../../assets/images/icon_search_there.png';
import iconTicketTrain from '../../assets/images/icon_ticket_train.png';
import iconArrowRightBlack from '../../assets/images/icon_arrow_right_black.png';
import iconSearchBack from '../../assets/images/icon_search_back.png';
import iconWifiRocketCup from '../../assets/images/icons_wifiRocketCup.png';
import styles from './styles.module.scss';

const CheckOrder = (props) => {
  const ticketSelected = props.ticketsArray.find((el) => el.departure._id === props.trainId);
  let fromDateTime = ticketSelected.departure.from.datetime;
  let toDateTime = ticketSelected.departure.to.datetime;
  let duration = ticketSelected.departure.duration;
  let fromArrival = fromDateTime + duration;
  let toArrival = toDateTime + duration;

  const getHours = (msc) => new Date(msc).getHours();
  const getMinutes = (msc) => (new Date(msc).getMinutes() < 10 ? '0' : '') + new Date(msc).getMinutes();

  const passengers = props.seats.map((el, i) => <Passenger key={i} personInfo={el.person_info} />);

  return (
    <>
      <ProgressLine
        tickets={progressStateSelected}
        passengers={progressStateSelected}
        passengersClass="completed"
        payment={progressStateSelected}
        paymentClass="completed"
        checkClass="completed"
      />
      <Container>
        <div className={styles.order}>
          <PassengersSideBar />

          <div className={styles.order__row}>
            <div className={styles.order__title}>
              <h4>Поезд</h4>
            </div>

            <div className={styles.order__ticket}>
              <div className={styles.order__ticket__trainInfo}>
                <div className={styles.order__ticket__trainInfo__img}>
                  <img src={iconTicketTrain} alt="Поезд" />
                </div>
                <div>
                  <h5 className={styles.order__ticket__trainInfo__name}>{ticketSelected.departure.train.name}</h5>
                  <p className={styles.order__ticket__trainInfo__city}>
                    {ucFL(ticketSelected.departure.from.city.name)}
                    <img src={iconArrowRightBlack} alt="..." />
                  </p>
                  <p className={styles.order__ticket__trainInfo__city}>{ucFL(ticketSelected.departure.to.city.name)}</p>
                </div>
              </div>

              <div className={styles.order__ticket__seats}>
                <div className={styles.order__ticket__seatsRow}>
                  <div className={styles.order__ticket__seatsRow__dirRow}>
                    <div className={styles.order__ticket__seatsRow__dir}>
                      <div>
                        <h4>
                          {getHours(fromDateTime)}:{getMinutes(fromDateTime)}
                        </h4>
                        <p className={styles.order__ticket__seatsRow__dir__city}>
                          {ucFL(ticketSelected.departure.from.city.name)}
                        </p>
                        <p className={styles.order__ticket__seatsRow__dir__station}>
                          {ticketSelected.departure.from.railway_station_name}
                        </p>
                      </div>
                      <div className={styles.order__ticket__seatsRow__dir__time}>
                        <p>
                          {getHours(duration)} : {getMinutes(duration)}
                        </p>
                        <img src={iconSearchThere} alt="иконка стрелки вправо" />
                      </div>
                      <div>
                        <h4>
                          {getHours(fromArrival)}:{getMinutes(fromArrival)}
                        </h4>
                        <p className={styles.order__ticket__seatsRow__dir__city}>
                          {ucFL(ticketSelected.departure.to.city.name)}
                        </p>
                        <p className={styles.order__ticket__seatsRow__dir__station}>
                          {ticketSelected.departure.to.railway_station_name}
                        </p>
                      </div>
                    </div>
                    <div className={styles.order__ticket__seatsRow__dir}>
                      <div>
                        <h4>
                          {getHours(toArrival)}:{getMinutes(toArrival)}
                        </h4>
                        <p className={styles.order__ticket__seatsRow__dir__city}>
                          {ucFL(ticketSelected.departure.from.city.name)}
                        </p>
                        <p className={styles.order__ticket__seatsRow__dir__station}>
                          {ticketSelected.departure.from.railway_station_name}
                        </p>
                      </div>
                      <div className={styles.order__ticket__seatsRow__dir__time}>
                        <p>
                          {getHours(duration)} : {getMinutes(duration)}
                        </p>
                        <img src={iconSearchBack} alt="иконка стрелки влево" />
                      </div>
                      <div>
                        <h4>
                          {getHours(toDateTime)}:{getMinutes(toDateTime)}
                        </h4>
                        <p className={styles.order__ticket__seatsRow__dir__city}>
                          {ucFL(ticketSelected.departure.to.city.name)}
                        </p>
                        <p className={styles.order__ticket__seatsRow__dir__station}>
                          {ticketSelected.departure.to.railway_station_name}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className={styles.order__ticket__seatsRow__class}>
                    <div>
                      {ticketSelected.departure.have_fourth_class && (
                        <TicketPriceAndSeats
                          name="Сидячий"
                          seats={ticketSelected.available_seats_info.fourth}
                          price={numSpc(ticketSelected.departure.price_info.fourth.top_price)}
                        />
                      )}
                      {ticketSelected.departure.have_third_class && (
                        <TicketPriceAndSeats
                          name="Плацкарт"
                          seats={ticketSelected.available_seats_info.third}
                          price={numSpc(ticketSelected.departure.price_info.third.top_price)}
                        />
                      )}
                      {ticketSelected.departure.have_second_class && (
                        <TicketPriceAndSeats
                          name="Купе"
                          seats={ticketSelected.available_seats_info.second}
                          price={numSpc(ticketSelected.departure.price_info.second.top_price)}
                        />
                      )}
                      {ticketSelected.departure.have_first_class && (
                        <TicketPriceAndSeats
                          name="Люкс"
                          seats={ticketSelected.available_seats_info.first}
                          price={numSpc(ticketSelected.departure.price_info.first.top_price)}
                        />
                      )}
                    </div>

                    <div className={styles.order__ticket__seatsRow__group}>
                      <img src={iconWifiRocketCup} alt="wifi-rocket-cup" />
                      <NavLink to="/dashboard/tickets" type="button">
                        Изменить
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.order__title}>
              <h4>Пассажиры</h4>
            </div>

            <div className={styles.order__passengers}>
              <div className={styles.order__passengers__row}>{passengers}</div>
              <div className={styles.order__passengers__total}>
                <div>
                  <h4>Всего</h4>
                  <p>
                    {numSpc(props.ticketsAdult * props.payAdult + props.ticketsChild * props.payChild)}
                    <img src={iconRuble} alt="..." />
                  </p>
                </div>
                <div className={styles.order__cash__button}>
                  <NavLink to="/dashboard/passengers" type="button">
                    Изменить
                  </NavLink>
                </div>
              </div>
            </div>

            <div className={styles.order__title}>
              <h4>Способ оплаты</h4>
            </div>

            <div className={styles.order__cash}>
              <h4>{props.paymentMethod === 'cash' ? 'Наличными' : 'Онлайн'}</h4>
              <div className={styles.order__cash__button}>
                <NavLink to="/dashboard/payment" type="button">
                  Изменить
                </NavLink>
              </div>
            </div>

            <div className={styles.order__button}>
              <NavLink to="/confirmed" type="button">
                подтвердить
              </NavLink>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    ticketsArray: state.filterChoiceTicketsAndSeatsPages.ticketsArray,
    trainId: state.filterChoiceTicketsAndSeatsPages.trainId,
    ticketsAdult: state.passengersAndPay.ticketsAdult,
    payAdult: state.passengersAndPay.payAdult,
    ticketsChild: state.passengersAndPay.ticketsChild,
    payChild: state.passengersAndPay.payChild,
    seats: state.orderTicketsSeats.departure.seats,
    paymentMethod: state.orderTicketsSeats.user.payment_method,
  };
};

export default connect(mapStateToProps, null)(CheckOrder);
