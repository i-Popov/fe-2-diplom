import { actions as _A } from './../actions/actionTypes';

export const setDataFormAC = (form) => ({
	type: _A.SET_FORM,
	form
});

export const setLastRoutes = (lastRoutes) => ({
	type: _A.SET_LAST_ROUTES,
	lastRoutes
});

export const filterTicketsAndSeatsAC = (fieldName, fieldValue) => ({
	type: _A.SET_TICKETS_AND_SEATS,
	fieldName,
	fieldValue
});

export const passengersAndPayAC = (fieldName, fieldValue) => ({
	type: _A.SET_PASSENGER_AND_PAY,
	fieldName,
	fieldValue
});

export const setRouteTrainSeatAC = (
	route_direction_id,
	coach_id,
	seat_number,
	is_child,
	include_children_seat
) => ({
	type: _A.SET_ROUTE_TRAIN_SEAT,
	route_direction_id,
	coach_id,
	seat_number,
	is_child,
	include_children_seat
});

export const setPersonInfoAC = (data, number) => ({ type: _A.SET_PERSON_INFO, data, number });

export const setUserDataAC = (data) => ({ type: _A.SET_USER_DATA, data});