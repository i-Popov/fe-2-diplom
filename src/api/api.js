import * as axios from 'axios';

const instance = axios.create({
  baseURL: 'https://netology-trainbooking.netoservices.ru/',
});

export const api = {
  searchRoutes(value) {
    return instance.get(`routes/cities?name=${value}`);
  },
  getLastRoutes() {
    return instance.get('routes/last');
  },
  filterTicketsAndSeatsAPI(sectionSearch, sortTickets) {
    // cityWhereFromId: "5b9a2fa7f83e028786ea5672"
    // cityWhereToId: "5b9a2fa7f83e028786ea5673"
    // `routes?from_city_id=${cityWhereFromId}&to_city_id=${cityWhereToId}` (line 28) old
    // `routes?from_city_id=${sectionSearch.cityWhereFromId}&to_city_id=${sectionSearch.cityWhereToId}` (line 24)

    //test string (line 24)
    // `routes?from_city_id=${'5b9a2fa7f83e028786ea5672'}&to_city_id=${'5b9a2fa7f83e028786ea5673'}`

    return instance.get(
      `routes?from_city_id=${sectionSearch.cityWhereFromId}&to_city_id=${sectionSearch.cityWhereToId}` +
        (`${sortTickets.sort}` ? `&sort=${sortTickets.sort}` : '') +
        (`${sortTickets.limit}` ? `&limit=${sortTickets.limit}` : '') +
        (`${sortTickets.offset}` ? `&offset=${sortTickets.offset}` : '') +
        `${sortTickets.have_second_class ? '&have_second_class=true' : ''}` +
        `${sortTickets.have_third_class ? '&have_third_class=true' : ''}` +
        `${sortTickets.have_fourth_class ? '&have_fourth_class=true' : ''}` +
        `${sortTickets.have_first_class ? '&have_first_class=true' : ''}` +
        `${sortTickets.have_wifi ? '&have_wifi=true' : ''}` +
        `${sortTickets.have_express ? '&have_express=true' : ''}` +
        `${sortTickets.price_arr[0] ? `&price_from=${sortTickets.price_arr[0]}` : ''}` +
        `${sortTickets.price_arr[1] ? `&price_to=${sortTickets.price_arr[1]}` : ''}` +
        `${
          sortTickets.start_departure_hour_arr[0]
            ? `&start_departure_hour_from=${sortTickets.start_departure_hour_arr[0]}`
            : ''
        }` +
        `${
          sortTickets.start_departure_hour_arr[1]
            ? `&start_departure_hour_to=${sortTickets.start_departure_hour_arr[1]}`
            : ''
        }` +
        `${
          sortTickets.start_arrival_hour_arr[0]
            ? `&start_arrival_hour_from=${sortTickets.start_arrival_hour_arr[0]}`
            : ''
        }` +
        `${
          sortTickets.start_arrival_hour_arr[1] ? `&start_arrival_hour_to=${sortTickets.start_arrival_hour_arr[1]}` : ''
        }` +
        `${
          sortTickets.end_departure_hour_arr[0]
            ? `&end_departure_hour_from=${sortTickets.end_departure_hour_arr[0]}`
            : ''
        }` +
        `${
          sortTickets.end_departure_hour_arr[1] ? `&end_departure_hour_to=${sortTickets.end_departure_hour_arr[1]}` : ''
        }` +
        `${
          sortTickets.end_arrival_hour_arr[0] ? `&end_arrival_hour_from=${sortTickets.end_arrival_hour_arr[0]}` : ''
        }` +
        `${sortTickets.end_arrival_hour_arr[1] ? `&end_arrival_hour_to=${sortTickets.end_arrival_hour_arr[1]}` : ''}`
    );
  },
  setSeatSelection(sortTickets) {
    return instance.get(
      `routes/${sortTickets.trainId === '' ? '5b9a3488f83e028786ea6ff8' : sortTickets.trainId}/seats?` +
        `${sortTickets.have_second_class ? '&have_second_class=true' : ''}` +
        `${sortTickets.have_third_class ? '&have_third_class=true' : ''}` +
        `${sortTickets.have_fourth_class ? '&have_fourth_class=true' : ''}` +
        `${sortTickets.have_first_class ? '&have_first_class=true' : ''}` +
        `${sortTickets.have_wifi ? '&have_wifi=true' : ''}` +
        `${sortTickets.have_express ? '&have_express=true' : ''}`
    );
  },
};
///////////////////////////////////////////
fetch('https://netology-trainbooking.netoservices.ru/', {
  method: 'POST',
  body: JSON.stringify({
    user: {
      first_name: 'Иван',
      last_name: 'Смирнов',
      patronymic: 'Олегович',
      phone: '8900123123',
      email: 'string@string.ru',
      payment_method: 'cash', // или online
    },
    departure: {
      route_direction_id: '123431',
      seats: [
        {
          coach_id: '12341',
          person_info: {
            is_adult: true,
            first_name: 'Ivan',
            last_name: 'Popov',
            patronymic: 'Popovich',
            gender: true,
            birthday: '1980-01-01',
            document_type: 'паспорт',
            document_data: '45 6790195',
          },
          seat_number: 10,
          is_child: true,
          include_children_seat: true,
        },
      ],
    },
  }),
})
  .then((response) => response.json())
  .then(console.log);
