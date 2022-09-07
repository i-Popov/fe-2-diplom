import React from 'react';
import PassengersSideBar from '../PassengersSideBar';
import PassengerForm from '../PassengerForm';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setPersonInfoAC } from '../../redux/actions/action';
import ProgressLine from '../ProgressLine';
import { Container } from '../UI/Container';
import progressStateSelect from '../../assets/images/progress_state_select.png';
import progressStateSelected from '../../assets/images/progress_state_selected.png';
import progressStateDefault from '../../assets/images/progress_state_default.png';
import iconPlusSmallYellow from '../../assets/images/icon_plus_small_yellow.png';
import styles from './styles.module.scss';

class SectionPassengers extends React.Component {
  state = {
    disableForm: true,
    activeButton: true,
    personInfo: {},
  };

  setDisableForm = () => this.setState({ disableForm: true });

  setActiveButton = () => this.setState({ activeButton: false, disableForm: false });

  setPersonInfo = (data, number) => {
    this.setState({ personInfo: data });
    this.props.setPersonInfo(data, number);
  };

  setPersonData = () => {
    this.props.history.push('/dashboard/payment');
    this.props.setPersonInfo(this.state.personInfo);
  };

  render() {
    const passengersForm = this.props.seatsNumbers.map((el, i) => {
      return (
        <PassengerForm
          key={el}
          passengerNumber={i + 1}
          setPersonInfo={this.setPersonInfo}
          setActiveButton={this.setActiveButton}
          activeForm={i === 0}
          disableForm={this.state.disableForm}
          setDisableForm={this.setDisableForm}
        />
      );
    });

    return (
      <>
        <ProgressLine
          tickets={progressStateSelected}
          passengers={progressStateSelect}
          passengersClass="completed"
          payment={progressStateDefault}
          paymentClass=""
          checkClass=""
        />

        <Container>
          <div className={styles.passenger}>
            <PassengersSideBar />

            <div className={styles.passenger__passengerRow}>
              {passengersForm}

              <div className={styles.passenger__add}>
                <NavLink to="/dashboard/seats" className={styles.passenger__add__link}>
                  <h4>Добавить пассажира</h4>
                  <img src={iconPlusSmallYellow} alt="..." />
                </NavLink>
              </div>

              <div className={styles.passenger__button}>
                <button type="button" onClick={this.setPersonData} disabled={this.state.activeButton}>
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
    seatsNumbers: state.passengersAndPay.seatsNumbers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPersonInfo: (data, number) => dispatch(setPersonInfoAC(data, number)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SectionPassengers));
