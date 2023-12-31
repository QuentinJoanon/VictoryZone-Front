'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { TeamData } from '@/app/context/Team';
import { editMember } from '@/app/components_api/TeamAdmin';
import './index.scss';
import Image from 'next/image';
import { khand, staatliches } from '@/styles/fonts/fonts';

export default function EditMember({
  params,
}: {
  params: { user_name: string };
}) {
  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
  const [member, setMember] = useState<TeamData | any>({});
  const [fileName, setFileName] = useState('');
  const [message, setMessage] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const router = useRouter();

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}api/team/${params.user_name}`)
      .then((response) => {
        setMember(response.data.data);
        setImagePreview(response.data.data.image);
        const name = response.data.data.image.split(
          'https://esport-website-backend-production.up.railway.app/public/team/'
        );
        setFileName(name);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [params.user_name]);

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let id = member.id;

    let {
      image,
      last_name,
      first_name,
      user_name,
      role,
      description,
      youtube_link,
      twitch_link,
      twitter_link,
    } = member;

    const form = new FormData();
    if (typeof image === 'object') {
      form.append('image', image as File);
    }
    form.append('last_name', last_name);
    form.append('first_name', first_name);
    form.append('user_name', user_name);
    form.append('role', role);
    form.append('description', description);
    form.append('youtube_link', youtube_link);
    form.append('twitch_link', twitch_link);
    form.append('twitter_link', twitter_link);

    try {
      console.log(form);
      const statusCode = await editMember(form, id);
      if (statusCode === 200) {
        setMessage('member modifié avec succès.');
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
      setMember({
        ...member,
        image: files && files.length > 0 ? files[0] : null,
      });
      setFileName(files && files.length > 0 ? files[0].name : '');
      setImagePreview(
        files && files.length > 0 ? URL.createObjectURL(files[0]) : ''
      );
    } else {
      setMember({
        ...member,
        [name]: value,
      });
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setMember({
      ...member,
      [name]: value,
    });
  };

  return (
    <section className="modify-member">
      <h1 className={`modify-member__title ${staatliches.className}`}>Modifier un membre</h1>
      {message && <p className={`modify-member__sub-description ${khand.className}`}>{message}</p>}
      <div className="modify-member__form">
        <form onSubmit={handleSubmitForm}>
        <div className="modify-member__form__file__file-info">
            <label
              className="modify-member__form__file__label"
              htmlFor="image"
            >
              Modifier la photo
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
          <label className="modify-member__form__label" htmlFor="first_name">
            Prénom
          </label>
          <input
            className="modify-member__form__fields"
            type="text"
            name="first_name"
            id="first_name"
            onChange={handleChange}
            value={member.first_name}
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
            value={member.user_name}
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
            value={member.role}
          />

          <label className="modify-member__form__label" htmlFor="description">
            Description
          </label>
          <textarea
            className="modify-member__form__fields"
            name="description"
            id="description"
            onChange={handleTextareaChange}
            value={member.description}
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
            value={member.youtube_link}
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
            value={member.twitch_link}
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
            value={member.twitter_link}
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
