import React from 'react';
import { connect } from 'react-redux';
import { passengersAndPayAC, setRouteTrainSeatAC } from '../../redux/actions/action';
import { ucFL } from '../../helpers';
import { withRouter } from 'react-router';
import WagonSeats from '../WagonSeats';
import choiceTrainIcon from '../../assets/images/icon_choice_train.png';
import choiceTimeIcon from '../../assets/images/icon_choice_time.png';
import train_fourth_class from '../../assets/images/train_fourth_class.png';
import train_third_class from '../../assets/images/train_third_class.png';
import train_second_class from '../../assets/images/train_second_class.png';
import train_first_class from '../../assets/images/train_first_class.png';
import arrow_right from '../../assets/images/icon_arrow_right_black.png';
import seat from '../../assets/images/icon_type_vagon_seat.png';
import seatChecked from '../../assets/images/icon_type_vagon_seat_checked.png';
import reservedSeat from '../../assets/images/icon_type_vagon_reserved_seat.png';
import reservedSeatChecked from '../../assets/images/icon_type_vagon_reserved_seat_checked.png';
import coupe from '../../assets/images/icon_type_vagon_coupe.png';
import coupeChecked from '../../assets/images/icon_type_vagon_coupe_checked.png';
import luxury from '../../assets/images/icon_type_vagon_luxury.png';
import luxuryChecked from '../../assets/images/icon_type_vagon_luxury_checked.png';
import styles from './styles.module.scss';

class TrainTicketInfo extends React.Component {
  state = {
    coach_id: '',
    seat_number: [],
    is_child: false,
    include_children_seat: false,
    sumSeats: 0,
    sumTicketsPay: 0,
    fourthClass: false,
    thirdClass: false,
    secondClass: false,
    firstClass: false,
    fourth: [],
    third: [],
    second: [],
    first: [],
  };

  setCoachId = (id) => this.setState({ coach_id: id });

  setSeatNumber = (event) => {
    const currentNumber = event.currentTarget.innerHTML;

    if (this.state.seat_number.indexOf(currentNumber) > -1) {
      this.setState({
        seat_number: this.state.seat_number.filter((el) => el !== currentNumber),
        sumTicketsPay: this.state.sumTicketsPay - this.props.payAdult,
      });
    } else if (this.state.seat_number.length !== this.state.sumSeats) {
      this.setState({
        seat_number: [...this.state.seat_number, currentNumber],
        sumTicketsPay: (this.state.seat_number.length + 1) * this.props.payAdult,
      });
    }
    this.props.setPassengersAndPay('seatsNumbers', this.state.seat_number);
  };

  setAdultSeats = (value) => {
    this.setState({ sumSeats: this.state.sumSeats + value });
    this.props.setPassengersAndPay('ticketsAdult', value);
  };

  setChildSeat = (value) => {
    this.setState({ sumSeats: this.state.sumSeats + value, is_child: value !== 0 });
    this.props.setPassengersAndPay('ticketsChild', value);
  };

  setChildWithoutSeat = (value) => {
    this.props.setPassengersAndPay('ticketsChildWithoutPlace', value);
    this.setState({ include_children_seat: value !== 0 });
  };

  resetParamsIfChangeClassTrain = () => {
    this.props.setPassengersAndPay('payAdult', 0);
    this.props.setPassengersAndPay('payChild', 0);
    this.props.setPassengersAndPay('ticketsAdult', 0);
    this.props.setPassengersAndPay('ticketsChild', 0);
    this.props.setPassengersAndPay('ticketsChildWithoutPlace', 0);
    this.props.setPassengersAndPay('seatsNumbers', []);
    this.setCoachId('');
    this.setState({
      seat_number: [],
      is_child: false,
      include_children_seat: false,
      sumSeats: 0,
      sumTicketsPay: 0,
      first: [],
      fourthClass: false,
      thirdClass: false,
      secondClass: false,
      firstClass: false,
    });
  };

  setFourthClass = () => {
    this.props.choiceSeatsArray.map((el) => {
      if (el.coach.class_type === 'fourth' && this.state.sumSeats !== 0) {
        this.props.setPassengersAndPay('payAdult', el.coach.top_price);
        this.props.setPassengersAndPay('payChild', Math.ceil(el.coach.top_price / 2));
        this.setCoachId(el.coach._id);
        this.setState({
          fourth: el,
          fourthClass: true,
          thirdClass: false,
          secondClass: false,
          firstClass: false,
        });
      }

      if (this.state.fourthClass || this.state.thirdClass || this.state.secondClass || this.state.firstClass) {
        this.resetParamsIfChangeClassTrain();
      }
      return null;
    });
  };

  setThirdClass = () => {
    this.props.choiceSeatsArray.map((el) => {
      if (el.coach.class_type === 'third' && this.state.sumSeats !== 0) {
        this.props.setPassengersAndPay('payAdult', el.coach.top_price);
        this.props.setPassengersAndPay('payChild', Math.ceil(el.coach.top_price / 2));
        this.setCoachId(el.coach._id);
        this.setState({
          third: el,
          fourthClass: false,
          thirdClass: true,
          secondClass: false,
          firstClass: false,
        });
      }

      if (this.state.fourthClass || this.state.thirdClass || this.state.secondClass || this.state.firstClass) {
        this.resetParamsIfChangeClassTrain();
      }
      return null;
    });
  };

  setSecondClass = () => {
    this.props.choiceSeatsArray.map((el) => {
      if (el.coach.class_type === 'second' && this.state.sumSeats !== 0) {
        this.props.setPassengersAndPay('payAdult', el.coach.top_price);
        this.props.setPassengersAndPay('payChild', Math.ceil(el.coach.top_price / 2));
        this.setCoachId(el.coach._id);
        this.setState({
          second: el,
          fourthClass: false,
          thirdClass: false,
          secondClass: true,
          firstClass: false,
        });
      }

      if (this.state.fourthClass || this.state.thirdClass || this.state.secondClass || this.state.firstClass) {
        this.resetParamsIfChangeClassTrain();
      }
      return null;
    });
  };

  setFirstClass = () => {
    this.props.choiceSeatsArray.map((el) => {
      if (el.coach.class_type === 'first' && this.state.sumSeats !== 0) {
        this.props.setPassengersAndPay('payAdult', el.coach.top_price);
        this.props.setPassengersAndPay('payChild', Math.ceil(el.coach.top_price / 2));
        this.setCoachId(el.coach._id);
        this.setState({
          first: el,
          fourthClass: false,
          thirdClass: false,
          secondClass: false,
          firstClass: true,
        });
      }

      if (this.state.fourthClass || this.state.thirdClass || this.state.secondClass || this.state.firstClass) {
        this.resetParamsIfChangeClassTrain();
      }
      return null;
    });
  };

  render() {
    const getHours = (msc) => new Date(msc).getHours();
    const getMinutes = (msc) => (new Date(msc).getMinutes() < 10 ? '0' : '') + new Date(msc).getMinutes();
    const { fourthClass, thirdClass, secondClass, firstClass } = this.state;

    if (this.state.seat_number.length === this.state.sumSeats) {
      this.props.setPassengersAndPay('seatsNumbers', this.state.seat_number);

      this.props.setRouteTrainSeat(
        this.props.trainId,
        this.state.coach_id,
        this.state.seat_number,
        this.state.is_child,
        this.state.include_children_seat
      );

      this.props.setActiveButton(false);
    } else {
      this.props.setActiveButton(true);
    }

    return (
      <div className={styles.row}>
        {this.props.trainButton}
        <div className={styles.info}>
          <div className={styles.info__first}>
            <img className={styles.info__first__img} src={choiceTrainIcon} alt="..." />
            <ul>
              <li className={styles.info__first__train}>{this.props.trainName}</li>
              <li className={styles.info__first__city}>
                {ucFL(this.props.cityNameDeparture)} <img src={arrow_right} alt="..." />
              </li>
              <li className={styles.info__first__city}>{ucFL(this.props.cityNameArrival)}</li>
            </ul>
          </div>

          <div className={styles.info__second}>
            <ul>
              <li className={styles.info__second__time}>
                {getHours(this.props.dateTime)}:{getMinutes(this.props.dateTime)}
              </li>
              <li className={styles.info__second__city}>{ucFL(this.props.cityNameDeparture)}</li>
              <li className={styles.info__second__station}>{this.props.railwayStationDeparture}</li>
            </ul>
            <img className={styles.info__second__arrow} src={this.props.iconSearch} alt="иконка стрелки" />
            <ul>
              <li className={styles.info__second__time}>
                {getHours(this.props.arrivalTime)}:{getMinutes(this.props.arrivalTime)}
              </li>
              <li className={styles.info__second__city}>{ucFL(this.props.cityNameArrival)}</li>
              <li className={styles.info__second__station}>{this.props.railwayStationArrival}</li>
            </ul>
          </div>

          <div className={styles.info__third}>
            <img src={choiceTimeIcon} alt="..." />
            <ul>
              <li>{getHours(this.props.duration)} часа</li>
              <li>{getMinutes(this.props.duration)} минут</li>
            </ul>
          </div>
        </div>

        <h4 className={styles.qTitle}>Количество билетов</h4>

        <div className={styles.quantity}>
          <div className={styles.quantity__item}>
            <select defaultValue="0" onChange={(e) => this.setAdultSeats(+e.currentTarget.value)}>
              <option value="0">Взрослых - 0</option>
              <option value="1">Взрослых - 1</option>
              <option value="2">Взрослых - 2</option>
              <option value="3">Взрослых - 3</option>
              <option value="4">Взрослых - 4</option>
              <option value="5">Взрослых - 5</option>
            </select>
            <p className={styles.quantity__item__sub}>Можно добавить еще 3 пассажиров</p>
          </div>
          <div className={styles.quantity__item}>
            <select defaultValue="0" onChange={(e) => this.setChildSeat(+e.currentTarget.value)}>
              <option value="0">Детских - 0</option>
              <option value="1">Детских - 1</option>
              <option value="2">Детских - 2</option>
              <option value="3">Детских - 3</option>
              <option value="4">Детских - 4</option>
              <option value="5">Детских - 5</option>
            </select>
            <p className={styles.quantity__item__sub}>
              Можно добавить еще 3 детей до 10 лет.Свое место в вагоне, как у взрослых, но дешевле в среднем на 50-65%
            </p>
          </div>
          <div className={styles.quantity__item}>
            <select defaultValue="0" onChange={(e) => this.setChildWithoutSeat(+e.currentTarget.value)}>
              <option value="0">Детских «без места» - 0</option>
              <option value="1">Детских «без места» - 1</option>
              <option value="2">Детских «без места» - 2</option>
              <option value="3">Детских «без места» - 3</option>
              <option value="4">Детских «без места» - 4</option>
              <option value="5">Детских «без места» - 5</option>
            </select>
          </div>
        </div>

        <h4 className={styles.vTitle}>Тип вагона</h4>

        <div className={styles.type}>
          <button className={styles.type__item} onClick={this.setFourthClass}>
            <img src={fourthClass ? seatChecked : seat} alt="" />
            <p>Сидячий</p>
          </button>
          <button className={styles.type__item} onClick={this.setThirdClass}>
            <img src={thirdClass ? reservedSeatChecked : reservedSeat} alt="" />
            <p>Плацкарт</p>
          </button>
          <button className={styles.type__item} onClick={this.setSecondClass}>
            <img src={secondClass ? coupeChecked : coupe} alt="" />
            <p>Купе</p>
          </button>
          <button className={styles.type__item} onClick={this.setFirstClass}>
            <img src={firstClass ? luxuryChecked : luxury} alt="" />
            <p>Люкс</p>
          </button>
        </div>

        {fourthClass && (
          <WagonSeats
            train={this.state.fourth}
            image={train_fourth_class}
            seatNumber={this.state.seat_number}
            setSeatNumber={this.setSeatNumber}
            sumTicketsPay={this.state.sumTicketsPay}
          />
        )}
        {thirdClass && (
          <WagonSeats
            train={this.state.third}
            image={train_third_class}
            seatNumber={this.state.seat_number}
            setSeatNumber={this.setSeatNumber}
            sumTicketsPay={this.state.sumTicketsPay}
          />
        )}
        {secondClass && (
          <WagonSeats
            train={this.state.second}
            image={train_second_class}
            seatNumber={this.state.seat_number}
            setSeatNumber={this.setSeatNumber}
            sumTicketsPay={this.state.sumTicketsPay}
          />
        )}
        {firstClass && (
          <WagonSeats
            train={this.state.first}
            image={train_first_class}
            seatNumber={this.state.seat_number}
            setSeatNumber={this.setSeatNumber}
            sumTicketsPay={this.state.sumTicketsPay}
          />
        )}
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setRouteTrainSeat: (train, coach_id, trainId, seat_number, is_child, include_children_seat) => {
      const action = setRouteTrainSeatAC(train, coach_id, trainId, seat_number, is_child, include_children_seat);
      dispatch(action);
    },
    setPassengersAndPay: (fieldName, fieldValue) => dispatch(passengersAndPayAC(fieldName, fieldValue)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TrainTicketInfo));
