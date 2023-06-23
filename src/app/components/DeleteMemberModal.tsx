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
        className="modal-action"
        onSubmit={(e) => handleDeleteSubmit(e, user_name)}
      >
        <button type="button" className="btn" onClick={closeModal}>
          Fermer
        </button>
        <button type="submit" className="btn">
          Supprimer
        </button>
      </form>
    </div>
  );
}
