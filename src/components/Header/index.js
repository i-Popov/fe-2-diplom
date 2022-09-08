import React from 'react';
import { Container } from '../UI/Container';
import { NavLink } from 'react-router-dom';
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
            <NavLink to="/" onClick={() => window.scroll(0, 800)}>
              О нас
            </NavLink>
            <NavLink to="/" onClick={() => window.scroll(0, 1400)}>
              Как это работает
            </NavLink>
            <NavLink to="/" onClick={() => window.scroll(0, 2000)}>
              Отзывы
            </NavLink>
            <NavLink to="/" onClick={() => window.scroll(0, 2500)}>
              Контакты
            </NavLink>
          </nav>
        </Container>
      </div>
    </header>
  );
};

export default Header;
