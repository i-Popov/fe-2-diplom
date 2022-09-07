import React from 'react';
import { useForm } from 'react-hook-form';
import iconMinusSircle from '../../assets/images/icon_minus_sircle.png';
import iconCloseX from '../../assets/images/icon_close_x.png';
import iconCloseXCircle from '../../assets/images/icon_close_x_sircle.png';
import iconPlusSircle from '../../assets/images/icon_plus_sircle.png';
import styles from './styles.module.scss';

const FormValidationErrors = (props) => {
  const errors = props.errors;
  if (Object.keys(errors).length === 0) {
    return null;
  }
  console.log(errors);
  return (
    <div className={styles.form__errors}>
      {errors.last_name && errors.last_name.type === 'required' && (
        <h4>
          <img src={iconCloseXCircle} alt="..." />
          Укажите фамилию
        </h4>
      )}
      {errors.first_name && errors.first_name.type === 'required' && (
        <h4>
          <img src={iconCloseXCircle} alt="..." />
          Укажите имя
        </h4>
      )}
      {errors.patronymic && errors.patronymic.type === 'required' && (
        <h4>
          <img src={iconCloseXCircle} alt="..." />
          Укажите отчество
        </h4>
      )}
      {errors.birthday && errors.birthday.type === 'required' && (
        <h4>
          <img src={iconCloseXCircle} alt="..." />
          Укажите дату рождения
        </h4>
      )}
      {errors.serial && errors.serial.type === 'required' && (
        <h4>
          <img src={iconCloseXCircle} alt="..." />
          Укажите серию паспота
        </h4>
      )}
      {errors.number && errors.number.type === 'required' && (
        <h4>
          <img src={iconCloseXCircle} alt="..." />
          Укажите номер паспота
        </h4>
      )}
      {errors.document_data && errors.document_data.type === 'required' && (
        <h4>
          <img src={iconCloseXCircle} alt="..." />
          Укажите номер свидетельства о рождении
        </h4>
      )}
    </div>
  );
};

const Form = (props) => {
  console.log(props);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data, e) => {
    let newData = { ...data };

    if (data.document_type === 'Паспорт') {
      newData = {
        ...data,
        document_data: data.serial + ' ' + data.number,
      };
      delete newData.serial;
      delete newData.number;
    }

    props.setData(newData, props.passengerNumber);
    props.setActiveButton();
  };

  const onError = (errors, e) => {
    console.log(errors);
  };

  const documents = (value) => {
    if (value === 'Паспорт') {
      props.setDocumentTrue();
    } else {
      props.setDocumentFalse();
    }
  };

  return (
    <>
      {props.active ? (
        <form onSubmit={handleSubmit(onSubmit, onError)} className={styles.form}>
          <div className={styles.form__head}>
            <div className={styles.form__head__title}>
              <button onClick={props.setActiveFalse}>
                <img src={iconMinusSircle} alt="..." />
              </button>

              <h4>Пассажир {props.passengerNumber}</h4>
            </div>

            <img src={iconCloseX} alt="..." />
          </div>

          <div className={styles.form__adult}>
            <select {...register('is_adult', { required: true })}>
              <option value={true}>Взрослый</option>
              <option value={false}>Десткий</option>
            </select>
          </div>

          <div className={styles.form__name}>
            <div>
              <p className={styles.form__name__label}>Фамилия</p>
              <input type="text" placeholder="Мартынюк" {...register('last_name', { required: true, maxLength: 30 })} />
              {errors.last_name && errors.last_name.type === 'maxLength' && <span>*длина превышена</span>}
            </div>
            <div>
              <p className={styles.form__name__label}>Имя</p>
              <input type="text" placeholder="Ирина" {...register('first_name', { required: true, maxLength: 30 })} />
              {errors.first_name && errors.first_name.type === 'maxLength' && <span>*длина превышена</span>}
            </div>
            <div>
              <p className={styles.form__name__label}>Отчество</p>
              <input
                type="text"
                placeholder="Эдуардовна"
                {...register('patronymic', { required: true, maxLength: 30 })}
              />
              {errors.patronymic && errors.patronymic.type === 'maxLength' && <span>*длина превышена</span>}
            </div>
          </div>

          <div className={styles.form__who}>
            <div className={styles.form__who__gender}>
              <p className={styles.form__who__label}>Пол</p>
              <div className="btn-container">
                <label className="switch btn-color-mode-switch">
                  <input type="checkbox" name="gender" id="color_mode" {...register('gender')} />
                  <label htmlFor="gender" data-on="Ж" data-off="М" className="btn-color-mode-switch-inner" />
                </label>
              </div>
            </div>

            <div className={styles.form__who__date}>
              <p className={styles.form__who__label}>Дата рождения</p>
              <input type="text" placeholder="дд/мм/гг" {...register('birthday', { required: true, maxLength: 30 })} />
              {errors.birthday && errors.birthday.type === 'maxLength' && <span>*длина превышена</span>}
            </div>
          </div>

          <div className={styles.form__invalid}>
            <input type="checkbox" />
            <p>ограниченная подвижность</p>
          </div>

          <div className={styles.form__passport}>
            <div className={styles.form__passport__item}>
              <p className={styles.form__passport__label}>Тип докумета</p>
              <select
                name="document_type"
                {...register('document_type', { required: true })}
                onChange={(e) => documents(e.currentTarget.value)}
              >
                <option value="Паспорт">Паспорт РФ</option>
                <option value="Свидетельство">Свидетельство о рождении</option>
              </select>
            </div>
            {props.documents ? (
              <>
                <div className={styles.form__passport__item}>
                  <p className={styles.form__passport__label}>Серия</p>
                  <input type="text" placeholder="_ _ _ _" {...register('serial', { required: true, maxLength: 4 })} />
                  {errors.serial && errors.serial.type === 'maxLength' && <span>*длина превышена</span>}
                </div>
                <div className={styles.form__passport__item}>
                  <p className={styles.form__passport__label}>Номер</p>
                  <input
                    type="text"
                    placeholder="_ _ _ _ _ _"
                    {...register('number', { required: true, maxLength: 6 })}
                  />
                  {errors.number && errors.number.type === 'maxLength' && <span>*длина превышена</span>}
                </div>
              </>
            ) : (
              <div className={styles.form__passport__item}>
                <p className={styles.form__passport__label}>Номер</p>
                <input
                  type="text"
                  placeholder="_ _ _  _ _  _ _ _ _ _"
                  {...register('document_data', { required: true, maxLength: 10 })}
                />
                {errors.document_data && errors.document_data.type === 'maxLength' && <span>*длина превышена</span>}
              </div>
            )}
          </div>

          <FormValidationErrors errors={errors} />

          <div className={styles.form__next}>
            <button type="submit">Следующий пасссажир</button>
          </div>
        </form>
      ) : (
        <div className={`${styles.form} ${styles.next}`}>
          <div className={styles.form__head}>
            <div className={styles.form__head__title}>
              <button onClick={props.setActiveTrue} disabled={props.disableForm}>
                <img src={iconPlusSircle} alt="..." />
              </button>
              <h4>Пассажир {props.passengerNumber}</h4>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

class PassengerForm extends React.Component {
  state = {
    active: this.props.activeForm,
    documents: true,
  };

  setActiveTrue = () => {
    this.setState({ active: true });
    this.props.setDisableForm();
  };

  setActiveFalse = () => this.setState({ active: false });

  setDocumentTrue = () => this.setState({ documents: true });

  setDocumentFalse = () => this.setState({ documents: false });

  setData = (data, number) => this.props.setPersonInfo(data, number);

  render() {
    return (
      <Form
        disableForm={this.props.disableForm}
        passengerNumber={this.props.passengerNumber}
        setActiveButton={this.props.setActiveButton}
        setData={this.setData}
        active={this.state.active}
        documents={this.state.documents}
        setActiveTrue={this.setActiveTrue}
        setActiveFalse={this.setActiveFalse}
        setDocumentTrue={this.setDocumentTrue}
        setDocumentFalse={this.setDocumentFalse}
      />
    );
  }
}

export default PassengerForm;
