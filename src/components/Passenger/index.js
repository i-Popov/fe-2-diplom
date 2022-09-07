import React from 'react';
import iconPassangerSircle from '../../assets/images/icon_passanger_sircle.png';
import styles from './styles.module.scss';

const Passenger = (props) => {
  const isAdult = props.personInfo.is_adult === 'true' ? 'Взрослый' : 'Детский';

  const gender = !props.personInfo.gender ? 'мужской' : 'женский';

  const documentType = props.personInfo.document_type === 'Паспорт' ? 'Паспорт РФ' : 'Свидетельство о рождении';

  return (
    <div>
      <div>
        <img src={iconPassangerSircle} alt="..." />
        <h4>{isAdult}</h4>
      </div>
      <div>
        <h4>
          {props.personInfo.last_name} {props.personInfo.first_name} {props.personInfo.patronymic}
        </h4>
        <p>Пол {gender}</p>
        <p>Дата рождения {props.personInfo.birthday}</p>
        <p>
          {documentType} {props.personInfo.document_data}
        </p>
      </div>
    </div>
  );
};

export default Passenger;
