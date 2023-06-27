'use client';

import { TeamData } from '@/app/context/Team';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import './index.scss';
import twitch from '../../../../public/twitch.svg';
import youtube from '../../../../public/youtube.svg';
import twitter from '../../../../public/twitter.svg';

interface setupData {
  id: number;
  name: string;
  external_link: string;
  created_at?: string;
  updated_at?: string;
}

interface videoData {
  id: number;
  link:string;
  is_active: boolean;
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
              className="setup__external_link" target="_blank"
            >
              {setupMember.name}
            </Link>
          </div>
        );
      })
    : [];
    const videos = teamMember.media_video && Array.isArray(teamMember.media_video)
  ? teamMember.media_video.map((video: videoData) => (
      <iframe
        className="member__videos__video"
        key={video.id}
        src={video.link}
        style={{ border: 0 }}
        title="Youtube video"
      ></iframe>
    ))
  : null;


  return (
    <div className="member">
      <h1 className="member__first_container__title">{teamMember.user_name}</h1>
      <div className="first__section">
        <div className="member__image">
          <Image
            className="img"
            src={teamMember.image}
            fill={true}
            alt={teamMember.user_name}
          />
        </div>
        <div className="member__infos">
          <p className="member__infos__name">
            {teamMember.first_name} {teamMember.last_name}
          </p>
          <p className="member__infos__role">rôle: {teamMember.role}</p>
          <p className="member__infos__description">{teamMember.description}</p>
        </div>
      </div>

      <div className="member__section">
        <h1 className="title">VIDEOS RECENTES</h1>
        <div className="member__videos">{videos}</div>
      </div>

      <div className="member__section">
        <h1 className="title">STATS</h1>
        <div className="member__stats member__container">{teamMember.statistics}</div>
      </div>

      <div className="member__section">
        <h1 className="title">PALMARES</h1>
        <div className="member__palmares member__container">{teamMember.achievements}</div>
        
      </div>

      <div className="member__section">
        <h1 className="title">SETUP</h1>
        <div className="member__setup member__container">{setupList}</div>
      </div>

      <div className="member__section">
        <h1 className="title">SOCIAL MEDIA</h1>
        <div className="member__social">
            <a href={teamMember.youtube_link} className="member__social-link" target="_blank">
              <Image src={youtube} width={20} height={20} alt="Logo Youtube" />
            </a>
            <a href={teamMember.twitch_link} className="member__social-link" target="_blank">
              <Image src={twitch} width={20} height={20} alt="Logo Twitch" />
            </a>
            <a href={teamMember.twitter_link} className="member__social-link" target="_blank">
              <Image src={twitter} width={20} height={20} alt="Logo Twitter" />
            </a>
        </div>
      </div>

    </div>
  );
}
