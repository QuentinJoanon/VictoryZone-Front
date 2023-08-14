'use client';
import jwt_decode from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import './index.scss';

interface DashboardLayout {
  id: number;
  user_name: string;
  permission_level: number;
}

export default function DashboardLayout({
  dashboard,
  login,
}: {
  dashboard: React.ReactNode;
  login: JSX.Element;
}) {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('accessToken')) {
      const token = localStorage.getItem('accessToken')!;
      const decoded: { data: DashboardLayout } = jwt_decode(token);
      console.log(decoded.data.permission_level);
      localStorage.setItem('user_name', decoded.data.user_name);
      setIsAdmin(decoded.data.permission_level === 1);
    }
  }, []);

  if (isAdmin) {
    return dashboard;
  } else {
    return login;
  }
}
