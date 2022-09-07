import React from 'react';
import TicketPriceAndSeats from '../TicketPriceAndSeats';
import { withRouter } from 'react-router';
import { ucFL } from '../../helpers';
import iconTicketTrain from '../../assets/images/icon_ticket_train.png';
//import iconArrowRightGray from '../../assets/images/icon_arrow_right_gray.png';
import iconArrowRightBlack from '../../assets/images/icon_arrow_right_black.png';
import iconSearchThere from '../../assets/images/icon_search_there.png';
import iconSearchBack from '../../assets/images/icon_search_back.png';
import iconWifiRocketCup from '../../assets/images/icons_wifiRocketCup.png';
import styles from './styles.module.scss';

const ResultTrainTicket = (props) => {
  console.log(props);
  const setTrainIdEvent = () => {
    props.setTrainId(props.state.departure._id);
    window.scrollTo(0, 700);
    props.history.push('/dashboard/seats');
  };

  let fromDateTime = props.state.departure.from.datetime;
  let toDateTime = props.state.departure.to.datetime;
  let duration = props.state.departure.duration;
  let fromArrival = fromDateTime + duration;
  let toArrival = toDateTime + duration;

  const getHours = (msc) => new Date(msc).getHours();
  const getMinutes = (msc) => (new Date(msc).getMinutes() < 10 ? '0' : '') + new Date(msc).getMinutes();

  return (
    <div className={styles.ticket}>
      <div className={styles.ticket__trainInfo}>
        <div className={styles.ticket__trainInfo__img}>
          <img src={iconTicketTrain} alt="Поезд" />
        </div>
        <div>
          <h5 className={styles.ticket__trainInfo__name}>{props.state.departure.train.name}</h5>
          <p className={styles.ticket__trainInfo__city}>
            {ucFL(props.state.departure.from.city.name)}
            <img src={iconArrowRightBlack} alt="..." />
          </p>
          <p className={styles.ticket__trainInfo__city}>{ucFL(props.state.departure.to.city.name)}</p>
        </div>
      </div>

      <div className={styles.ticket__seats}>
        <div className={styles.ticket__seatsRow}>
          <div className={styles.ticket__seatsRow__dirRow}>
            <div className={styles.ticket__seatsRow__dir}>
              <div>
                <h4>
                  {getHours(fromDateTime)}:{getMinutes(fromDateTime)}
                </h4>
                <p className={styles.ticket__seatsRow__dir__city}>{ucFL(props.state.departure.from.city.name)}</p>
                <p className={styles.ticket__seatsRow__dir__station}>
                  {props.state.departure.from.railway_station_name}
                </p>
              </div>
              <div className={styles.ticket__seatsRow__dir__time}>
                <p>
                  {getHours(duration)} : {getMinutes(duration)}
                </p>
                <img src={iconSearchThere} alt="иконка стрелки вправо" />
              </div>
              <div>
                <h4>
                  {getHours(fromArrival)}:{getMinutes(fromArrival)}
                </h4>
                <p className={styles.ticket__seatsRow__dir__city}>{ucFL(props.state.departure.to.city.name)}</p>
                <p className={styles.ticket__seatsRow__dir__station}>{props.state.departure.to.railway_station_name}</p>
              </div>
            </div>
            <div className={styles.ticket__seatsRow__dir}>
              <div>
                <h4>
                  {getHours(toArrival)}:{getMinutes(toArrival)}
                </h4>
                <p className={styles.ticket__seatsRow__dir__city}>{ucFL(props.state.departure.from.city.name)}</p>
                <p className={styles.ticket__seatsRow__dir__station}>
                  {props.state.departure.from.railway_station_name}
                </p>
              </div>
              <div className={styles.ticket__seatsRow__dir__time}>
                <p>
                  {getHours(duration)} : {getMinutes(duration)}
                </p>
                <img src={iconSearchBack} alt="иконка стрелки влево" />
              </div>
              <div>
                <h4>
                  {getHours(toDateTime)}:{getMinutes(toDateTime)}
                </h4>
                <p className={styles.ticket__seatsRow__dir__city}>{ucFL(props.state.departure.to.city.name)}</p>
                <p className={styles.ticket__seatsRow__dir__station}>{props.state.departure.to.railway_station_name}</p>
              </div>
            </div>
          </div>

          <div className={styles.ticket__seatsRow__class}>
            <div>
              {props.state.departure.have_fourth_class && (
                <TicketPriceAndSeats
                  name="Сидячий"
                  seats={props.state.available_seats_info.fourth}
                  price={props.state.departure.price_info.fourth.top_price}
                />
              )}
              {props.state.departure.have_third_class && (
                <TicketPriceAndSeats
                  name="Плацкарт"
                  seats={props.state.available_seats_info.third}
                  price={props.state.departure.price_info.third.top_price}
                />
              )}
              {props.state.departure.have_second_class && (
                <TicketPriceAndSeats
                  name="Купе"
                  seats={props.state.available_seats_info.second}
                  price={props.state.departure.price_info.second.top_price}
                />
              )}
              {props.state.departure.have_first_class && (
                <TicketPriceAndSeats
                  name="Люкс"
                  seats={props.state.available_seats_info.first}
                  price={props.state.departure.price_info.first.top_price}
                />
              )}
            </div>

            <div className={styles.ticket__seatsRow__group}>
              <img src={iconWifiRocketCup} alt="wifi-rocket-cup" />
              <button type="button" onClick={setTrainIdEvent}>
                Выбрать места
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(ResultTrainTicket);
