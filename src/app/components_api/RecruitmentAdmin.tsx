import CardRecruitment from '../components/CardRecruitment';
import {
  RecruitementData,
  useRecruitmentContext,
} from '../context/Recruitment';
import axiosInstance from './axiosInstance';

export function fetchAdminRecruitments(
  setRecruitmentList: React.Dispatch<React.SetStateAction<RecruitementData[]>>
) {
  axiosInstance({
    method: 'get',
    url: `${process.env.NEXT_PUBLIC_API_URL}api/recruitment`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      setRecruitmentList(response.data.data); // Set the fetched recruitments list in the state
    })
    .catch((error) => {
      console.log(error);
    });
}

export function editRecruitment(
  recruitment: RecruitementData,
  id: number
): Promise<number> {
  return axiosInstance({
    method: 'patch',
    url: `${process.env.NEXT_PUBLIC_API_URL}api/recruitment/${id}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      'Content-Type': 'application/json',
    },
    data: recruitment,
  })
    .then((response) => {
      console.log(response);
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

export function AllRecruitments() {
  const { recruitmentList } = useRecruitmentContext();
  const recruitments = recruitmentList.map((recruitment: RecruitementData) => (
    <CardRecruitment
      key={recruitment.id}
      id={recruitment.id}
      email={recruitment.email}
      first_name={recruitment.first_name}
      last_name={recruitment.last_name}
      message={recruitment.message}
      cv={recruitment.cv}
      external_link={recruitment.external_link}
      is_reviewed={recruitment.is_reviewed}
      is_accepted={recruitment.is_accepted}
      reviewer_comment={recruitment.reviewer_comment}
      reviewer_comment_private={recruitment.reviewer_comment_private}
      created_at={recruitment.created_at}
    />
  ));
  return recruitments;
}
