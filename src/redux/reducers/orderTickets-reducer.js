import { actions as _A } from './../actions/actionTypes';

const initState = {
	user: {
		first_name: "Иван",
		last_name: "Смирнов",
		patronymic: "Олегович",
		phone: "8900123123",
		email: "string@string.ru",
		payment_method: "cash"
	},
	departure: {
		route_direction_id: "123431",
		seats: [{
			coach_id: "12341",
			person_info: {
				is_adult: true,
				first_name: "Ivan",
				last_name: "Popov",
				patronymic: "Popovich",
				gender: true,
				birthday: "1980-01-01",
				document_type: "паспорт",
				document_data: "45 6790195"
			},
			seat_number: 10,
			is_child: true,
			include_children_seat: true
		}]
	}
};

const orderTicketsReducer = (state = initState, action) => {
	switch (action.type) {
		case _A.SET_ROUTE_TRAIN_SEAT:
			return {
				...state,
				user: { ...state.user },
				departure: {
					...state.departure,
					route_direction_id: action.route_direction_id,
					seats: action.seat_number.map((s) => {
						return {
							person_info: {
								is_adult: true,
								first_name: "Ivan",
								last_name: "Popov",
								patronymic: "Popovich",
								gender: true,
								birthday: "1980-01-01",
								document_type: "паспорт",
								document_data: "45 6790195"
							},
							coach_id: action.coach_id,
							seat_number: s,
							is_child: action.is_child,
							include_children_seat: action.include_children_seat
						}
					})
				}
			}
		
		case _A.SET_PERSON_INFO:
			return {
				...state,
				user: { ...state.user },
				departure: {
					...state.departure,
					seats: state.departure.seats.map((s, i) => {
						if (i === action.number - 1) {
							return {
								...s,
								person_info: action.data,
							}
						} else {
								return {
									...s, 
									person_info: {...s.person_info}
								}
						}
					})
				}
			}

		case _A.SET_USER_DATA:
			return {
				...state,
				user: action.data,
				departure: {
					...state.departure,
					seats: state.departure.seats.map((s) => {
						return {
							...s
						}
					})
				}
			}

		default:
			return state;
	}
}

export default orderTicketsReducer;