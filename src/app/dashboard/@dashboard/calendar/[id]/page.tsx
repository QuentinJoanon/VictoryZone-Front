'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { CalendarData } from '@/app/context/Calendar';
import { editEvent } from '@/app/components_api/CalendarAdmin';
import './index.scss';
import Image from 'next/image';
import { type } from 'os';
import { khand, staatliches } from '@/styles/fonts/fonts';

export default function EditCalendar({ params }: { params: { id: number } }) {
  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
  const [event, setEvent] = useState<CalendarData | any>({});
  const [fileName, setFileName] = useState('');
  const [message, setMessage] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const router = useRouter();

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}api/calendar/${params.id}`)
      .then((response) => {
        setEvent(response.data.data);
        setImagePreview(response.data.data.image);
        const name = response.data.data.image.split(
          'https://esport-website-backend-production.up.railway.app/public/calendar/'
        );
        setFileName(name);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [params.id]);

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let {
      id,
      image,
      event_name,
      event_date,
      adversary_name,
      adversary_name_short,
      replay_link,
      live_link,
      score,
    } = event;

    console.log(typeof replay_link, typeof live_link, typeof score);

    const form = new FormData();
    if (typeof image === 'object') {
      form.append('image', image as File);
    }
    form.append('event_name', event_name);
    form.append('event_date', event_date);
    form.append('adversary_name', adversary_name);
    form.append('adversary_name_short', adversary_name_short);
    if (replay_link !== '') {
      form.append('replay_link', replay_link);
    }
    if (live_link !== '') {
      form.append('live_link', live_link);
    }
    if (score !== '') {
      form.append('score', score);
    }

    try {
      console.log(form);
      const statusCode = await editEvent(form, id);
      if (statusCode === 200) {
        setMessage('Article modifié avec succès.');
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
      setEvent({
        ...event,
        image: files && files.length > 0 ? files[0] : null,
      });
      setFileName(files && files.length > 0 ? files[0].name : '');
      setImagePreview(
        files && files.length > 0 ? URL.createObjectURL(files[0]) : ''
      );
    } else {
      setEvent({
        ...event,
        [name]: value,
      });
    }
  };

  return (
    <section className="modify-event">
      <h1 className={`modify-event__title ${staatliches.className}`}>Modifier un évenement</h1>
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
            value={event.event_name}
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
            value={event.adversary_name}
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
            value={event.adversary_name_short}
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

          <label
            className="modify-event__form__label"
            htmlFor="publication_date"
          >
            Date de l &apos;évenement
          </label>
          <input
            className="modify-event__form__fields"
            type="date"
            name="event_date"
            id="event_date"
            onChange={handleChange}
            value={event.event_date}
          />

          <label
            className="modify-event__form__label"
            htmlFor="publication_date"
          >
            Date de publication
          </label>
          <input
            className="modify-event__form__fields"
            type="date"
            name="publication_date"
            id="publication_date"
            onChange={handleChange}
            value={event.publication_date}
          />

          <label className="modify-event__form__label" htmlFor="live_link">
            Lien de l &apos;évenement
          </label>
          <input
            className="modify-event__form__fields"
            type="text"
            name="live_link"
            id="live_link"
            onChange={handleChange}
            value={event.live_link}
          />

          <label className="modify-event__form__label" htmlFor="live_link">
            Lien du replay
          </label>
          <input
            className="modify-event__form__fields"
            type="text"
            name="replay_link"
            id="replay_link"
            onChange={handleChange}
            value={event.replay_link}
          />

          <label className="modify-event__form__label" htmlFor="live_link">
            Score
          </label>
          <input
            className="modify-event__form__fields"
            type="text"
            name="score"
            id="score"
            onChange={handleChange}
            value={event.score}
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
