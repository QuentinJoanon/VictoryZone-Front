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
        <a href="/" className="footer__logo">
          <Image
            src={logo}
            width={100}
            height={100}
            alt="Logo VictoryZone"
            priority={true}
          />
        </a>

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

        <div className="footer__additional-link">
          <div className="footer__additional-links">
            <ul className="footer__additional-links-list">
              <li>
                <a href="/dashboard" className="footer__additional-link">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="/cgu" className="footer__additional-link">
                  CGU
                </a>
              </li>
            </ul>
          </div>
          <div className="footer__social">
            <a href="https://www.youtube.com" className="footer__social-link">
              <Image
                src={youtube}
                width={20}
                height={20}
                alt="Logo Youtube"
                priority={true}
              />
            </a>
            <a href="https://www.youtube.com" className="footer__social-link">
              <Image
                src={twitch}
                width={20}
                height={20}
                alt="Logo Twitch"
                priority={true}
              />
              <a href="https://www.youtube.com" className="footer__social-link">
                <Image
                  src={twitter}
                  width={20}
                  height={20}
                  alt="Logo Twitter"
                  priority={true}
                />
              </a>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
