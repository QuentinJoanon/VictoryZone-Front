'use client';
export default function DashboardLayout({
  dashboard,
  login,
}: {
  dashboard: JSX.Element;
  login: JSX.Element;
}) {
  const isAdmin = localStorage.getItem('isAdmin');
  console.log(isAdmin);
  if (isAdmin === 'true') {
    return dashboard;
  } else {
    return login;
  }
}
