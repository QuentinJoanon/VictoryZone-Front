'use client';

import { useState } from 'react';
import Image from 'next/image';
import logo from '../../assets/logo.png';

export default function Header() {
  const [navOpen, setNavOpen] = useState(false);
  const handleToggle = () => setNavOpen(!navOpen);

  return (
    <header>
      <div>
        <a href="/">
          <Image
            src={logo}
            width={200}
            height={200}
            alt="Logo VictoryZone"
            priority={true}
          />
        </a>
        <div
          className={navOpen ? 'burger-menu__cross' : 'burger-menu__line'}
          onClick={handleToggle}
        >
          {/* toggle class for switch icon burger to cross */}
          BurgerMenu
        </div>
      </div>
      <div className={navOpen ? 'header-menu' : 'header-menu hidden'}>
        {/* toggle class for hide menu */}
        <ul>
          <li>
            <a href="/">Accueil</a>
          </li>
          <li>
            <a href="/team">Team</a>
          </li>
          <li>
            <a href="/articles">Articles</a>
          </li>
          <li>
            <a href="/calendrier">Calendrier</a>
          </li>
          <li>
            <a href="/recrutement">Recrutement</a>
          </li>
        </ul>
      </div>
    </header>
  );
}
