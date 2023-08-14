'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useTeamContext } from '@/app/context/Team';
import {
  AllEditableMembers,
  fetchAdminTeam,
} from '@/app/components_api/TeamAdmin';
import { staatliches } from '@/styles/fonts/fonts';
import './index.scss';

export default function DashboardTeam() {
  const { setTeamList } = useTeamContext();

  useEffect(() => {
    fetchAdminTeam(setTeamList);
  }, [setTeamList]);

  const members = AllEditableMembers();

  return (
      <section className="team">
        <h1 className={`team__title ${staatliches.className}`}>TEAM</h1>
        <div className="new">
        <div className="new__btn">
          <Link href="/dashboard/team/create">
            <button className="new__btn__neon-btn">Ajouter un membre</button>
          </Link>
        </div>
        </div>
        <div>{members}</div>
      </section>
  );
}
