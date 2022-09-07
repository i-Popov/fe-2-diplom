import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { setDataFormAC } from '../../redux/actions/action';
import { Typeahead } from 'react-bootstrap-typeahead';
import { withRouter } from 'react-router-dom';
import { searchMainAPI } from '../../redux/reducers/searchMain-reducer';
import { Container } from '../UI/Container';
import iconCachedWhite from '../../assets/images/icon_cached_white.png';
import styles from './styles.module.scss';

class MainPageHeaderAndForm extends React.Component {
  state = {
    dataCities: [],
    valueFromCity: this.props.form.whereFromCity,
    valueToCity: this.props.form.whereToCity,
    whereFromCity: this.props.form.whereFromCity,
    whereFromDate: this.props.form.whereFromDate,
    whereToCity: this.props.form.whereToCity,
    whereToDate: this.props.form.whereToDate,
    cityWhereFromId: this.props.form.cityWhereFromId,
    cityWhereToId: this.props.form.cityWhereToId,
  };

  componentDidMount() {
    this.props
      .searchRoutes('')
      .then((data) =>
        this.setState(data.data.error ? { dataCities: [], value: data.data.error } : { dataCities: data.data })
      );
  }

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
      <section className={styles.jumbotron}>
        <Container>
          <div className={styles.jumbotron__row}>
            <div className={styles.jumbotron__title}>
              <h1>
                Вся жизнь -<br /> <span>путешествие!</span>
              </h1>
            </div>
            <div className={styles.jumbotron__form}>
              <form>
                <p className={styles.jumbotron__form__direction}>Направление</p>
                <div className={styles.jumbotron__form__row}>
                  <Fragment>
                    <Typeahead
                      value={this.state.setWhereFromCity}
                      placeholder={this.state.dataCities.error ? this.state.dataCities.error : 'Откуда'}
                      id="whereFromCity"
                      options={options}
                      onInputChange={this.setFromValue}
                      onChange={this.setWhereFromCity}
                      className={styles.jumbotron__form__input}
                    />
                  </Fragment>
                  <img className={styles.jumbotron__form__change} src={iconCachedWhite} alt="..." />
                  <Typeahead
                    value={this.state.setWhereToCity}
                    placeholder={this.state.dataCities.error ? this.state.dataCities.error : 'Куда'}
                    id="whereToCity"
                    options={options}
                    onInputChange={this.setToValue}
                    onChange={this.setWhereToCity}
                    className={styles.jumbotron__form__input}
                  />
                </div>
              </form>
              <form>
                <p className={styles.jumbotron__form__direction}>Дата</p>
                <div className={styles.jumbotron__form__row}>
                  <input
                    className={styles.jumbotron__form__date}
                    type="date"
                    value={this.state.whereFromDate}
                    onChange={this.setWhereFromDate}
                  />
                  <input
                    className={styles.jumbotron__form__date}
                    type="date"
                    value={this.state.whereToDate}
                    onChange={this.setWhereToDate}
                  />
                </div>
              </form>
              <div className={styles.jumbotron__form__button}>
                <button type="button" disabled={this.disabledButton()} onClick={this.saveMainState}>
                  найти билеты
                </button>
              </div>
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
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainPageHeaderAndForm));
