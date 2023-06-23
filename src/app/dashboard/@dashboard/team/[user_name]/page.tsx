'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { TeamData } from '@/app/context/Team';
import { editMember } from '@/app/components_api/TeamAdmin';

export default function EditMember({
  params,
}: {
  params: { user_name: string };
}) {
  const [member, setMember] = useState<TeamData | any>({});
  const router = useRouter();

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}api/team/${params.user_name}`)
      .then((response) => {
        setMember(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [params.user_name]);

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let memberId = member.id;
    delete member.id;
    delete member.created_at;
    delete member.updated_at;
    delete member.statistics;
    delete member.achievements;
    delete member.setup;
    delete member.media_video;
    delete member.media_photo;
    console.log(member);
    editMember(member, memberId);
    router.push('/dashboard/team');
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setMember({
      ...member,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main>
      <h1>Nouveau membre</h1>
      <form onSubmit={handleSubmitForm}>
        <label htmlFor="image">Photo</label>
        <input
          type="text"
          name="image"
          id="image"
          onChange={handleChange}
          value={member.image}
        />

        <label htmlFor="last_name">Nom</label>
        <input
          type="text"
          name="last_name"
          id="last_name"
          onChange={handleChange}
          value={member.last_name}
        />

        <label htmlFor="first_name">Prénom</label>
        <input
          type="text"
          name="first_name"
          id="first_name"
          onChange={handleChange}
          value={member.first_name}
        />

        <label htmlFor="user_name">Pseudo</label>
        <input
          type="text"
          name="user_name"
          id="user_name"
          onChange={handleChange}
          value={member.user_name}
        />

        <label htmlFor="role">Rôle</label>
        <input
          type="text"
          name="role"
          id="role"
          onChange={handleChange}
          value={member.role}
        />

        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          id="description"
          onChange={handleChange}
          value={member.description}
        />

        <label htmlFor="youtube_link">Youtube</label>
        <input
          type="text"
          name="youtube_link"
          id="youtube_link"
          onChange={handleChange}
          value={member.youtube_link}
        />

        <label htmlFor="twitch_link">Twitch</label>
        <input
          type="text"
          name="twitch_link"
          id="twitch_link"
          onChange={handleChange}
          value={member.twitch_link}
        />

        <label htmlFor="twitter_link">Twitter</label>
        <input
          type="text"
          name="twitter_link"
          id="twitter_link"
          onChange={handleChange}
          value={member.twitter_link}
        />

        <input type="submit" value="Envoyer" />
      </form>
    </main>
  );
}