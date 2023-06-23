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
            height={100}
            alt="Logo VictoryZone"
            priority={true}
          />
        </a>
        <div
          className={`burger-menu ${navOpen ? 'active cross' : ''}`}
          onClick={handleToggle}
        >
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </div>
      </div>
      <div className={`header-menu ${navOpen ? '' : 'hidden'} `}>
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
