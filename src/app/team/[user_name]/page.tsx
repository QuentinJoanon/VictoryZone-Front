'use client';

import { TeamData } from '@/app/context/Team';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import './index.scss';

interface setupData {
  id: number;
  name: string;
  external_link: string;
  created_at?: string;
  updated_at?: string;
}

export default function TeamMember({
  params,
}: {
  params: { user_name: string };
}) {
  const [teamMember, setTeamMember] = useState<TeamData | any>({});

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}api/team/${params.user_name}`)
      .then((response) => {
        setTeamMember(response.data.data);
        // console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setTeamMember, params.user_name]);

  const setupList = Array.isArray(teamMember.setup)
    ? teamMember.setup.map((setupMember: setupData) => {
        return (
          <div className="setup" key={setupMember.id}>
            <Link
              href={setupMember.external_link}
              className="setup__external_link"
            >
              {setupMember.name}
            </Link>
          </div>
        );
      })
    : [];
  // console.log(setupList);

  return (
    <div className="member">
      <div className="member__image">
        <Image
          className="img"
          src={teamMember.image}
          fill={true}
          alt={teamMember.user_name}
        />
      </div>
      <div className="member__infos">
        <p className="member__infos__username">{teamMember.user_name}</p>
        <p className="member__infos__name">
          {teamMember.first_name} {teamMember.last_name}
        </p>
        <p className="member__infos__role">{teamMember.role}</p>
      </div>
      <h2>VIDEOS RECENTES</h2>
      <div className="member__videos">{teamMember.media_video}</div>
      <h2>STATS</h2>
      <div className="member__stats">{teamMember.statistics}</div>
      <h2>PALMARES</h2>
      <div className="member__achievements">{teamMember.achievements}</div>
      <h2>SETUP</h2>
      <div className="member__setup">{setupList}</div>
    </div>

    // <div>
    //   <div className="user_name">{teamMember.user_name}</div>
    //   <div className="first_name">
    //     {teamMember.first_name} {teamMember.last_name}
    //   </div>
    //   {setupList}
    //   <div className="img">
    //     <Image
    //       className="img"
    //       src={teamMember.image}
    //       fill={true}
    //       alt={teamMember.user_name}
    //     />
    //   </div>
    //   <div className="description">{teamMember.description}</div>
    //   <div className="media_video"></div>
    //   <div className="stats">{teamMember.statistics}</div>
    //   <div className="palmares">{teamMember.achievements}</div>
    // </div>
  );
}
