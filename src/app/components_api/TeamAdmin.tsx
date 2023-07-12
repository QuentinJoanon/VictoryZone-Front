import axiosInstance from './axiosInstance';
import { TeamData, useTeamContext } from '../context/Team';
import CardEditableMember from '../components/CardEditableMember';

// Fetches the team data for admin purposes
export function fetchAdminTeam(
  setTeamList: React.Dispatch<React.SetStateAction<TeamData[]>>
) {
  axiosInstance({
    method: 'get',
    url: `${process.env.NEXT_PUBLIC_API_URL}api/team`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      setTeamList(response.data.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

// Creates a new team member
export function createNewMember(form: FormData): Promise<number> {
  return axiosInstance({
    method: 'post',
    url: `${process.env.NEXT_PUBLIC_API_URL}api/team`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      'Content-Type': 'multipart/form-data',
    },
    data: form,
  })
    .then((response) => {
      if (response.status === 201) {
        return response.status;
      } else {
        throw new Error(
          "Une erreur s'est produite lors de l'envoi du formulaire."
        );
      }
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
}

// Edits an existing team member
export function editMember(form: FormData, id: number): Promise<number> {
  return axiosInstance({
    method: 'patch',
    url: `${process.env.NEXT_PUBLIC_API_URL}api/team/${id}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      'Content-Type': 'multipart/form-data',
    },
    data: form,
  })
    .then((response) => {
      if (response.status === 200) {
        return response.status;
      } else {
        throw new Error(
          "Une erreur s'est produite lors de l'envoi du formulaire."
        );
      }
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
}

// Deletes a team member
export function deleteMember(user_name: string) {
  axiosInstance({
    method: 'delete',
    url: `${process.env.NEXT_PUBLIC_API_URL}api/team/${user_name}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
}

// Renders all team members with edit functionality
export function AllEditableMembers() {
  const { teamList } = useTeamContext();
  const members = teamList.map((team: TeamData) => (
    <CardEditableMember
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
  return members;
}
