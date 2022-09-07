import React from 'react';
import LastTickets from '../LastTickets';
import CompoundSlider from '../CompoundSlider';
import CompoundSliderSmall from '../CompoundSliderSmall';
import { connect } from 'react-redux';
import { setDataFormAC } from '../../redux/actions/action';
import { getLastRoutesTC } from '../../redux/reducers/searchMain-reducer';
import { withRouter } from 'react-router';
import { filterTicketsAndSeatsReducerTC } from '../../redux/reducers/filterTicketsAndSeats-reducer';
import iconCoupe from '../../assets/images/icon_coupe.png';
import iconEconomclass from '../../assets/images/icon_economclass.png';
import iconSedentary from '../../assets/images/icon_sedentary.png';
import iconLuxury from '../../assets/images/icon_luxury.png';
import iconWifi from '../../assets/images/icon_wifi.png';
import iconExpress from '../../assets/images/icon_express.png';
import iconThere from '../../assets/images/icon_there.png';
import iconBack from '../../assets/images/icon_back.png';
import iconPlus from '../../assets/images/icon_plus.png';
import iconMinus from '../../assets/images/icon_minus.png';
import styles from './styles.module.scss';

class TicketsSideBar extends React.Component {
  componentDidMount() {
    this.props.setSeatsAndTickets('actualPage', this.props.match.url);
    this.props.getLasRoutes();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.total_count !== this.props.total_count ||
      prevProps.have_second_class !== this.props.have_second_class ||
      prevProps.have_third_class !== this.props.have_third_class ||
      prevProps.have_fourth_class !== this.props.have_fourth_class ||
      prevProps.have_first_class !== this.props.have_first_class ||
      prevProps.have_wifi !== this.props.have_wifi ||
      prevProps.have_express !== this.props.have_express ||
      prevProps.price_arr !== this.props.price_arr ||
      prevProps.start_departure_hour_arr !== this.props.start_departure_hour_arr ||
      prevProps.start_arrival_hour_arr !== this.props.start_arrival_hour_arr ||
      prevProps.end_departure_hour_arr !== this.props.end_departure_hour_arr ||
      prevProps.end_arrival_hour_arr !== this.props.end_arrival_hour_arr ||
      prevProps.customRangeCostFrom !== this.props.customRangeCostFrom ||
      prevProps.customRangeCostTo !== this.props.customRangeCostTo
    ) {
      this.props.setSeatsAndTickets('actualPage', this.props.match.url);
    }
  }

  setWhereFromDate = (event) => this.setState({ whereFromDate: event.currentTarget.value });

  setWhereToDate = (event) => this.setState({ whereToDate: event.currentTarget.value });

  checkSecondClass = (event) => this.props.setSeatsAndTickets('have_second_class', event.currentTarget.checked);

  checkThirdClass = (event) => this.props.setSeatsAndTickets('have_third_class', event.currentTarget.checked);

  checkFourthClass = (event) => this.props.setSeatsAndTickets('have_fourth_class', event.currentTarget.checked);

  checkFirstClass = (event) => this.props.setSeatsAndTickets('have_first_class', event.currentTarget.checked);

  checkWiFi = (event) => this.props.setSeatsAndTickets('have_wifi', event.currentTarget.checked);

  checkExpress = (event) => this.props.setSeatsAndTickets('have_express', event.currentTarget.checked);

  setCustomRangeCostFrom = (bool) => this.props.setSeatsAndTickets('customRangeCostFrom', bool);

  setCustomRangeCostTo = (bool) => this.props.setSeatsAndTickets('customRangeCostTo', bool);

  setPrice = (array) => this.props.setSeatsAndTickets('price_arr', array);

  startDeparture = (array) => this.props.setSeatsAndTickets('start_departure_hour_arr', array);

  startArrival = (array) => this.props.setSeatsAndTickets('start_arrival_hour_arr', array);

  endDeparture = (array) => this.props.setSeatsAndTickets('end_departure_hour_arr', array);

  endArrival = (array) => this.props.setSeatsAndTickets('end_arrival_hour_arr', array);

  render() {
    const lastTickets = this.props.lastRoutes
      ? this.props.lastRoutes.map((el, idx) => <LastTickets key={idx} state={el} />)
      : [];

    return (
      <div className={styles.sideBar}>
        <div className={styles.sideBar__filter}>
          <div className={styles.sideBar__form}>
            <form action="input">
              <p className={styles.sideBar__form__title}>Дата поездки</p>
              <input
                className={styles.sideBar__form__date}
                type="date"
                onChange={this.setWhereFromDate}
                value={this.props.form.whereFromDate}
              />
            </form>
            <form action="input">
              <p className={styles.sideBar__form__title}>Дата возвращения</p>
              <input
                className={styles.sideBar__form__date}
                type="date"
                onChange={this.setWhereToDate}
                value={this.props.form.whereToDate}
              />
            </form>
          </div>

          <div className={styles.sideBar__services}>
            <div className={styles.sideBar__services__item}>
              <div className={styles.sideBar__services__title}>
                <img src={iconCoupe} alt="иконка купе" />
                <p>Купе</p>
              </div>
              <div className={styles.sideBar__services__input}>
                <label htmlFor="customSwitch1" className="toggler-wrapper style-3">
                  <input
                    type="checkbox"
                    id="customSwitch1"
                    checked={this.props.have_second_class}
                    onChange={this.checkSecondClass}
                  />
                  <div className="toggler-slider">
                    <div className="toggler-knob"></div>
                  </div>
                </label>
              </div>
            </div>
            <div className={styles.sideBar__services__item}>
              <div className={styles.sideBar__services__title}>
                <img src={iconEconomclass} alt="иконка Плацкарт" />
                <p>Плацкарт</p>
              </div>
              <div className={styles.sideBar__services__input}>
                <label htmlFor="customSwitch2" className="toggler-wrapper style-3">
                  <input
                    type="checkbox"
                    id="customSwitch2"
                    checked={this.props.have_third_class}
                    onChange={this.checkThirdClass}
                  />
                  <div className="toggler-slider">
                    <div className="toggler-knob"></div>
                  </div>
                </label>
              </div>
            </div>
            <div className={styles.sideBar__services__item}>
              <div className={styles.sideBar__services__title}>
                <img src={iconSedentary} alt="иконка Сидячий" />
                <p>Сидячий</p>
              </div>
              <div className={styles.sideBar__services__input}>
                <label htmlFor="customSwitch3" className="toggler-wrapper style-3">
                  <input
                    type="checkbox"
                    id="customSwitch3"
                    checked={this.props.have_fourth_class}
                    onChange={this.checkFourthClass}
                  />
                  <div className="toggler-slider">
                    <div className="toggler-knob"></div>
                  </div>
                </label>
              </div>
            </div>
            <div className={styles.sideBar__services__item}>
              <div className={styles.sideBar__services__title}>
                <img src={iconLuxury} alt="иконка Люкс" />
                <p>Люкс</p>
              </div>
              <div className={styles.sideBar__services__input}>
                <label htmlFor="customSwitch4" className="toggler-wrapper style-3">
                  <input
                    type="checkbox"
                    id="customSwitch4"
                    checked={this.props.have_first_class}
                    onChange={this.checkFirstClass}
                  />
                  <div className="toggler-slider">
                    <div className="toggler-knob"></div>
                  </div>
                </label>
              </div>
            </div>
            <div className={styles.sideBar__services__item}>
              <div className={styles.sideBar__services__title}>
                <img src={iconWifi} alt="иконка Wi-Fi" />
                <p>Wi-Fi</p>
              </div>
              <div className={styles.sideBar__services__input}>
                <label htmlFor="customSwitch5" className="toggler-wrapper style-3">
                  <input type="checkbox" id="customSwitch5" checked={this.props.have_wifi} onChange={this.checkWiFi} />
                  <div className="toggler-slider">
                    <div className="toggler-knob"></div>
                  </div>
                </label>
              </div>
            </div>
            <div className={styles.sideBar__services__item}>
              <div className={styles.sideBar__services__title}>
                <img src={iconExpress} alt="иконка Экспресс" />
                <p>Экспресс</p>
              </div>
              <div className={styles.sideBar__services__input}>
                <label htmlFor="customSwitch6" className="toggler-wrapper style-3">
                  <input
                    type="checkbox"
                    id="customSwitch6"
                    checked={this.props.have_express}
                    onChange={this.checkExpress}
                  />
                  <div className="toggler-slider">
                    <div className="toggler-knob"></div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div className={styles.sideBar__cost}>
            <form>
              <p className={styles.sideBar__cost__title}>Стоимость</p>
              <div className={styles.sideBar__cost__range}>
                <span>от</span>
                <span>до</span>
              </div>
              <CompoundSlider setPrice={this.setPrice} />
            </form>
          </div>

          {this.props.customRangeCostFrom ? (
            <div className={styles.sideBar__timeContainer}>
              <div className={styles.sideBar__time}>
                <p className={styles.sideBar__time__title}>
                  <img src={iconThere} alt="Туда" />
                  Туда
                </p>
                <img onClick={() => this.setCustomRangeCostFrom(false)} src={iconMinus} alt="иконка плюс" />
              </div>
              <div className={styles.sideBar__timeForms}>
                <form>
                  <label htmlFor="customRange3">Время отбытия</label>
                  <CompoundSliderSmall setHoursFilter={this.startDeparture} />
                </form>
                <form>
                  <div>
                    <label htmlFor="customRange3">Время прибытия</label>
                  </div>
                  <CompoundSliderSmall setHoursFilter={this.startArrival} />
                </form>
              </div>
            </div>
          ) : (
            <div className={styles.sideBar__timeContainer}>
              <div className={styles.sideBar__time}>
                <p className={styles.sideBar__time__title}>
                  <img src={iconThere} alt="иконка туда" />
                  Туда
                </p>
                <img onClick={() => this.setCustomRangeCostFrom(true)} src={iconPlus} alt="иконка плюс" />
              </div>
            </div>
          )}

          {this.props.customRangeCostTo ? (
            <div>
              <div className={styles.sideBar__time}>
                <p className={styles.sideBar__time__title}>
                  <img src={iconBack} alt="иконка туда" />
                  Обратно
                </p>
                <img onClick={() => this.setCustomRangeCostTo(false)} src={iconMinus} alt="иконка плюс" />
              </div>
              <div className={styles.sideBar__timeForms}>
                <form>
                  <label htmlFor="customRange3">Время отбытия</label>
                  <CompoundSliderSmall setHoursFilter={this.endDeparture} />
                </form>
                <form>
                  <div>
                    <label htmlFor="customRange3">Время прибытия</label>
                  </div>
                  <CompoundSliderSmall setHoursFilter={this.endArrival} />
                </form>
              </div>
            </div>
          ) : (
            <div className={styles.sideBar__time}>
              <p className={styles.sideBar__time__title}>
                <img src={iconBack} alt="иконка обратно" />
                Обратно
              </p>
              <img onClick={() => this.setCustomRangeCostTo(true)} src={iconPlus} alt="иконка плюс" />
            </div>
          )}
        </div>

        <div className={styles.sideBar__lastTickets}>
          <h4>Последние билеты</h4>
          {lastTickets}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    form: state.sectionSearch.form,
    lastRoutes: state.sectionSearch.lastRoutes,
    ticketsArray: state.filterChoiceTicketsAndSeatsPages.ticketsArray,
    items: state.filterChoiceTicketsAndSeatsPages.tickets,
    total_count: state.filterChoiceTicketsAndSeatsPages.totalCountTickets,
    have_second_class: state.filterChoiceTicketsAndSeatsPages.have_second_class,
    have_third_class: state.filterChoiceTicketsAndSeatsPages.have_third_class,
    have_fourth_class: state.filterChoiceTicketsAndSeatsPages.have_fourth_class,
    have_first_class: state.filterChoiceTicketsAndSeatsPages.have_first_class,
    have_wifi: state.filterChoiceTicketsAndSeatsPages.have_wifi,
    have_express: state.filterChoiceTicketsAndSeatsPages.have_express,
    price_arr: state.filterChoiceTicketsAndSeatsPages.price_arr,
    start_departure_hour_arr: state.filterChoiceTicketsAndSeatsPages.start_departure_hour_arr,
    start_arrival_hour_arr: state.filterChoiceTicketsAndSeatsPages.start_arrival_hour_arr,
    end_departure_hour_arr: state.filterChoiceTicketsAndSeatsPages.end_departure_hour_arr,
    end_arrival_hour_arr: state.filterChoiceTicketsAndSeatsPages.end_arrival_hour_arr,
    customRangeCostFrom: state.filterChoiceTicketsAndSeatsPages.customRangeCostFrom,
    customRangeCostTo: state.filterChoiceTicketsAndSeatsPages.customRangeCostTo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setDataForm: (form) => {
      const action = setDataFormAC(form);
      dispatch(action);
    },
    getLasRoutes: () => {
      dispatch(getLastRoutesTC());
    },
    setSeatsAndTickets: (fieldName, fieldValue) => dispatch(filterTicketsAndSeatsReducerTC(fieldName, fieldValue)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TicketsSideBar));
