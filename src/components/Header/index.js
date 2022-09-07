import React from 'react';
import { Container } from '../UI/Container';
import logo from '../../assets/images/logo.png';
import styles from './styles.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__logo}>
        <Container>
          <a href="/" id="header_logo">
            <img src={logo} alt="ЖД Билеты" />
          </a>
        </Container>
      </div>
      <div className={styles.header__nav}>
        <Container>
          <nav>
            <a href="/#about">О нас</a>
            <a href="/#work">Как это работает</a>
            <a href="/#reviews">Отзывы</a>
            <a href="/#contacts">Контакты</a>
          </nav>
        </Container>
      </div>
    </header>
  );
};

export default Header;
