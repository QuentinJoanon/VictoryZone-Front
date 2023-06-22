import { TeamData } from '../context/Team';
import Image from 'next/image';
import Link from 'next/link';
import DeleteMemberModal from './DeleteMemberModal';
import { useState } from 'react';
import './CardEditableMember.scss';

export default function CardEditableMember({
  user_name,
  first_name,
  last_name,
  // description,
  role,
  image,
}: // statistics,
// achievements,
// youtube_link,
// twitch_link,
// twitter_link,
// created_at,
// updated_at,
// setup,
TeamData) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleDeleteClick = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };
  return (
    <div className={`card-member ${user_name}`}>
      <Link href={`/team/${user_name}`}>
        <div className="card-member__image">
          <Image className="img" src={image} fill={true} alt={user_name} />
        </div>
        <div className="card-member__details">
          <p className="card-member__username">{user_name}</p>
          <p className="card-member__fullname">
            {first_name} {last_name}
          </p>
          <p className="card-member__role">{role}</p>
        </div>
      </Link>
      <Link href={`dashboard/team/${user_name}`}>
        <button>Modifier</button>
      </Link>
      <button onClick={handleDeleteClick}>Supprimer</button>
      {isModalVisible && (
        <div id="deleteMemberModal">
          <DeleteMemberModal user_name={user_name} closeModal={closeModal} />
        </div>
      )}
    </div>
  );
}
