'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useTeamContext } from '@/app/context/Team';
import {
  AllEditableMembers,
  fetchAdminTeam,
} from '@/app/components_api/TeamAdmin';
import './index.scss';

export default function DashboardTeam() {
  const { setTeamList } = useTeamContext();

  useEffect(() => {
    fetchAdminTeam(setTeamList);
  }, [setTeamList]);

  const members = AllEditableMembers();

  return (
    <>
      <div className="team">
        <h1>TEAM</h1>
        <div className="new-member">
          <Link href="/dashboard/team/create">
            <button className="button">Ajouter un membre</button>
          </Link>
        </div>

        <div>{members}</div>
      </div>
    </>
  );
}
