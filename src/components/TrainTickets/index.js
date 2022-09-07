import React from 'react';
import { connect } from 'react-redux';
import { filterTicketsAndSeatsReducerTC } from '../../redux/reducers/filterTicketsAndSeats-reducer';
import { withRouter } from 'react-router';
import ResultTrainTicket from '../ResultTrainTicket';
import iconSearchLeft from '../../assets/images/icon_page_search_left.png';
import iconSearchRight from '../../assets/images/icon_page_search_right.png';
import styles from './styles.module.scss';

class TrainTickets extends React.Component {
  state = {
    nextPageDisabled: false,
    prevPageDisabled: true,
  };

  componentDidMount() {
    this.props.setSeatsAndTicketsEvent('actualPage', this.props.match.url);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.total_count !== this.props.total_count ||
      prevProps.sort !== this.props.sort ||
      prevProps.limit !== this.props.limit ||
      prevProps.offset !== this.props.offset
    ) {
      this.props.setSeatsAndTicketsEvent('actualPage', this.props.match.url);
      if (Math.ceil(Number(this.props.total_count) / Number(this.props.limit)) <= 1) {
        this.setState({ nextPageDisabled: true });
      }
    }
  }

  setTrainId = (trainId) => this.props.setSeatsAndTicketsEvent('trainId', trainId);

  sortSearch = (event) => this.props.setSeatsAndTicketsEvent('sort', event.currentTarget.value);

  filterChoiceTickets = (event) => {
    this.props.setSeatsAndTicketsEvent('limit', event.currentTarget.innerHTML);
    this.props.setSeatsAndTicketsEvent('offset', 0);
    this.setState({ nextPageDisabled: false });
  };

  setPrevPageOffset = () => {
    if (this.props.offset / Number(this.props.limit) === 1) {
      this.setState({ prevPageDisabled: true });
    }
    this.props.setSeatsAndTicketsEvent('offset', this.props.offset - Number(this.props.limit));
    this.setState({ nextPageDisabled: false });
  };

  setNextPageOffset = () => {
    let pages = Math.ceil(Number(this.props.total_count) / Number(this.props.limit));
    if (pages === this.props.offset / Number(this.props.limit) + 2) {
      this.setState({ nextPageDisabled: true });
    }
    if (pages >= this.props.offset / Number(this.props.limit) - 2) {
      this.setState({ prevPageDisabled: false });
    }
    this.props.setSeatsAndTicketsEvent('offset', this.props.offset + Number(this.props.limit));
  };

  setButtonOffset = (event) => {
    this.props.setSeatsAndTicketsEvent(
      'offset',
      Number(this.props.limit) * Number(event.currentTarget.innerHTML) - Number(this.props.limit)
    );

    let pages = Math.ceil(Number(this.props.total_count) / Number(this.props.limit));

    if (pages === Number(event.currentTarget.innerHTML)) {
      this.setState({
        nextPageDisabled: true,
        prevPageDisabled: false,
      });
    } else if (Number(event.currentTarget.innerHTML) === 1) {
      this.setState({
        prevPageDisabled: true,
        nextPageDisabled: false,
      });
    } else {
      this.setState({
        nextPageDisabled: false,
        prevPageDisabled: false,
      });
    }
  };

  render() {
    let classFilterChoiceFive = this.props.limit === '5' ? 'active' : '';
    let classFilterChoiceTen = this.props.limit === '10' ? 'active' : '';
    let classFilterChoiceTwenty = this.props.limit === '20' ? 'active' : '';

    let pages = Math.ceil(Number(this.props.total_count) / Number(this.props.limit));
    let buttonsPages = [];

    for (let i = 1; i <= pages; i++) {
      const cls = ['page-number'];
      if (this.props.offset / Number(this.props.limit) + 1 === i) {
        cls.push('active');
      }
      buttonsPages.push(
        <button className={cls.join(' ')} key={i} type="button" onClick={this.setButtonOffset}>
          {i}
        </button>
      );
    }

    const resultTrainTickets = this.props.ticketsArray
      ? this.props.ticketsArray.map((el, idx) => (
          <ResultTrainTicket key={idx} state={el} setTrainId={this.setTrainId} />
        ))
      : [];

    return (
      <div className={styles.tickets}>
        <div className={styles.tickets__head}>
          <div>найдено {this.props.total_count}</div>
          <div className={styles.tickets__head__filter}>
            <div className={styles.tickets__head__sort}>
              сортировать по:
              <select name="sortTrain" id="sort" onChange={this.sortSearch} value={this.props.sort}>
                <option value="date">времени</option>
                <option value="price">стоимости</option>
                <option value="duration">длительности</option>
              </select>
            </div>
            <div className={styles.tickets__head__show}>
              показывать по:
              <button className={classFilterChoiceFive} onClick={this.filterChoiceTickets}>
                5
              </button>
              <button className={classFilterChoiceTen} onClick={this.filterChoiceTickets}>
                10
              </button>
              <button className={classFilterChoiceTwenty} onClick={this.filterChoiceTickets}>
                20
              </button>
            </div>
          </div>
        </div>

        {resultTrainTickets}

        {resultTrainTickets.length > 0 && (
          <div className={styles.tickets__pages}>
            <button
              className={styles.tickets__pages__right}
              type="button"
              onClick={this.setPrevPageOffset}
              disabled={this.state.prevPageDisabled}
            >
              <img src={iconSearchLeft} alt="Назад" />
            </button>

            {buttonsPages}

            <button
              className={styles.tickets__pages__left}
              type="button"
              onClick={this.setNextPageOffset}
              disabled={this.state.nextPageDisabled}
            >
              <img src={iconSearchRight} alt="Вперед" />
            </button>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ticketsArray: state.filterChoiceTicketsAndSeatsPages.ticketsArray,
    total_count: state.filterChoiceTicketsAndSeatsPages.totalCountTickets,
    sort: state.filterChoiceTicketsAndSeatsPages.sort,
    limit: state.filterChoiceTicketsAndSeatsPages.limit,
    offset: state.filterChoiceTicketsAndSeatsPages.offset,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSeatsAndTicketsEvent: (fieldName, fieldValue) => dispatch(filterTicketsAndSeatsReducerTC(fieldName, fieldValue)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TrainTickets));
