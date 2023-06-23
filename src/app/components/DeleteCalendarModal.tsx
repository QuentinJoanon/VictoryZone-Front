'use client';

import { deleteCalendar } from '../components_api/CalendarAdmin';

export default function DeleteCalendarModal({
  id,
  closeModal,
}: {
  id: number;
  closeModal: () => void;
}) {
  const handleDeleteSubmit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    deleteCalendar(id);
    closeModal();
    document.querySelector(`.event-${id}`)?.remove();
  };
  return (
    <div className="modal-box">
      <h3>Voulez-vous vraiment supprimer cet article ?</h3>
      <form
        className="modal-action"
        onSubmit={(e) => handleDeleteSubmit(e, id)}
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
