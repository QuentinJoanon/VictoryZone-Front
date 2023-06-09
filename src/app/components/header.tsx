'use client';

export default function Header() {
  return (
    <header>
      <div>
        {/*           <img src="" alt="logo" srcset="" /> */}
        <button>BurgerMenu</button>
      </div>
      <div className="header-menu hidden">
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
