'use client';
import './index.scss';

import { useEffect } from 'react';
import { AllMembersTeam, fetchTeam } from '../components_api/TeamList';
import { useTeamContext } from '../context/Team';

export default function Team() {
  const { setTeamList } = useTeamContext();

  useEffect(() => {
    fetchTeam(setTeamList);
  }, [setTeamList]);

  const membersTeam = AllMembersTeam();
  return (
    <main>
      <h1>TEAM</h1>
      <div>{membersTeam}</div>
    </main>
  );
}
