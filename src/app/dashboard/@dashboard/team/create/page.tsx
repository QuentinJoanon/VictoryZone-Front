'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createNewMember } from '@/app/components_api/TeamAdmin';
import '../[user_name]/index.scss';
import Image from 'next/image';
import { khand, staatliches } from '@/styles/fonts/fonts';

export default function NewMember() {
  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
  const router = useRouter();
  const [newMember, setNewMember] = useState({
    user_name: '',
    first_name: '',
    last_name: '',
    description: '',
    role: '',
    image: null as File | null,
    youtube_link: '',
    twitch_link: '',
    twitter_link: '',
  });
  const [fileName, setFileName] = useState('');
  const [message, setMessage] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const {
      user_name,
      first_name,
      last_name,
      description,
      role,
      image,
      youtube_link,
      twitch_link,
      twitter_link,
    } = newMember;

    const form = new FormData();
    form.append('user_name', user_name);
    form.append('first_name', first_name);
    form.append('last_name', last_name);
    form.append('description', description);
    form.append('role', role);
    if (image) {
      form.append('image', image);
    }
    form.append('youtube_link', youtube_link);
    form.append('twitch_link', twitch_link);
    form.append('twitter_link', twitter_link);
    try {
      const statusCode = await createNewMember(form);
      if (statusCode === 201) {
        setMessage('Membre ajouté avec succès.');
      } else {
        setMessage('Erreur ' + statusCode);
      }
      await sleep(2000);
      router.push('/dashboard/team');
    } catch (error) {
      setMessage('Erreur');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setNewMember({
        ...newMember,
        image: files && files.length > 0 ? files[0] : null,
      });
      setFileName(files && files.length > 0 ? files[0].name : '');
      setImagePreview(
        files && files.length > 0 ? URL.createObjectURL(files[0]) : ''
      );
    } else {
      setNewMember({
        ...newMember,
        [name]: value,
      });
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewMember({
      ...newMember,
      [name]: value,
    });
  };

  return (
    <section className="modify-member">
      <h1 className={`modify-member__title ${staatliches.className}`}>Nouveau membre</h1>
      {message && <p className={`modify-member__sub-description ${khand.className}`}>{message}</p>}
      <div className="modify-member__form">
        <form onSubmit={handleSubmitForm}>
        <div className="modify-member__form__file__file-info">
            <label
              className="modify-member__form__file__label"
              htmlFor="image"
            >
              Ajouter une photo
              <input
                className="modify-member__form__file__input"
                type="file"
                name="image"
                id="image"
                accept=".webp, .png, .jpeg"
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="modify-member__form__image__info">
            <p>Taille maximum autorisée : 3 Mo</p>
            <p>Formats autorisés : .webp, .png, .jpeg, .jpg</p>
          </div>
          {imagePreview && (
            <div className="modify-member__form__image-preview">
              <Image
                src={imagePreview}
                fill={true}
                alt="Aperçu de l'image"
                className="modify-member__form__image-preview__image"
              />
              <p className="modify-member__form__image-preview__filename">
                {fileName}
              </p>
            </div>
          )}

          <label className="modify-member__form__label" htmlFor="last_name">
            Nom
          </label>
          <input
            className="modify-member__form__fields"
            type="text"
            name="last_name"
            id="last_name"
            onChange={handleChange}
            value={newMember.last_name}
            required
          />

          <label className="modify-member__form__label" htmlFor="first_name">
            Prénom
          </label>
          <input
            className="modify-member__form__fields"
            type="text"
            name="first_name"
            id="first_name"
            onChange={handleChange}
            value={newMember.first_name}
            required
          />

          <label className="modify-member__form__label" htmlFor="user_name">
            Pseudo
          </label>
          <input
            className="modify-member__form__fields"
            type="text"
            name="user_name"
            id="user_name"
            onChange={handleChange}
            value={newMember.user_name}
            required
          />

          <label className="modify-member__form__label" htmlFor="role">
            Rôle
          </label>
          <input
            className="modify-member__form__fields"
            type="text"
            name="role"
            id="role"
            onChange={handleChange}
            value={newMember.role}
            required
          />

          <label className="modify-member__form__label" htmlFor="description">
            Description
          </label>
          <textarea
            className="modify-member__form__fields"
            name="description"
            id="description"
            onChange={handleTextareaChange}
            value={newMember.description}
            required
          />

          <label className="modify-member__form__label" htmlFor="youtube_link">
            Youtube
          </label>
          <input
            className="modify-member__form__fields"
            type="text"
            name="youtube_link"
            id="youtube_link"
            onChange={handleChange}
            value={newMember.youtube_link}
          />

          <label className="modify-member__form__label" htmlFor="twitch_link">
            Twitch
          </label>
          <input
            className="modify-member__form__fields"
            type="text"
            name="twitch_link"
            id="twitch_link"
            onChange={handleChange}
            value={newMember.twitch_link}
            required
          />

          <label className="modify-member__form__label" htmlFor="twitter_link">
            Twitter
          </label>
          <input
            className="modify-member__form__fields"
            type="text"
            name="twitter_link"
            id="twitter_link"
            onChange={handleChange}
            value={newMember.twitter_link}
            required
          />

          <input
            className="modify-member__form__fields"
            type="submit"
            value="Envoyer"
          />
        </form>
      </div>
    </section>
  );
}
