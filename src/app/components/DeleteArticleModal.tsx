'use client';

import { deleteArticle } from '../components_api/ArticlesAdmin';

export default function DeleteArticleModal({
  slug,
  closeModal,
}: {
  slug: string;
  closeModal: () => void;
}) {
  const handleDeleteSubmit = (e: React.FormEvent, slug: string) => {
    e.preventDefault();
    deleteArticle(slug);
    closeModal();
    document.querySelector(`.${slug}`)?.remove();
  };
  return (
    <div className="modal-box">
      <h3>Voulez-vous vraiment supprimer cet article ?</h3>
      <form
        className="modal-box__form"
        onSubmit={(e) => handleDeleteSubmit(e, slug)}
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
