'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { CalendarData } from '@/app/context/Calendar';
import { editEvent } from '@/app/components_api/CalendarAdmin';

export default function EditCalendar({ params }: { params: { id: number } }) {
  const [event, setEvent] = useState<CalendarData | any>({});
  const router = useRouter();

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}api/calendar/${params.id}`)
      .then((response) => {
        setEvent(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [params.id]);

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (event.live_link === null) {
      delete event.live_link;
    }
    if (event.replay_link === null) {
      delete event.replay_link;
    }
    if (event.score === null) {
      delete event.score;
    }
    delete event.created_at;
    delete event.updated_at;
    event.publication_date = new Date(event.publication_date).toISOString();
    event.event_date = new Date(event.event_date).toISOString();
    console.log(event);
    editEvent(event);
    router.push('/dashboard/calendar');
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEvent({
      ...event,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main>
      <h1>Nouvel évenement</h1>
      <form onSubmit={handleSubmitForm}>
        <label htmlFor="event_name">Nom de l &apos;évenement</label>
        <input
          type="text"
          name="event_name"
          id="event_name"
          onChange={handleChange}
          value={event.event_name}
        />

        <label htmlFor="adversary_name">Adversaire</label>
        <input
          type="text"
          name="adversary_name"
          id="adversary_name"
          onChange={handleChange}
          value={event.adversary_name}
          required
        />

        <label htmlFor="adversary_name_short">
          Initiales de l &apos;adversaire
        </label>
        <input
          type="text"
          name="adversary_name_short"
          id="adversary_name_short"
          onChange={handleChange}
          value={event.adversary_name_short}
          required
        />

        <label htmlFor="image">Logo de l &apos;adversaire</label>
        <input
          type="text"
          name="image"
          id="image"
          onChange={handleChange}
          value={event.image}
          required
        />

        <label htmlFor="publication_date">Date de l &apos;évenement</label>
        <input
          type="date"
          name="event_date"
          id="event_date"
          onChange={handleChange}
          value={event.event_date}
        />

        <label htmlFor="publication_date">Date de publication</label>
        <input
          type="date"
          name="publication_date"
          id="publication_date"
          onChange={handleChange}
          value={event.publication_date}
        />

        <label htmlFor="live_link">Lien de l &apos;évenement</label>
        <input
          type="text"
          name="live_link"
          id="live_link"
          onChange={handleChange}
          value={event.live_link}
        />

        <label htmlFor="live_link">Lien du replay</label>
        <input
          type="text"
          name="replay_link"
          id="replay_link"
          onChange={handleChange}
          value={event.replay_link}
        />

        <label htmlFor="live_link">Score</label>
        <input
          type="text"
          name="score"
          id="score"
          onChange={handleChange}
          value={event.score}
        />

        <input type="submit" value="Envoyer" />
      </form>
    </main>
  );
}
