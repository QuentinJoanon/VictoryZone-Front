'use client';

import { useEffect } from 'react';
import './index.scss';
import { useRecruitmentContext } from '@/app/context/Recruitment';
import {
  AllRecruitments,
  fetchAdminRecruitments,
} from '@/app/components_api/RecruitmentAdmin';

export default function DashboardRecruitment() {
  const { recruitmentList, setRecruitmentList } = useRecruitmentContext();

  useEffect(() => {
    fetchAdminRecruitments(setRecruitmentList);
  }, [setRecruitmentList]);

  const recruitments = AllRecruitments();

  return (
    <main>
      <h1>Recrutement</h1>
      <div className="recruitment__dashboard">{recruitments}</div>
    </main>
  );
}
