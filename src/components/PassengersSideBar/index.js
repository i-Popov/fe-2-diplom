import React from 'react';
import { connect } from 'react-redux';
import { ucFL, numSpc } from '../../helpers';
import iconThere from '../../assets/images/icon_there.png';
import iconBack from '../../assets/images/icon_back.png';
import iconMinus from '../../assets/images/icon_minus.png';
import iconRuble from '../../assets/images/icon_ruble.png';
import iconSearchThere from '../../assets/images/icon_search_there.png';
import iconRubleSmall from '../../assets/images/icon_ruble_small.png';
import iconPassenger from '../../assets/images/icon_passanger.png';
import styles from './styles.module.scss';

class PassengersSideBar extends React.Component {
  render() {
    const ticketSelected = this.props.ticketsArray.find((el) => el.departure._id === this.props.trainId);
    let fromDateTime = ticketSelected.departure.from.datetime;
    let toDateTime = ticketSelected.departure.to.datetime;
    let duration = ticketSelected.departure.duration;
    let fromArrival = fromDateTime + duration;
    let toArrival = toDateTime + duration;

    const getHours = (msc) => new Date(msc).getHours();
    const getMinutes = (msc) => (new Date(msc).getMinutes() < 10 ? '0' : '') + new Date(msc).getMinutes();

    return (
      <div className={styles.sideBar}>
        <h4 className={styles.sideBar__title}>Детали поездки</h4>

        <div className={styles.sideBar__there}>
          <div className={styles.sideBar__there__head}>
            <div className={styles.sideBar__there__head__item}>
              <img src={iconThere} alt="Туда" />
              <h4>Туда</h4>
              <p className={styles.sideBar__there__head__date}>{this.props.form.whereFromDate}</p>
            </div>
            <div className={styles.sideBar__there__head__min}>
              <img src={iconMinus} alt="..." />
            </div>
          </div>

          <div className={styles.sideBar__there__name}>
            <div className={styles.sideBar__there__name__info}>
              <p>№ Поезда</p>
              <p>Название</p>
            </div>
            <div className={styles.sideBar__there__name__detail}>
              <h4>{ticketSelected.departure.train.name}</h4>
              <p>{ucFL(ticketSelected.departure.from.city.name)}</p>
            </div>
          </div>

          <div className={styles.sideBar__there__time}>
            <div>
              <h4 className={styles.sideBar__there__time__h4}>
                {getHours(fromDateTime)}:{getMinutes(fromDateTime)}
              </h4>
              <p className={styles.sideBar__there__time__date}>{this.props.form.whereFromDate}</p>
            </div>

            <div className={styles.sideBar__there__time__hours}>
              <p>
                {getHours(duration)} : {getMinutes(duration)}
              </p>
              <img src={iconSearchThere} alt="..." />
            </div>

            <div>
              <h4 className={`${styles.sideBar__there__time__h4} ${styles.right}`}>
                {getHours(fromArrival)}:{getMinutes(fromArrival)}
              </h4>
              <p className={styles.sideBar__there__time__date}>{this.props.form.whereFromDate}</p>
            </div>
          </div>

          <div className={styles.sideBar__there__city}>
            <div>
              <h4>{ucFL(ticketSelected.departure.from.city.name)}</h4>
              <p>{ticketSelected.departure.from.railway_station_name}</p>
              <p>вокзал</p>
            </div>
            <div className={styles.sideBar__there__city__right}>
              <h4>{ucFL(ticketSelected.departure.to.city.name)}</h4>
              <p>{ticketSelected.departure.to.railway_station_name}</p>
              <p>вокзал</p>
            </div>
          </div>
        </div>

        <div className={styles.sideBar__there}>
          <div className={styles.sideBar__there__head}>
            <div className={styles.sideBar__there__head__item}>
              <img src={iconBack} alt="Обратно" />
              <h4>Обратно</h4>
              <p className={styles.sideBar__there__head__date}>{this.props.form.whereToDate}</p>
            </div>
            <div className={styles.sideBar__there__head__min}>
              <img src={iconMinus} alt="..." />
            </div>
          </div>

          <div className={styles.sideBar__there__name}>
            <div className={styles.sideBar__there__name__info}>
              <p>№ Поезда</p>
              <p>Название</p>
            </div>
            <div className={styles.sideBar__there__name__detail}>
              <h4>{ticketSelected.departure.train.name}</h4>
              <p>{ucFL(ticketSelected.departure.to.city.name)}</p>
            </div>
          </div>

          <div className={styles.sideBar__there__time}>
            <div>
              <h4 className={styles.sideBar__there__time__h4}>
                {getHours(toDateTime)}:{getMinutes(toDateTime)}
              </h4>
              <p className={styles.sideBar__there__time__date}>{this.props.form.whereToDate}</p>
            </div>
            <div className={styles.sideBar__there__time__hours}>
              <p>
                {getHours(duration)} : {getMinutes(duration)}
              </p>
              <img src={iconSearchThere} alt="иконка стрелки вправо" />
            </div>
            <div>
              <h4 className={`${styles.sideBar__there__time__h4} ${styles.right}`}>
                {getHours(toArrival)}:{getMinutes(toArrival)}
              </h4>
              <p className={styles.sideBar__there__time__date}>{this.props.form.whereToDate}</p>
            </div>
          </div>

          <div className={styles.sideBar__there__city}>
            <div>
              <h4>{ucFL(ticketSelected.departure.to.city.name)}</h4>
              <p>{ticketSelected.departure.to.railway_station_name}</p>
              <p>вокзал</p>
            </div>
            <div className={styles.sideBar__there__city__right}>
              <h4>{ucFL(ticketSelected.departure.from.city.name)}</h4>
              <p>{ticketSelected.departure.from.railway_station_name}</p>
              <p>вокзал</p>
            </div>
          </div>
        </div>

        <div className={styles.sideBar__passengers}>
          <div className={styles.sideBar__passengers__head}>
            <div className={styles.sideBar__passengers__head__item}>
              <img src={iconPassenger} alt="..." />
              <h4>Пассажиры</h4>
            </div>
            <div className={styles.sideBar__passengers__head__min}>
              <img src={iconMinus} alt="..." />
            </div>
          </div>

          <div className={styles.sideBar__passengers__people}>
            <div>
              <p>{this.props.ticketsAdult} Взрослых</p>
              {this.props.ticketsChild !== 0 && <p>{this.props.ticketsChild} Ребенок</p>}
              {this.props.ticketsChildWithoutPlace !== 0 && (
                <p>{this.props.ticketsChildWithoutPlace} Ребенок без места</p>
              )}
            </div>

            <div>
              <h4>
                {numSpc(this.props.ticketsAdult * this.props.payAdult)}
                <img src={iconRubleSmall} alt="..." />
              </h4>
              {this.props.ticketsChild !== 0 && (
                <h4>
                  {numSpc(this.props.ticketsChild * this.props.payChild)}
                  <img src={iconRubleSmall} alt="..." />
                </h4>
              )}
            </div>
          </div>
        </div>

        <div className={styles.sideBar__total}>
          <h3 className={styles.sideBar__total__text}>Итог</h3>
          <h3 className={styles.sideBar__total__cost}>
            {numSpc(this.props.ticketsAdult * this.props.payAdult + this.props.ticketsChild * this.props.payChild)}
            <img src={iconRuble} alt="..." />
          </h3>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    form: state.sectionSearch.form,
    ticketsArray: state.filterChoiceTicketsAndSeatsPages.ticketsArray,
    choiceSeatsArray: state.filterChoiceTicketsAndSeatsPages.choiceSeatsArray,
    trainId: state.filterChoiceTicketsAndSeatsPages.trainId,
    ticketsAdult: state.passengersAndPay.ticketsAdult,
    payAdult: state.passengersAndPay.payAdult,
    ticketsChild: state.passengersAndPay.ticketsChild,
    payChild: state.passengersAndPay.payChild,
    ticketsChildWithoutPlace: state.passengersAndPay.ticketsChildWithoutPlace,
  };
};

export default connect(mapStateToProps, null)(PassengersSideBar);
