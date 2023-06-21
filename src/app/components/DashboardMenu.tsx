'use client';

import Link from 'next/link';
import './dashboardMenu.scss';


/**
 * Renders the dashboard menu component.
 *
 * @return {JSX.Element} The dashboard menu component.
 */
export default function DashboardMenu() {
  const handleSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  };
  return (
    <div className={'dashboard-menu'}>
      {/* <div className={navOpen ? 'header-menu' : 'header-menu hidden'}> */}
      <ul>
        <li>
          <a className="header-link" href="/dashboard/articles">
            Modifier les articles
          </a>
        </li>
        <li>
          <a className="header-link" href="/dashboard" onClick={handleSubmit}>
            Deconnexion
          </a>
        </li>
      </ul>
    </div>
  );
}
