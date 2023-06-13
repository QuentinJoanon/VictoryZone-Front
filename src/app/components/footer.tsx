'use client';
import logo from '../../assets/logo.png';
import Image from 'next/image';
import twitch from '../../../public/twitch.svg';
import youtube from '../../../public/youtube.svg';
import twitter from '../../../public/twitter.svg';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__image">
          <a href="/">
            <Image
              className="footer__logo"
              src={logo}
              // width={50}
              // height={50}
              alt="Logo VictoryZone"
              priority={true}
            />
          </a>
        </div>

        <div className="footer__links">
          <ul className="footer__links-list">
            <li>
              <a href="/team" className="footer__link">
                Team
              </a>
            </li>
            <li>
              <a href="/articles" className="footer__link">
                Articles
              </a>
            </li>
            <li>
              <a href="/calendrier" className="footer__link">
                Calendrier
              </a>
            </li>
            <li>
              <a href="/recrutement" className="footer__link">
                Recrutement
              </a>
            </li>
          </ul>
        </div>

        <div className="footer__separator"></div>

        <div className="footer__additional-links">
          <ul className="footer__additional-links-list">
            <li>
              <a href="/dashboard" className="footer__link">
                Dashboard
              </a>
            </li>
            <li>
              <a href="/cgu" className="footer__link">
                CGU
              </a>
            </li>
          </ul>
          <div className="footer__social">
            <a href="https://www.youtube.com" className="footer__social-link">
              <Image src={youtube} width={20} height={20} alt="Logo Youtube" />
            </a>
            <a href="https://www.twitch.tv" className="footer__social-link">
              <Image src={twitch} width={20} height={20} alt="Logo Twitch" />
            </a>
            <a href="https://www.twitter.com" className="footer__social-link">
              <Image src={twitter} width={20} height={20} alt="Logo Twitter" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
