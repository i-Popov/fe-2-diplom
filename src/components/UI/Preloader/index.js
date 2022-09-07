import React from 'react';
import styles from './styles.module.scss';
import preloderAnimation from '../../../assets/images/preloader_animation.gif';

export const Preloader = () => (
  <div className={styles.loader}>
    <p className={styles.loader__title}>Идет поиск</p>
    <img src={preloderAnimation} alt="" />
  </div>
);
