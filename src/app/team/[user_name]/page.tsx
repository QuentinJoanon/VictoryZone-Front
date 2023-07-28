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
import { khand, staatliches, ysabeau } from '@/styles/fonts/fonts';

interface setupData {
  id: number;
  name: string;
  external_link: string;
  created_at?: string;
  updated_at?: string;
}

interface videoData {
  id: number;
  link: string;
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
              className="setup__external_link"
              target="_blank"
            >
              {setupMember.name}
            </Link>
          </div>
        );
      })
    : [];
  const videos =
    teamMember.media_video && Array.isArray(teamMember.media_video)
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
      <h1 className={`member__title ${staatliches.className}`}>
        {teamMember.user_name}
      </h1>
      <h2 className={`member__sub-title ${ysabeau.className}`}>WarZone</h2>
      <div className="member__info">
        <div className="member__info__image">
          <Image
            className="member__info__image__img"
            src={teamMember.image}
            fill={true}
            alt={teamMember.user_name}
          />
        </div>
        <div className="member__info__description-container">
          <h3
            className={`member__info__description-container__fullname ${khand.className}`}
          >
            {teamMember.first_name} {teamMember.last_name}
          </h3>
          <p
            className={`member__info__description-container__role ${khand.className}`}
          >
            {teamMember.role}
          </p>
          <p
            className={`member__info__description-container__description ${khand.className}`}
          >
            {teamMember.description}
          </p>
        </div>
      </div>
      <div className="member__social-media">
        <a
          href={teamMember.youtube_link}
          className="member__social-link"
          target="_blank"
        >
          <Image src={youtube} width={40} height={40} alt="Logo Youtube" />
        </a>
        <a
          href={teamMember.twitch_link}
          className="member__social-link"
          target="_blank"
        >
          <Image src={twitch} width={40} height={40} alt="Logo Twitch" />
        </a>
        <a
          href={teamMember.twitter_link}
          className="member__social-link"
          target="_blank"
        >
          <Image src={twitter} width={40} height={40} alt="Logo Twitter" />
        </a>
      </div>
      <h2 className={`member__sub-title ${ysabeau.className}`}>
        Vidéo récentes
      </h2>
      <div className="member__video-container">{videos}</div>
      <h2 className={`member__sub-title ${ysabeau.className}`}>Stats</h2>
      <div className={`member__stats-container ${khand.className}`}>
        {teamMember.statistics}
      </div>
      <h2 className={`member__sub-title ${ysabeau.className}`}>Palmarés</h2>
      <div className={`member__palmares-container ${khand.className}`}>
        {teamMember.achievements}
      </div>
      <h2 className={`member__sub-title ${ysabeau.className}`}>Setup</h2>
      <div className={`member__setup-container ${khand.className}`}>
        {setupList}
      </div>
    </div>
  );
}
