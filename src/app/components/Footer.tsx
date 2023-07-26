/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image';
import logo from '../../assets/logo.webp';
import twitch from '../../../public/twitch.svg';
import youtube from '../../../public/youtube.svg';
import twitter from '../../../public/twitter.svg';
import instagram from '../../../public/instagram.svg';
import facebook from '../../../public/facebook.svg';
import steam from '../../../public/steam.svg';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__social">
        <p className="footer__social__find-us">Retrouvez-nous sur</p>
        <div className="footer__social__items">
          <a
            className="footer__social__items__link"
            href="https://www.youtube.com"
            target="_blank"
          >
            <Image src={youtube} width={40} height={40} alt="Logo Youtube" />
          </a>
          <a
            className="footer__social__items__link"
            href="https://www.twitch.tv"
            target="_blank"
          >
            <Image src={twitch} width={40} height={40} alt="Logo Twitch" />
          </a>
          <a
            className="footer__social__items__link"
            href="https://www.twitter.com"
            target="_blank"
          >
            <Image src={twitter} width={40} height={40} alt="Logo Twitter" />
          </a>
          <a
            className="footer__social__items__link"
            href="https://www.instagram.com"
            target="_blank"
          >
            <Image src={steam} width={40} height={40} alt="Logo Steam" />
          </a>
          <a
            className="footer__social__items__link"
            href="https://www.steam.com"
            target="_blank"
          >
            <Image src={facebook} width={40} height={40} alt="Logo Facebook" />
          </a>
          <a
            className="footer__social__items__link"
            href="https://www.facebook.com"
            target="_blank"
          >
            <Image
              src={instagram}
              width={40}
              height={40}
              alt="Logo Instagram"
            />
          </a>
        </div>
      </div>
      <div className="footer__name">VictoryZone</div>

      <div className="footer__nav">
        <ul className="footer__nav__list">
          <li className="footer__nav__list__item footer__nav__list__item__bordered">
            <a className="footer__nav__list__item__link" href="/">
              Accueil
            </a>
          </li>
          <li className="footer__nav__list__item footer__nav__list__item__bordered">
            <a className="footer__nav__list__item__link" href="/articles">
              Articles
            </a>
          </li>
          <li className="footer__nav__list__item footer__nav__list__item__bordered">
            <a className="footer__nav__list__item__link" href="/team">
              La Team
            </a>
          </li>
          <li className="footer__nav__list__item footer__nav__list__item__bordered">
            <a className="footer__nav__list__item__link" href="/calendrier">
              Calendrier
            </a>
          </li>
          <li className="footer__nav__list__item footer__nav__list__item__bordered">
            <a className="footer__nav__list__item__link" href="/calendrier">
              Recrutement
            </a>
          </li>
        </ul>
        <ul className="footer__nav__list">
          <li className="footer__nav__list__item">
            <a
              className="footer__nav__list__item__link footer__nav__list__item__link__cgu"
              href="/cgu"
            >
              Conditions d'utilisation et politique de confidentialité
            </a>
          </li>
        </ul>
        <ul className="footer__nav__list">
          <li className="footer__nav__list__item">
            <a
              className="footer__nav__list__item__link footer__nav__list__item__link__admin"
              href="/dashboard"
            >
              Espace Admin
            </a>
          </li>
        </ul>
      </div>

      <div className="footer__logo">
        <a href="/">
          <Image
            src={logo}
            height={100}
            alt="Logo VictoryZone"
            priority={true}
          />
        </a>
      </div>
    </footer>
  );
}
