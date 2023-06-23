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
        className="modal-action"
        onSubmit={(e) => handleDeleteSubmit(e, slug)}
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
