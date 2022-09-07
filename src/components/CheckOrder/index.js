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
import iconArrowRightGray from '../../assets/images/icon_arrow_right_gray.png';
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

          <div>
            <div>
              <h4>Поезд</h4>
              <div>
                <div>
                  <img src={iconTicketTrain} alt="..." />
                  <h4>{ticketSelected.departure.train.name}</h4>
                  <p>
                    Адлер
                    <img src={iconArrowRightGray} alt="..." />
                  </p>
                  <p>
                    {ucFL(ticketSelected.departure.from.city.name)}
                    <img src={iconArrowRightBlack} alt="..." />
                  </p>
                  <p>{ucFL(ticketSelected.departure.to.city.name)}</p>
                </div>
                <div>
                  <div>
                    <div>
                      <div>
                        <div>
                          <h4>
                            {getHours(fromDateTime)}:{getMinutes(fromDateTime)}
                          </h4>
                          <p>{ucFL(ticketSelected.departure.from.city.name)}</p>
                          <p>{ticketSelected.departure.from.railway_station_name}</p>
                        </div>
                        <div>
                          <p>
                            {getHours(duration)}:{getMinutes(duration)}
                          </p>
                          <img src={iconSearchThere} alt="..." />
                        </div>
                        <div>
                          <h4>
                            {getHours(fromArrival)}:{getMinutes(fromArrival)}
                          </h4>
                          <p>{ucFL(ticketSelected.departure.to.city.name)}</p>
                          <p>{ticketSelected.departure.to.railway_station_name}</p>
                        </div>
                      </div>
                      <div>
                        <div>
                          <h4>
                            {getHours(toArrival)}:{getMinutes(toArrival)}
                          </h4>
                          <p>{ucFL(ticketSelected.departure.from.city.name)}</p>
                          <p>{ticketSelected.departure.from.railway_station_name}</p>
                        </div>
                        <div>
                          <p>
                            {getHours(duration)}:{getMinutes(duration)}
                          </p>
                          <img src={iconSearchBack} alt="..." />
                        </div>
                        <div>
                          <h4>
                            {getHours(toDateTime)}:{getMinutes(toDateTime)}
                          </h4>
                          <p>{ucFL(ticketSelected.departure.to.city.name)}</p>
                          <p>{ticketSelected.departure.to.railway_station_name}</p>
                        </div>
                      </div>
                    </div>

                    <div>
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

                      <div>
                        <img src={iconWifiRocketCup} alt="wifi-rocket-cup" />

                        <NavLink to="/dashboard/tickets" type="button">
                          Изменить
                        </NavLink>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4>Пассажиры</h4>
              <div>
                <div>{passengers}</div>
                <div>
                  <div>
                    <h4>Всего</h4>
                    <h4>
                      {numSpc(props.ticketsAdult * props.payAdult + props.ticketsChild * props.payChild)}
                      <img src={iconRuble} alt="..." />
                    </h4>
                  </div>
                  <div>
                    <NavLink to="/dashboard/passengers" type="button">
                      Изменить
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h4>Способ оплаты</h4>
              <h4>{props.paymentMethod === 'cash' ? 'Наличными' : 'Онлайн'}</h4>
              <div>
                <NavLink to="/dashboard/payment" type="button">
                  Изменить
                </NavLink>
              </div>
            </div>
            <div>
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
