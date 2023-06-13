'use client';

export default function DashboardMenu() {
  const handleSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  };
  return (
    <div className={'dashboard-menu'}>
      {/* <div className={navOpen ? 'header-menu' : 'header-menu hidden'}> */}
      <ul>
        <li>
          <a className="header-link" href="/dashboard" onClick={handleSubmit}>
            Deconnexion
          </a>
        </li>
      </ul>
    </div>
  );
}
