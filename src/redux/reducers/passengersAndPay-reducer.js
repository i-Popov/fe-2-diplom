import { actions as _A } from './../actions/actionTypes';

const initState = {
	ticketsAdult: 0,
	ticketsChild: 0,
	ticketsChildWithoutPlace: 0,
	payAdult: 0,
	payChild: 0,
	seatsNumbers: []
};

const passengersAndPayReducer = (state = initState, action) => {

	switch (action.type) {
		case _A.SET_PASSENGER_AND_PAY:
			return {
				...state, [action.fieldName]: action.fieldValue
			};
		default:
			return state;
	};
};

export default passengersAndPayReducer;