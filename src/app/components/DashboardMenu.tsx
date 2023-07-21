'use client';

import Link from 'next/link';
import './dashboardMenu.scss';

export default function DashboardMenu() {
  const handleSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  };
  return (
    <nav className={'dashboard-menu'}>
      <ul>
        <li>
          <Link className="header-link" href="/dashboard/articles">
            Modifier les articles
          </Link>
        </li>
        <li>
          <Link className="header-link" href="/dashboard/team">
            Modifier la team
          </Link>
        </li>
        <li>
          <Link className="header-link" href="/dashboard/calendar">
            Modifier le calendrier
          </Link>
        </li>
        <li>
          <Link className="header-link" href="/dashboard/recrutement">
            Acceder aux candidatures
          </Link>
        </li>
        <li>
          <a className="header-link" href="/dashboard" onClick={handleSubmit}>
            Deconnexion
          </a>
        </li>
      </ul>
    </nav>
  );
}
