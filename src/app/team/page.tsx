'use client';
import './index.scss';

import { useEffect, useState } from 'react';
import { AllMembersTeam, fetchTeam } from '../components_api/TeamList';
import { useTeamContext } from '../context/Team';
import { fetchMedias } from '../components_api/MediaList';

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
        <h1>TEAM</h1>
        {membersTeam}
      </div>
      <h2>Nos dernières vidéos</h2>
      <div className="videos-container">{videos}</div>
    </>
  );
}
