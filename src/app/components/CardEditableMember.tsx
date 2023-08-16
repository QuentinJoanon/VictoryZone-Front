import { TeamData } from '../context/Team';
import Image from 'next/image';
import Link from 'next/link';
import DeleteMemberModal from './DeleteMemberModal';
import { useState } from 'react';
import { khand, staatliches } from '@/styles/fonts/fonts';

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
    <div className={`card-member ${user_name}`}>
      <div className="card-container">
        <Link href={`/team/${user_name}`}>
          <div className="card-container__member">
            <div className="card-container__member__image-container">
              <Image
                className="card-container__member__image-container__img"
                src={image}
                fill={true}
                alt={user_name}
              />
            </div>
            <div className="card-container__member__details">
              <p
                className={`card-container__member__details__username ${staatliches.className}`}
              >
                {user_name}
              </p>
              <p
                className={`card-container__member__details__fullname ${khand.className}`}
              >
                {first_name} {last_name}
              </p>
              <p
                className={`card-container__member__details__role ${khand.className}`}
              >
                {role}
              </p>
            </div>
          </div>
        </Link>
      </div>
      <div className='dashboard-btn'>
      <Link href={`dashboard/team/${user_name}`}>
      <button className="dashboard-btn__button edit">Modifier</button>
      </Link>
      <button className="dashboard-btn__button delete" onClick={handleDeleteClick}>
        Supprimer
      </button>
      </div>
      {isModalVisible && (
        <div id="deleteMemberModal">
          <DeleteMemberModal user_name={user_name} closeModal={closeModal} />
        </div>
      )}
    </div>
  );
}
