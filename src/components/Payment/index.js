import React from 'react';
import PassengersSideBar from '../PassengersSideBar';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUserDataAC } from '../../redux/actions/action';
import { Checkbox } from 'pretty-checkbox-react';
import ProgressLine from '../ProgressLine';
import progressStateSelect from '../../assets/images/progress_state_select.png';
import progressStateSelected from '../../assets/images/progress_state_selected.png';
import styles from './styles.module.scss';
import { Container } from '../UI/Container';

class Payment extends React.Component {
  state = {
    first_name: this.props.first_name,
    last_name: this.props.last_name,
    patronymic: this.props.patronymic,
    phone: '',
    email: '',
    payment_method: '',
  };

  setFirstName = (e) => this.setState({ first_name: e.currentTarget.value });

  setLastName = (e) => this.setState({ last_name: e.currentTarget.value });

  setPatronymic = (e) => this.setState({ patronymic: e.currentTarget.value });

  setPhone = (e) => this.setState({ phone: e.currentTarget.value });

  setEmail = (e) => this.setState({ email: e.currentTarget.value });

  setPaymentOnline = (e) => this.setState({ payment_method: e.currentTarget.checked ? 'online' : '' });

  setPaymentOffline = (e) => this.setState({ payment_method: e.currentTarget.checked ? 'cash' : '' });

  setDataPayment = () => {
    this.props.setUserData(this.state);
    this.props.history.push('/dashboard/check');
  };

  disabledButton = this.state.phone === '' && this.state.email === '' && this.state.payment_method === '';

  render() {
    return (
      <>
        <ProgressLine
          tickets={progressStateSelected}
          passengers={progressStateSelected}
          passengersClass="completed"
          payment={progressStateSelect}
          paymentClass="completed"
          checkClass=""
        />
        <Container>
          <div className={styles.payment}>
            <PassengersSideBar />
            <div className={styles.payment__row}>
              <form className={styles.payment__form}>
                <div className={styles.payment__head}>
                  <h4>Персональные данные</h4>
                </div>

                <div className={styles.payment__name}>
                  <div>
                    <p className={styles.payment__name__label}>Фамилия</p>
                    <input type="text" value={this.state.last_name} onChange={this.setLastName} />
                  </div>
                  <div>
                    <p className={styles.payment__name__label}>Имя</p>
                    <input type="text" value={this.state.first_name} onChange={this.setFirstName} />
                  </div>
                  <div>
                    <p className={styles.payment__name__label}>Отчество</p>
                    <input type="text" value={this.state.patronymic} onChange={this.setPatronymic} />
                  </div>
                </div>

                <div className={`${styles.payment__name} ${styles.column}`}>
                  <div>
                    <p className={styles.payment__name__label}>Контактный телефон</p>
                    <input type="text" placeholder="+7 ___ ___ __ __" onChange={this.setPhone} />
                  </div>

                  <div>
                    <p className={styles.payment__name__label}>E-mail</p>
                    <input type="text" placeholder="inbox@gmail.ru" onChange={this.setEmail} />
                  </div>
                </div>

                <div className={styles.payment__head}>
                  <h4>Способ оплаты</h4>
                </div>

                <div className={styles.payment__methods}>
                  <div className={styles.payment__methods__check}>
                    <Checkbox
                      type="checkbox"
                      onChange={this.setPaymentOnline}
                      checked={this.state.payment_method !== 'cash' && this.state.payment_method === 'online'}
                    />
                    <p>Онлайн</p>
                  </div>
                  <div className={styles.payment__methods__list}>
                    <p>
                      Банковской
                      <br />
                      картой
                    </p>
                    <p>PayPal</p>
                    <p>Visa QIWI Wallet</p>
                  </div>
                </div>

                <div className={`${styles.payment__methods} ${styles.bottom}`}>
                  <div className={styles.payment__methods__check}>
                    <Checkbox
                      type="checkbox"
                      onChange={this.setPaymentOffline}
                      checked={this.state.payment_method !== 'online' && this.state.payment_method === 'cash'}
                    />
                    <p>Наличными</p>
                  </div>
                </div>
              </form>

              <div className={styles.payment__button}>
                <button
                  type="button"
                  disabled={this.state.phone === '' || this.state.email === '' || this.state.payment_method === ''}
                  onClick={this.setDataPayment}
                >
                  купить билеты
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
    first_name: state.orderTicketsSeats.departure.seats[0].person_info.first_name,
    last_name: state.orderTicketsSeats.departure.seats[0].person_info.last_name,
    patronymic: state.orderTicketsSeats.departure.seats[0].person_info.patronymic,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUserData: (data) => dispatch(setUserDataAC(data)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Payment));
