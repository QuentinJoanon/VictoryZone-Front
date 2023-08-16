'use client';
import './index.scss';

import { useEffect, useState } from 'react';
import { AllMembersTeam, fetchTeam } from '../components_api/TeamList';
import { useTeamContext } from '../context/Team';
import { fetchMedias } from '../components_api/MediaList';
import { khand, staatliches, ysabeau } from '@/styles/fonts/fonts';

export default function Team() {
  const { setTeamList } = useTeamContext();
  const [mediaList, setMediaList] = useState([]);

  useEffect(() => {
    fetchTeam(setTeamList);
    fetchMedias(setMediaList);
  }, [setTeamList, setMediaList]);

  const membersTeam = AllMembersTeam();
  const activeMediaList = mediaList.filter(
    (media: any) => media.is_active === true
  );
  const videos = activeMediaList.map((video: any) => (
    <iframe
      className="video"
      key={video.id}
      src={video.link}
      style={{ border: 0 }}
      title="Youtube video"
    ></iframe>
  ));

  return (
    <>
      <div className="team">
        <h1 className={`team__title ${staatliches.className}`}>La Team</h1>
        <h2 className={`team__sub-title ${ysabeau.className}`}>Warzone</h2>
        {membersTeam}
      </div>
      <h2 className={`team__sub-title ${ysabeau.className}`}>
        Nos dernières vidéos
      </h2>
      <div className="videos-container">{videos}</div>
    </>
  );
}
