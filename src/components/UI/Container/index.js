import React from 'react';
import styles from './styles.module.scss';

export const Container = ({ children, className }) => (
  <div className={`${styles.container} ${className ? className : ''}`}>{children}</div>
);
