'use client';

import { deleteMember } from '../components_api/TeamAdmin';
import { useRouter } from 'next/navigation';

export default function DeleteMemberModal({
  user_name,
  closeModal,
}: {
  user_name: string;
  closeModal: () => void;
}) {
  const router = useRouter();
  const handleDeleteSubmit = (e: React.FormEvent, user_name: string) => {
    e.preventDefault();
    deleteMember(user_name);
    closeModal();
    document.querySelector(`.${user_name}`)?.remove();
  };
  return (
    <div className="modal-box">
      <h3>Voulez-vous vraiment supprimer ce membre ?</h3>
      <form
        className="modal-box__form"
        onSubmit={(e) => handleDeleteSubmit(e, user_name)}
      >
        <div className='dashboard-btn'>
          <button
            type="button"
            className="dashboard-btn__button"
            onClick={closeModal}
          >
            Fermer
          </button>
          <button type="submit" className="dashboard-btn__button delete">
            Supprimer
          </button>
        </div>
      </form>
    </div>
  );
}
