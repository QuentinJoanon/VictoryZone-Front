'use client';
import logo from '../../assets/logo.png';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className='footer'>
      <div className='footer__container' >
      <a href="/" className='footer__logo'>
        <Image
          src={logo}
          width={100}
          height={100}
          alt="Logo VictoryZone"
          priority={true}
        />
      </a>

      <div className='footer__links'>
        <ul className='footer__links-list'>
          <li>
            <a href="/team" className='footer__link'>Team</a>
          </li>
          <li>
            <a href="/articles" className='footer__link'>Articles</a>
          </li>
          <li>
            <a href="/calendrier" className='footer__link'>Calendrier</a>
          </li>
          <li>
            <a href="/recrutement" className='footer__link'>Recrutement</a>
          </li>
        </ul>
      </div>

      <div className='footer__separator'></div>
      
      <div className="footer__additional-link">
      <div className='footer__additional-links'>
        <ul className='footer__additional-links-list'>
          <li>
            <a href="/dashboard" className='footer__additional-link'>Dashboard</a>
          </li>
          <li>
            <a href="/cgu" className='footer__additional-link'>CGU</a>
          </li>
        </ul>
      </div>
      <div className='footer__social'>
        <a href='https://www.youtube.com' className='footer__social-link'>
          <img src='youtube logo' alt='Youtube' className='footer__social-icon' />
        </a>
        <a href='https://www.twitter.com' className='footer__social-link'>
          <img src='twitter logo' alt='Twitter' className='footer__social-icon' />
        </a>
        <a href='https://www.twitch.tv' className='footer__social-link'>
          <img src='twitch logo' alt='Twitch' className='footer__social-icon' />
        </a>
      </div>
      </div>  
    </div>
    </footer>
  );
}