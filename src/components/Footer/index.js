import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container } from '../UI/Container';
import iconScrollTop from '../../assets/images/icon_footer_bottom.png';
import phone from '../../assets/images/icon_footer_phone.png';
import skype from '../../assets/images/icon_footer_skype.png';
import message from '../../assets/images/icon_footer_message.png';
import location from '../../assets/images/icon_footer_location.png';
import youtube from '../../assets/images/icon_footer_youtube.png';
import lin from '../../assets/images/icon_footer_in.png';
import googlePlus from '../../assets/images/icon_footer_google_plus.png';
import fb from '../../assets/images/icon_footer_facebook.png';
import tw from '../../assets/images/icon_footer_twitter.png';
import logo from '../../assets/images/logo.png';
import styles from './styles.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer} id="contacts">
      <Container>
        <div className={styles.footer__row}>
          <div className={styles.footer__contacts}>
            <h3>Свяжитесь с нами</h3>
            <div className={styles.footer__contacts__item}>
              <img src={phone} alt="Телефон" />
              <p>8 (800) 000 00 00</p>
            </div>
            <div className={styles.footer__contacts__item}>
              <img src={message} alt="E-mail" />
              <p>inbox@mail.ru</p>
            </div>
            <div className={styles.footer__contacts__item}>
              <img src={skype} alt="Skype" />
              <p>tu.train.tickets</p>
            </div>
            <div className={styles.footer__contacts__item}>
              <img src={location} alt="Адрес" />
              <p>
                г. Москва <br />
                ул. Московская <br />
                27-35 555 555
              </p>
            </div>
          </div>
          <div className={styles.footer__subscribe}>
            <div className={styles.footer__subscribe__form}>
              <h3>Подписка</h3>
              <p>Будьте в курсе событий</p>
              <form action="input">
                <input type="text" placeholder="e-mail" />
                <button>отправить</button>
              </form>
            </div>
            <div className={styles.footer__social}>
              <h3>Подписывайтесь на нас</h3>
              <div className={styles.footer__social__row}>
                <a href="/">
                  <img src={youtube} alt="YouTube" />
                </a>
                <a href="/">
                  <img src={lin} alt="In" />
                </a>
                <a href="/">
                  <img src={googlePlus} alt="Google Plus" />
                </a>
                <a href="/">
                  <img src={fb} alt="Facebook" />
                </a>
                <a href="/">
                  <img src={tw} alt="Twitter" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <div className={styles.footer__bottom}>
        <Container>
          <div className={styles.footer__bottom__row}>
            <NavLink className={styles.footer__bottom__logo} to="/" id="header_logo">
              <img src={logo} alt="ЖД Билеты" />
            </NavLink>
            <div className={styles.footer__bottom__scroll} onClick={() => window.scrollTo(0, 0)}>
              <img src={iconScrollTop} alt="Scroll Top" />
            </div>
            <p className={styles.footer__bottom__copyright}>2022 WEB</p>
          </div>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
