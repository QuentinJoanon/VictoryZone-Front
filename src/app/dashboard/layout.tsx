'use client';
export default function DashboardLayout({
  dashboard,
  login,
}: {
  dashboard: JSX.Element;
  login: JSX.Element;
}) {
  const isAdmin =
    typeof window !== 'undefined' && localStorage.getItem('isAdmin');
  if (isAdmin === 'true') {
    return dashboard;
  } else {
    return login;
  }
}
