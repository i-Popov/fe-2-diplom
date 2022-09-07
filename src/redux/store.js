import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import searchMainReducer from './reducers/searchMain-reducer';
import  thunk  from 'redux-thunk';
import filterTicketsAndSeatsReducer from './reducers/filterTicketsAndSeats-reducer';
import orderTicketsReducer from './reducers/orderTickets-reducer';
import passengersAndPayReducer from './reducers/passengersAndPay-reducer';


const reducers = combineReducers({
	sectionSearch: searchMainReducer,
	filterChoiceTicketsAndSeatsPages: filterTicketsAndSeatsReducer,
	orderTicketsSeats: orderTicketsReducer,
	passengersAndPay: passengersAndPayReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
