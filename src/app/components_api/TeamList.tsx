import axios from 'axios';
import React from 'react';
import CardMember from '../components/CardMember';
import { TeamData, useTeamContext } from '../context/Team';

// Fetches the team data
export function fetchTeam(
  setTeamList: React.Dispatch<React.SetStateAction<TeamData[]>>
) {
  axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}api/team`)
    .then((response) => {
      setTeamList(response.data.data);
      console.log(response.data.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

// Fetches the team data for the home page
export function fetchTeamHome(
  setTeamList: React.Dispatch<React.SetStateAction<TeamData[]>>
) {
  axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}api/team?home=true`)
    .then((response) => {
      setTeamList(response.data.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

// Renders all team members
export function AllMembersTeam() {
  const { teamList } = useTeamContext();
  const teamMembers = teamList.map((team: TeamData) => (
    <CardMember
      key={team.id}
      user_name={team.user_name}
      first_name={team.first_name}
      last_name={team.last_name}
      description={team.description}
      role={team.role}
      image={team.image}
      statistics={team.statistics}
      achievements={team.achievements}
      youtube_link={team.youtube_link}
      twitch_link={team.twitch_link}
      twitter_link={team.twitter_link}
      created_at={team.created_at}
      updated_at={team.updated_at}
    />
  ));
  return teamMembers;
}
