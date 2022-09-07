import React from 'react';
import { connect } from 'react-redux';
import { setDataFormAC } from '../../redux/actions/action';
import { Typeahead } from 'react-bootstrap-typeahead';
import { searchMainAPI } from '../../redux/reducers/searchMain-reducer';
import { withRouter } from 'react-router';
import { filterTicketsAndSeatsReducerTC } from '../../redux/reducers/filterTicketsAndSeats-reducer';
import { Container } from '../UI/Container';
import iconCachedWhite from '../../assets/images/icon_cached_white.png';
import styles from './styles.module.scss';

class HeaderSearchForm extends React.Component {
  state = {
    dataCities: [],
    valueFromCity: this.props.form.whereFromCity,
    valueToCity: this.props.form.whereToCity,
    whereFromCity: this.props.form.whereFromCity,
    whereToCity: this.props.form.whereToCity,
    whereFromDate: this.props.form.whereFromDate,
    whereToDate: this.props.form.whereToDate,
    cityWhereFromId: this.props.form.cityWhereFromId,
    cityWhereToId: this.props.form.cityWhereToId,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.valueFromCity !== this.state.valueFromCity) {
      this.props
        .searchRoutes(this.state.valueFromCity)
        .then((data) =>
          this.setState(
            data.data.error ? { dataCities: [], valueFromCity: data.data.error } : { dataCities: data.data }
          )
        );
    }

    if (prevState.valueToCity !== this.state.valueToCity) {
      this.props
        .searchRoutes(this.state.valueToCity)
        .then((data) =>
          this.setState(data.data.error ? { dataCities: [], valueToCity: data.data.error } : { dataCities: data.data })
        );
    }
  }

  setFromValue = (event) => {
    this.setState({ valueFromCity: event });
  };

  setToValue = (event) => {
    this.setState({ valueToCity: event });
  };

  setWhereFromCity = (event) => {
    if (event.length !== 0) {
      const city = this.state.dataCities.find((el) => el.name === event[0]);

      this.setState({ whereFromCity: event[0], cityWhereFromId: city._id, dataCities: [] });
    }
  };

  setWhereToCity = (event) => {
    if (event.length !== 0) {
      const city = this.state.dataCities.find((el) => el.name === event[0]);

      this.setState({ whereToCity: event[0], cityWhereToId: city._id, dataCities: [] });
    }
  };

  setWhereFromDate = (event) => {
    this.setState({ whereFromDate: event.currentTarget.value });
  };

  setWhereToDate = (event) => {
    this.setState({ whereToDate: event.currentTarget.value });
  };

  saveMainState = () => {
    const { whereFromCity, whereToCity, whereFromDate, whereToDate, cityWhereFromId, cityWhereToId } = this.state;
    const setForm = { whereFromCity, whereToCity, whereFromDate, whereToDate, cityWhereFromId, cityWhereToId };

    this.props.setDataForm(setForm);

    window.scrollTo(0, 700);

    this.props.setSeatsAndTicketsEvent('actualPage', this.props.match.url);

    this.props.history.push('/dashboard/tickets');
  };

  disabledButton = () =>
    this.state.whereFromCity === '' ||
    this.state.whereToCity === '' ||
    this.state.whereFromDate === '' ||
    this.state.whereToDate === '' ||
    this.state.cityWhereFromId === '' ||
    this.state.cityWhereToId === '';

  render() {
    const options = this.state.dataCities.map((el) => el.name);

    return (
      <section className={styles.search}>
        <Container>
          <div className={styles.search__row}>
            <div className={styles.search__forms}>
              <form className={styles.search__form} action="input">
                <p className={styles.search__form__title}>Направление</p>
                <div className={styles.search__form__row}>
                  <Typeahead
                    value={this.state.valueFromCity}
                    placeholder={this.state.valueFromCity ? this.state.valueFromCity : 'Откуда'}
                    id="whereFromCity"
                    options={options}
                    onInputChange={this.setFromValue}
                    onChange={this.setWhereFromCity}
                    className={styles.search__form__input}
                  />

                  <img className={styles.search__form__change} src={iconCachedWhite} alt="..." />

                  <Typeahead
                    value={this.state.valueToCity}
                    placeholder={this.state.valueToCity ? this.state.valueToCity : 'Куда'}
                    id="whereToCity"
                    options={options}
                    onInputChange={this.setToValue}
                    onChange={this.setWhereToCity}
                    className={styles.search__form__input}
                  />
                </div>
              </form>
              <form className={styles.search__form} action="input">
                <p className={styles.search__form__title}>Дата</p>
                <div className={styles.search__form__row}>
                  <input
                    className={styles.search__form__date}
                    key="dateFrom"
                    type="date"
                    onChange={this.setWhereFromDate}
                    value={this.state.whereFromDate}
                  />
                  <input
                    className={styles.search__form__date}
                    key="dateTo"
                    type="date"
                    onChange={this.setWhereToDate}
                    value={this.state.whereToDate}
                  />
                </div>
              </form>
            </div>
            <div className={styles.search__form__button}>
              <button type="button" disabled={this.disabledButton()} onClick={this.saveMainState}>
                Найти билеты
              </button>
            </div>
          </div>
        </Container>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    form: state.sectionSearch.form,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchRoutes: (value) => searchMainAPI(value),
    setDataForm: (form) => {
      const action = setDataFormAC(form);
      dispatch(action);
    },
    setSeatsAndTicketsEvent: (fieldName, fieldValue) => dispatch(filterTicketsAndSeatsReducerTC(fieldName, fieldValue)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderSearchForm));
