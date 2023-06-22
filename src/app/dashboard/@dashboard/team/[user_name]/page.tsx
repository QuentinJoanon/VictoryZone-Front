'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { ArticleData } from '@/app/context/Article';
import { editArticle } from '@/app/components_api/ArticlesAdmin';
import { useRouter } from 'next/navigation';
import { TeamData } from '@/app/context/Team';

export default function EditMember({
  params,
}: {
  params: { user_name: string };
}) {
  const [member, setMember] = useState<TeamData | any>({});
  const router = useRouter();

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}api/articles/${params.user_name}`)
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
        <label htmlFor="image">Image</label>
        <input
          type="text"
          name="image"
          id="image"
          onChange={handleChange}
          value={article.image}
          required
        />

        <label htmlFor="figcaption">Légende de l &apos;image</label>
        <input
          type="text"
          name="figcaption"
          id="figcaption"
          onChange={handleChange}
          value={article.figcaption}
        />

        <label htmlFor="title">Titre</label>
        <input
          type="text"
          name="title"
          id="title"
          onChange={handleChange}
          value={article.title}
          required
        />

        <label htmlFor="content">Contenu</label>
        <textarea
          name="content"
          id="content"
          onChange={handleChange}
          value={article.content}
          required
        />

        <label htmlFor="author">Auteur</label>
        <input
          type="text"
          name="author"
          id="author"
          onChange={handleChange}
          value={article.author}
          required
        />

        {/*         <label htmlFor="categorie1">Catégories 1</label>
          <input
            type="text"
            name="categorie1"
            id="categorie1"
            onChange={(e) => setCategorie1(e.target.value)}
          />
  
          <label htmlFor="categorie2">Catégories 2</label>
          <input
            type="text"
            name="categorie2"
            id="categorie2"
            onChange={(e) => setCategorie2(e.target.value)}
          /> */}

        <label htmlFor="publication_date">Date de publication</label>
        <input
          type="date"
          name="publication_date"
          id="publication_date"
          onChange={handleChange}
          // value={article.publication_date}
        />

        <input type="submit" value="Envoyer" />
      </form>
    </main>
  );
}
