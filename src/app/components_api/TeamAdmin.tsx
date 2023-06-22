import { ArticleData, useArticleContext } from '../context/Article';
import CardEditableArticle from '../components/CardEditableArticle';
import axiosInstance from './axiosInstance';
import { TeamData, useTeamContext } from '../context/Team';
import CardEditableMember from '../components/CardEditableMember';

export function fetchAdminTeam(
  setTeamList: React.Dispatch<React.SetStateAction<TeamData[]>>
) {
  axiosInstance
    .get(`${process.env.NEXT_PUBLIC_API_URL}api/team`)
    .then((response) => {
      setTeamList(response.data.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

export function createNewArticle(newArticle: ArticleData) {
  axiosInstance({
    method: 'post',
    url: `${process.env.NEXT_PUBLIC_API_URL}api/articles`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      'Content-Type': 'application/json',
    },
    data: newArticle,
  })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
}

export function editArticle(article: ArticleData, articleId: number) {
  axiosInstance({
    method: 'patch',
    url: `${process.env.NEXT_PUBLIC_API_URL}api/articles/${articleId}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      'Content-Type': 'application/json',
    },
    data: article,
  })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
}

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
