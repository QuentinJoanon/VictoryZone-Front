'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createNewEvent } from '@/app/components_api/CalendarAdmin';
import '../[id]/index.scss';
import Image from 'next/image';
import { khand, staatliches } from '@/styles/fonts/fonts';

export default function NewEvent() {
  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
  const router = useRouter();
  const [formData, setFormData] = useState({
    event_name: '',
    event_date: '',
    adversary_name: '',
    adversary_name_short: '',
    image: null as File | null,
    live_link: '',
    replay_link: '',
    score: '',
  });

  const [fileName, setFileName] = useState('');
  const [message, setMessage] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let {
      event_name,
      event_date,
      adversary_name,
      adversary_name_short,
      image,
      live_link,
      replay_link,
      score,
    } = formData;

    const form = new FormData();
    form.append('event_name', event_name);
    form.append('event_date', event_date);
    form.append('adversary_name', adversary_name);
    form.append('adversary_name_short', adversary_name_short);
    form.append('image', image as File);
    form.append('live_link', live_link);
    form.append('replay_link', replay_link);
    form.append('score', score);
    try {
      const statusCode = await createNewEvent(form);
      if (statusCode === 201) {
        setMessage('Article créé avec succès.');
      } else {
        setMessage('Erreur ' + statusCode);
      }
      await sleep(2000);
      router.push('/dashboard/calendar');
    } catch (error) {
      setMessage('Erreur');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({
        ...formData,
        image: files && files.length > 0 ? files[0] : null,
      });
      setFileName(files && files.length > 0 ? files[0].name : '');
      setImagePreview(
        files && files.length > 0 ? URL.createObjectURL(files[0]) : ''
      );
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  return (
    <section className="modify-event">
      <h1 className={`modify-event__title ${staatliches.className}`}>Nouvel évenement</h1>
      {message && <p className={`modify-event__sub-description ${khand.className}`}>{message}</p>}
      <div className="modify-event__form">
        <form onSubmit={handleSubmitForm}>
          <label className="modify-event__form__label" htmlFor="event_name">
            Nom de l &apos;évenement
          </label>
          <input
            className="modify-event__form__fields"
            type="text"
            name="event_name"
            id="event_name"
            onChange={handleChange}
            value={formData.event_name}
          />

          <label className="modify-event__form__label" htmlFor="adversary_name">
            Adversaire
          </label>
          <input
            className="modify-event__form__fields"
            type="text"
            name="adversary_name"
            id="adversary_name"
            onChange={handleChange}
            value={formData.adversary_name}
            required
          />

          <label
            className="modify-event__form__label"
            htmlFor="adversary_name_short"
          >
            Initiales de l &apos;adversaire
          </label>
          <input
            className="modify-event__form__fields"
            type="text"
            name="adversary_name_short"
            id="adversary_name_short"
            onChange={handleChange}
            value={formData.adversary_name_short}
            required
          />
          <div className="modify-event__form__file__file-info">
            <label
              className="modify-event__form__file__label"
              htmlFor="image"
            >
              Logo de l &apos;adversaire
              <input
                className="modify-event__form__file__input"
                type="file"
                name="image"
                id="image"
                accept=".webp, .png, .jpeg"
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="modify-event__form__image__info">
            <p>Taille maximum autorisée : 3 Mo</p>
            <p>Formats autorisés : .webp, .png, .jpeg, .jpg</p>
          </div>
          {imagePreview && (
            <div className="modify-event__form__image-preview">
              <Image
                src={imagePreview}
                fill={true}
                alt="Aperçu de l'image"
                className="modify-event__form__image-preview__image"
              />
              <p className="modify-event__form__image-preview__filename">
                {fileName}
              </p>
            </div>
          )}

          <label className="modify-event__form__label" htmlFor="publication_date">
            Date de l &apos;évenement
          </label>
          <input
            className="modify-event__form__fields"
            type="date"
            name="event_date"
            id="event_date"
            onChange={handleChange}
            value={formData.event_date}
          />

          <label className="modify-event__form__label" htmlFor="live_link">
            Lien de live
          </label>
          <input
            className="modify-event__form__fields"
            type="text"
            name="live_link"
            id="live_link"
            onChange={handleChange}
            value={formData.live_link}
          />

          <label className="modify-event__form__label" htmlFor="replay_link">
            Lien de replay
          </label>
          <input
            className="modify-event__form__fields"
            type="text"
            name="replay_link"
            id="replay_link"
            onChange={handleChange}
            value={formData.replay_link}
          />

          <input
            className="modify-event__form__fields"
            type="submit"
            value="Envoyer"
          />
        </form>
      </div>
    </section>
  );
}
