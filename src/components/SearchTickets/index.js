import React from 'react';
import TrainTickets from '../TrainTickets';
import { connect } from 'react-redux';
import { setDataFormAC } from '../../redux/actions/action';
import { filterTicketsAndSeatsReducerTC } from '../../redux/reducers/filterTicketsAndSeats-reducer';
import { withRouter } from 'react-router';
import ProgressLine from '../ProgressLine';
import { Preloader } from '../UI/Preloader';
import { Container } from '../UI/Container';
import TicketsSideBar from '../TicketsSideBar';
import progressStateSelect from '../../assets/images/progress_state_select.png';
import progressStateDefault from '../../assets/images/progress_state_default.png';
import styles from './styles.module.scss';

class SearchTickets extends React.Component {
  state = {
    preloader: this.props.preloader,
  };

  componentDidMount() {
    this.props.setSeatsAndTickets('actualPage', this.props.match.url);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.preloader !== this.props.preloader) {
      this.setState({ preloader: this.props.preloader });
    }
  }

  render() {
    return (
      <>
        {this.state.preloader ? (
          <Preloader />
        ) : (
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
              <div className={styles.searchTickets}>
                <TicketsSideBar />
                <TrainTickets />
              </div>
            </Container>
          </>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    preloader: state.filterChoiceTicketsAndSeatsPages.preloader,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setDataForm: (form) => {
      const action = setDataFormAC(form);
      dispatch(action);
    },
    setSeatsAndTickets: (fieldName, fieldValue) => dispatch(filterTicketsAndSeatsReducerTC(fieldName, fieldValue)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchTickets));
