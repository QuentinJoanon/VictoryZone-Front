'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useTeamContext } from '@/app/context/Team';
import {
  AllEditableMembers,
  fetchAdminTeam,
} from '@/app/components_api/TeamAdmin';

export default function DashboardTeam() {
  const { setTeamList } = useTeamContext();

  useEffect(() => {
    fetchAdminTeam(setTeamList);
  }, [setTeamList]);

  const members = AllEditableMembers();

  return (
    <main>
      <h1>Team</h1>
      <Link href="/dashboard/team/create">
        <button>Ajouter un membre</button>
      </Link>

      <div>{members}</div>
    </main>
  );
}
