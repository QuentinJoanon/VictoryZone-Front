'use client';

import { useEffect, useState } from 'react';
import { editRecruitment } from '../components_api/RecruitmentAdmin';
import { RecruitementData } from '../context/Recruitment';

export default function EditRecruitmentModal({
  id,
  is_reviewed,
  reviewer_comment,
  reviewer_comment_private,
  is_accepted,
  closeModal,
}: {
  id: number;
  is_reviewed: boolean;
  reviewer_comment: string;
  reviewer_comment_private: string;
  is_accepted: boolean;
  closeModal: () => void;
}) {
  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
  const [recruitment, setRecruitment] = useState<RecruitementData | any>({});
  const [message, setMessage] = useState('');

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const statusCode = await editRecruitment(recruitment, id);
      if (statusCode === 200) {
        setMessage('Candidature mise à jour avec succès.');
      } else {
        setMessage('Erreur ' + statusCode);
      }
      await sleep(2000);
      closeModal();
    } catch (error) {
      setMessage('Erreur');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setRecruitment({
      ...recruitment,
      [name]: value,
    });
  };

  return (
    <div className="modal-box">
      <h3>Mettre à jour la candidature</h3>
      {message && <p>{message}</p>}
      <form className="modal-action" onSubmit={handleEditSubmit}>
        <label
          className="modify-recruitment__form__label"
          htmlFor="reviewer_comment"
        >
          Commentaire
        </label>
        <textarea
          className="modify-recruitment__form__input"
          name="reviewer_comment"
          id="reviewer_comment"
          onChange={handleChange}
          value={recruitment.reviewer_comment}
          required
        />
        <label
          className="modify-recruitment__form__label"
          htmlFor="reviewer_comment_private"
        >
          Commentaire privé
        </label>
        <textarea
          className="modify-recruitment__form__input"
          name="reviewer_comment_private"
          id="reviewer_comment_private"
          onChange={handleChange}
          value={recruitment.reviewer_comment_private}
        />
        <label
          className="modify-recruitment__form__label"
          htmlFor="is_accepted"
        >
          Statut de la candidature
        </label>
        <select
          className="modify-recruitment__form__input"
          name="is_accepted"
          id="is_accepted"
          onChange={handleChange}
          value={recruitment.is_accepted}
          required
        >
          <option value="">Choisissez une option</option>
          <option value="true">Acceptée</option>
          <option value="false">Refusée</option>
        </select>
        <button type="button" className="btn" onClick={closeModal}>
          Fermer
        </button>
        <button type="submit" className="btn-edit">
          Envoyer
        </button>
      </form>
    </div>
  );
}
