'use client';

import { useState } from 'react';

export default function Header() {
  const [navOpen, setNavOpen] = useState(false);
  const handleToggle = () => setNavOpen(!navOpen);

  return (
    <header>
      <div>
        {/*           <img src="" alt="logo" srcset="" /> */}
        <div
          className={navOpen ? 'burger-menu__cross' : 'burger-menu__line'}
          onClick={handleToggle}
        >
          {' '}
          {/* toggle class for switch icon burger to cross */}
          BurgerMenu
        </div>
      </div>
      <div className={navOpen ? 'header-menu' : 'header-menu hidden'}>
        {' '}
        {/* toggle class for hide menu */}
        <ul>
          <li>Team</li>
          <li>Articles</li>
          <li>Calendrier</li>
          <li>Recrutement</li>
        </ul>
      </div>
    </header>
  );
}
