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
  role,
  image,
}: TeamData) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleDeleteClick = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };
  return (
    <div className={user_name}>
      <div className={`card-container`}>
        <Link href={`/team/${user_name}`}>
          <div className="card-member">
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
          </div>
        </Link>
      </div>
      <Link href={`dashboard/team/${user_name}`}>
        <button className="button-edit">Modifier</button>
      </Link>
      <button className="button-delete" onClick={handleDeleteClick}>
        Supprimer
      </button>
      {isModalVisible && (
        <div id="deleteMemberModal">
          <DeleteMemberModal user_name={user_name} closeModal={closeModal} />
        </div>
      )}
    </div>
  );
}
