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
        className="modal-box__form"
        onSubmit={(e) => handleDeleteSubmit(e, id)}
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
