'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createNewEvent } from '@/app/components_api/CalendarAdmin';

export default function NewEvent() {
  const router = useRouter();
  const [newEvent, setNewEvent] = useState({
    event_name: '',
    event_date: '',
    adversary_name: '',
    adversary_name_short: '',
    image: '',
    publication_date: '',
    live_link: '',
  });

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newEvent.publication_date === '') {
      newEvent.publication_date = new Date().toISOString();
    } else {
      newEvent.publication_date = new Date(
        newEvent.publication_date
      ).toISOString();
    }
    createNewEvent(newEvent);
    router.push('/dashboard/calendar');
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewEvent({
      ...newEvent,
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
          value={newEvent.event_name}
        />

        <label htmlFor="adversary_name">Adversaire</label>
        <input
          type="text"
          name="adversary_name"
          id="adversary_name"
          onChange={handleChange}
          value={newEvent.adversary_name}
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
          value={newEvent.adversary_name_short}
          required
        />

        <label htmlFor="image">Logo de l &apos;adversaire</label>
        <input
          type="text"
          name="image"
          id="image"
          onChange={handleChange}
          value={newEvent.image}
          required
        />

        <label htmlFor="publication_date">Date de l &apos;évenement</label>
        <input
          type="date"
          name="event_date"
          id="event_date"
          onChange={handleChange}
          value={newEvent.event_date}
        />

        <label htmlFor="publication_date">Date de publication</label>
        <input
          type="date"
          name="publication_date"
          id="publication_date"
          onChange={handleChange}
          value={newEvent.publication_date}
        />

        <label htmlFor="live_link">Lien de l &apos;évenement</label>
        <input
          type="text"
          name="live_link"
          id="live_link"
          onChange={handleChange}
          value={newEvent.live_link}
        />

        <input type="submit" value="Envoyer" />
      </form>
    </main>
  );
}
