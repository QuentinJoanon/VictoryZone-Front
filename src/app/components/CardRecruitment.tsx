import TimeFormatter from './timeFormatter';
import { RecruitementData } from '../context/Recruitment';
import './CardRecruitment.scss';
import { useState } from 'react';
import EditRecruitmentModal from './EditRecruitmentModal';
import Link from 'next/link';

export default function CardRecruitment({
  id,
  email,
  first_name,
  last_name,
  message,
  cv,
  external_link,
  is_reviewed,
  is_accepted,
  reviewer_comment,
  reviewer_comment_private,
  created_at,
}: RecruitementData | any) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleEditClick = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="recruitment">
      <div>
        <p>Nom : {last_name}</p>
        <p>Prénom : {first_name}</p>
        <p>Email : {email}</p>
        <Link href={external_link}>Lien Youtube/Twitch/Portfolio</Link>
        <a href={cv}>
          <p>CV</p>
        </a>
      </div>
      <div>
        <p>Message : {message}</p>
        <p>Candidature envoyée le : </p>
        <p>{<TimeFormatter time={created_at} />}</p>
      </div>
      <div>
        <p className={is_reviewed ? 'hidden' : ''}>Nouvelle candidature</p>
        <p>Commentaire du reviewer : {reviewer_comment}</p>
        <p>Commentaire privé du reviewer : {reviewer_comment_private}</p>
        <button className="button-edit" onClick={handleEditClick}>
          Modifier
        </button>
        {isModalVisible && (
          <div id="editRecruitmentModal">
            <EditRecruitmentModal
              id={id}
              is_reviewed={is_reviewed}
              reviewer_comment={reviewer_comment}
              reviewer_comment_private={reviewer_comment_private}
              is_accepted={is_accepted}
              closeModal={closeModal}
            />
          </div>
        )}
        <p>Statut de la candidature : {is_accepted}</p>
      </div>
    </div>
  );
}
