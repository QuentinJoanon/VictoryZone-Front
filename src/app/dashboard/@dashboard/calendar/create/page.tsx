'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createNewEvent } from '@/app/components_api/CalendarAdmin';
import './index.scss';
import Image from 'next/image';

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
    <main>
      <h1>Nouvel évenement</h1>
      {message && <p>{message}</p>}
      <div className="new-event">
        <form className="new-event__form" onSubmit={handleSubmitForm}>
          <label className="new-event__form__label" htmlFor="event_name">
            Nom de l &apos;évenement
          </label>
          <input
            className="new-event__form__input"
            type="text"
            name="event_name"
            id="event_name"
            onChange={handleChange}
            value={formData.event_name}
          />

          <label className="new-event__form__label" htmlFor="adversary_name">
            Adversaire
          </label>
          <input
            className="new-event__form__input"
            type="text"
            name="adversary_name"
            id="adversary_name"
            onChange={handleChange}
            value={formData.adversary_name}
            required
          />

          <label
            className="new-event__form__label"
            htmlFor="adversary_name_short"
          >
            Initiales de l &apos;adversaire
          </label>
          <input
            className="new-event__form__input"
            type="text"
            name="adversary_name_short"
            id="adversary_name_short"
            onChange={handleChange}
            value={formData.adversary_name_short}
            required
          />
          <div className="new-article__form__image">
            <label className="new-article__form__label" htmlFor="image">
              Ajouter une image
            </label>
            <p className="new-article__form__image__info">
              Taille maximum autorisée : 3 Mo
            </p>
            <p className="new-article__form__image__info">
              Formats autorisés : .webp, .png, .jpeg, .jpg
            </p>
            <input
              className="new-article__form__input"
              type="file"
              name="image"
              id="image"
              onChange={handleChange}
              accept=".webp, .png, .jpeg, .jpg"
              required
            />
          </div>
          {imagePreview && (
            <div className="new-article__form__image-preview">
              <Image
                src={imagePreview}
                width={200}
                height={200}
                alt="Aperçu de l'image"
                className="new-article__form__image-preview__image"
              />
              <p className="new-article__form__image-preview__filename">
                {fileName}
              </p>
            </div>
          )}

          <label className="new-event__form__label" htmlFor="publication_date">
            Date de l &apos;évenement
          </label>
          <input
            className="new-event__form__input"
            type="date"
            name="event_date"
            id="event_date"
            onChange={handleChange}
            value={formData.event_date}
          />

          <label className="new-event__form__label" htmlFor="live_link">
            Lien de live
          </label>
          <input
            className="new-event__form__input"
            type="text"
            name="live_link"
            id="live_link"
            onChange={handleChange}
            value={formData.live_link}
          />

          <label className="new-event__form__label" htmlFor="replay_link">
            Lien de replay
          </label>
          <input
            className="new-event__form__input"
            type="text"
            name="replay_link"
            id="replay_link"
            onChange={handleChange}
            value={formData.replay_link}
          />

          <input
            className="new-event__form__input"
            type="submit"
            value="Envoyer"
          />
        </form>
      </div>
    </main>
  );
}
