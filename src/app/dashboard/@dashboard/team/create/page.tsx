'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createNewMember } from '@/app/components_api/TeamAdmin';
import './index.scss';

export default function NewMember() {
  const router = useRouter();
  const [newMember, setNewMember] = useState({
    user_name: '',
    first_name: '',
    last_name: '',
    description: '',
    role: '',
    image: '',
    youtube_link: '',
    twitch_link: '',
    twitter_link: '',
  });

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createNewMember(newMember);
    router.push('/dashboard/team');
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewMember({
      ...newMember,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main>
      <h1>Nouveau membre</h1>
      <div className="new-member">
        <form className="new-member__form" onSubmit={handleSubmitForm}>
          <label className="new-member__form__label" htmlFor="image">
            Photo
          </label>
          <input
            type="text"
            name="image"
            id="image"
            onChange={handleChange}
            value={newMember.image}
            required
          />

          <label className="new-member__form__label" htmlFor="last_name">
            Nom
          </label>
          <input
            className="new-member__form__input"
            type="text"
            name="last_name"
            id="last_name"
            onChange={handleChange}
            value={newMember.last_name}
            required
          />

          <label className="new-member__form__label" htmlFor="first_name">
            Prénom
          </label>
          <input
            className="new-member__form__input"
            type="text"
            name="first_name"
            id="first_name"
            onChange={handleChange}
            value={newMember.first_name}
            required
          />

          <label className="new-member__form__label" htmlFor="user_name">
            Pseudo
          </label>
          <input
            className="new-member__form__input"
            type="text"
            name="user_name"
            id="user_name"
            onChange={handleChange}
            value={newMember.user_name}
            required
          />

          <label className="new-member__form__label" htmlFor="role">
            Rôle
          </label>
          <input
            className="new-member__form__input"
            type="text"
            name="role"
            id="role"
            onChange={handleChange}
            value={newMember.role}
            required
          />

          <label className="new-member__form__label" htmlFor="description">
            Description
          </label>
          <textarea
            className="new-member__form__input"
            name="description"
            id="description"
            onChange={handleChange}
            value={newMember.description}
            required
          />

          <label className="new-member__form__label" htmlFor="youtube_link">
            Youtube
          </label>
          <input
            className="new-member__form__input"
            type="text"
            name="youtube_link"
            id="youtube_link"
            onChange={handleChange}
            value={newMember.youtube_link}
          />

          <label className="new-member__form__label" htmlFor="twitch_link">
            Twitch
          </label>
          <input
            className="new-member__form__input"
            type="text"
            name="twitch_link"
            id="twitch_link"
            onChange={handleChange}
            value={newMember.twitch_link}
            required
          />

          <label className="new-member__form__label" htmlFor="twitter_link">
            Twitter
          </label>
          <input
            className="new-member__form__input"
            type="text"
            name="twitter_link"
            id="twitter_link"
            onChange={handleChange}
            value={newMember.twitter_link}
            required
          />

          <input
            className="new-member__form__input"
            type="submit"
            value="Envoyer"
          />
        </form>
      </div>
    </main>
  );
}
