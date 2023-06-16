'use client';

import { useState } from 'react';
import Image from 'next/image';
import logo from '../../assets/logo.webp';

export default function Header() {
  const [navOpen, setNavOpen] = useState(false);
  const handleToggle = () => setNavOpen(!navOpen);

  return (
    <header>
      <div className="header-container">
        <a href="/">
          <Image
            src={logo}
            // width={100}
            height={100}
            alt="Logo VictoryZone"
            priority={true}
          />
        </a>
        <div
          className={`burger-menu ${navOpen ? 'active cross' : ''}`}
          onClick={handleToggle}
          //className={navOpen ? 'burger-menu__cross' : 'burger-menu__line'}
          //onClick={handleToggle}
        >
          {/* toggle class for switch icon burger to cross */}
          {/* BurgerMenu */}
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </div>
      </div>
      <div className={`header-menu ${navOpen ? '' : 'hidden'} `}>
        {/* <div className={navOpen ? 'header-menu' : 'header-menu hidden'}> */}
        {/* toggle class for hide menu */}
        <ul>
          <li>
            <a className="header-link" href="/">
              Accueil
            </a>
          </li>
          <li>
            <a className="header-link" href="/team">
              Team
            </a>
          </li>
          <li>
            <a className="header-link" href="/articles">
              Articles
            </a>
          </li>
          <li>
            <a className="header-link" href="/calendrier">
              Calendrier
            </a>
          </li>
          <li>
            <a className="header-link" href="/recrutement">
              Recrutement
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
