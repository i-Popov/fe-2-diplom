import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import progressStateSelect from '../../assets/images/progress_state_select.png';
import progressStateDefault from '../../assets/images/progress_state_default.png';
import choiceOtherTrainButtonThere from '../../assets/images/choice_other_train_button_there.png';
import iconSearchThere from '../../assets/images/icon_search_there.png';
import choiceOtherTrainButtonBack from '../../assets/images/choice_other_train_button_back.png';
import iconSearchBack from '../../assets/images/icon_search_back.png';
import TrainTicketInfo from '../TrainTicketInfo';
import ProgressLine from '../ProgressLine';
import TicketsSideBar from '../TicketsSideBar';
import styles from './styles.module.scss';
import { Container } from '../UI/Container';

class SeatSelection extends React.Component {
  state = {
    disabledButton: true,
  };

  setActiveButton = (value) => {
    this.setState({ disabledButton: value });
  };

  setRouteTrainSeatReducer = () => {
    window.scrollTo(0, 700);

    this.props.history.push('/dashboard/passengers');
  };

  trainButtonFrom = (
    <div className={styles.anotherTrain}>
      <img src={choiceOtherTrainButtonThere} alt="..." />
      <NavLink className={styles.anotherTrain__link} type="button" to="/dashboard/tickets">
        Выбрать другой поезд
      </NavLink>
    </div>
  );

  trainButtonTo = (
    <div className={styles.anotherTrain}>
      <img src={choiceOtherTrainButtonBack} alt="..." />
      <NavLink className={styles.anotherTrain__link} type="button" to="/dashboard/tickets">
        Выбрать другой поезд
      </NavLink>
    </div>
  );

  render() {
    const ticketSelected = this.props.ticketsArray.find((el) => el.departure._id === this.props.trainId);
    let fromDateTime = ticketSelected.departure.from.datetime;
    let toDateTime = ticketSelected.departure.to.datetime;
    let duration = ticketSelected.departure.duration;
    let fromArrival = fromDateTime + duration;
    let toArrival = toDateTime + duration;

    return (
      <>
        <ProgressLine
          tickets={progressStateSelect}
          passengers={progressStateDefault}
          passengersClass=""
          payment={progressStateDefault}
          paymentClass=""
          checkClass=""
        />
        <Container>
          <div className={styles.seat}>
            <TicketsSideBar />
            <div className={styles.seat__ticketsRow}>
              <h3>Выбор мест</h3>

              <TrainTicketInfo
                trainButton={this.trainButtonFrom}
                trainName={ticketSelected.departure.train.name}
                cityNameDeparture={ticketSelected.departure.from.city.name}
                cityNameArrival={ticketSelected.departure.to.city.name}
                railwayStationDeparture={ticketSelected.departure.from.railway_station_name}
                railwayStationArrival={ticketSelected.departure.to.railway_station_name}
                dateTime={fromDateTime}
                arrivalTime={fromArrival}
                duration={duration}
                iconSearch={iconSearchThere}
                setActiveButton={this.setActiveButton}
              />

              <TrainTicketInfo
                trainButton={this.trainButtonTo}
                trainName={ticketSelected.departure.train.name}
                cityNameDeparture={ticketSelected.departure.to.city.name}
                cityNameArrival={ticketSelected.departure.from.city.name}
                railwayStationDeparture={ticketSelected.departure.to.railway_station_name}
                railwayStationArrival={ticketSelected.departure.from.railway_station_name}
                dateTime={toDateTime}
                arrivalTime={toArrival}
                duration={duration}
                iconSearch={iconSearchBack}
                setActiveButton={this.setActiveButton}
              />

              <div className={styles.seat__button}>
                <button type="button" disabled={this.state.disabledButton} onClick={this.setRouteTrainSeatReducer}>
                  Далее
                </button>
              </div>
            </div>
          </div>
        </Container>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ticketsArray: state.filterChoiceTicketsAndSeatsPages.ticketsArray,
    trainId: state.filterChoiceTicketsAndSeatsPages.trainId,
  };
};

export default withRouter(connect(mapStateToProps, null)(SeatSelection));
