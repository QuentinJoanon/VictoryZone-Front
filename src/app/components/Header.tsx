'use client';

import { useEffect, useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // * Pour version desktop :
  useEffect(() => {
    const handleResize = () => {
      const isDesktop = window.innerWidth >= 1200; //                 -- On verifie que la largeur de la fenetre est égale ou supérieure au breakpoint
      setIsDesktop(isDesktop);
      if (isDesktop) {
        //                                                            -- On ferme le menu burger si on passe en version desktop
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize); //               -- On écoute les changements de la taille de la fenetre
    handleResize(); //                                                -- On verifie la taille de la fenetre lors du chargement initial de la page
    return () => {
      //                                                              -- Nettoyage de l'ecouteur d'evenement lors du démontage du composant
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleBurgerMenuClick = () => {
    //                                                                -- Fonction executée lors du clic sur le menu burger
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      <div className="neon"></div>
      <div className="header">
        <div className="header__empty"></div>

        <a className="header__title custom-font" href="/">
          VictoryZone
        </a>

        {isDesktop ? (
          <nav className="desktop-nav">
            <ul className="desktop-nav__nav-list">
              <li className="desktop-nav__list-item">
                <a className="desktop-nav__list-item__link" href="/">
                  Accueil
                </a>
              </li>
              <li className="desktop-nav__list-item">
                <a className="desktop-nav__list-item__link" href="/articles">
                  Articles
                </a>
              </li>
              <li className="desktop-nav__list-item">
                <a className="desktop-nav__list-item__link" href="/team">
                  Team
                </a>
              </li>
              <li className="desktop-nav__list-item">
                <a className="desktop-nav__list-item__link" href="/calendrier">
                  Calendrier
                </a>
              </li>
              <li className="desktop-nav__list-item">
                <a className="desktop-nav__list-item__link" href="/recrutement">
                  Recrutement
                </a>
              </li>
            </ul>
          </nav>
        ) : (
          <div
            className={
              isMenuOpen
                ? 'header__burger-menu header__burger-menu--open'
                : 'header__burger-menu'
            }
            onClick={handleBurgerMenuClick}
          >
            <span className="header__burger-menu-line"></span>
            <span className="header__burger-menu-line"></span>
            <span className="header__burger-menu-line"></span>
          </div>
        )}
      </div>

      {isMenuOpen && (
        <div className="modal">
          <ul className="modal__navigation-list">
            <li className="modal__navigation-list__item">
              <a className="modal__navigation-list__item__link" href="/">
                Accueil
              </a>
            </li>
            <li className="modal__navigation-list__item">
              <a
                className="modal__navigation-list__item__link"
                href="/articles"
              >
                Articles
              </a>
            </li>
            <li className="modal__navigation-list__item">
              <a className="modal__navigation-list__item__link" href="/team">
                Team
              </a>
            </li>
            <li className="modal__navigation-list__item">
              <a
                className="modal__navigation-list__item__link"
                href="/calendrier"
              >
                Calendrier
              </a>
            </li>
            <li className="modal__navigation-list__item">
              <a
                className="modal__navigation-list__item__link"
                href="/recrutement"
              >
                Recrutement
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
