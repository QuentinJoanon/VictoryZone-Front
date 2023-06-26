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
      <h1>SETUP</h1>
      <div className="member__setup">{setupList}</div>
    </div>
  );
}
{
  /* <div>
              {' '}
              <Link
                href={youtube_link}
                className="footer__social-link"
                target="_blank"
              >
                <Image
                  src={youtube}
                  width={20}
                  height={20}
                  alt="Logo Youtube"
                />
              </Link>
              <Link
                href={twitch_link}
                className="footer__social-link"
                target="_blank"
              >
                <Image src={twitch} width={20} height={20} alt="Logo Twitch" />
              </Link>
              <Link
                href={twitter_link}
                className="footer__social-link"
                target="_blank"
              >
                <Image
                  src={twitter}
                  width={20}
                  height={20}
                  alt="Logo Twitter"
                />
              </Link>
            </div> */
}
