'use client';

import { useState } from 'react';
import { createNewArticle } from '@/app/components_api/ArticlesAdmin';
import { useRouter } from 'next/navigation';

export default function NewArticle() {
  const username = localStorage.getItem('user_name');
  const router = useRouter();
  const [newArticle, setNewArticle] = useState({
    image: '',
    title: '',
    content: '',
    publication_date: '',
    author: username,
    slug: '',
    figcaption: '',
  });

  function convertToSlug(title: string) {
    return title
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
  }

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newArticle.publication_date === '') {
      newArticle.publication_date = new Date().toISOString();
    } else {
      newArticle.publication_date = new Date(
        newArticle.publication_date
      ).toISOString();
    }
    newArticle.slug = convertToSlug(newArticle.title);
    createNewArticle(newArticle);
    router.push('/dashboard/articles');
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewArticle({
      ...newArticle,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main>
      <h1>Nouvel article</h1>
      <form onSubmit={handleSubmitForm}>
        <label htmlFor="image">Image</label>
        <input
          type="text"
          name="image"
          id="image"
          onChange={handleChange}
          value={newArticle.image}
          required
        />

        <label htmlFor="figcaption">Légende de l &apos;image</label>
        <input
          type="text"
          name="figcaption"
          id="figcaption"
          onChange={handleChange}
          value={newArticle.figcaption}
        />

        <label htmlFor="title">Titre</label>
        <input
          type="text"
          name="title"
          id="title"
          onChange={handleChange}
          value={newArticle.title}
          required
        />

        <label htmlFor="content">Contenu</label>
        <textarea
          name="content"
          id="content"
          onChange={handleChange}
          value={newArticle.content}
          required
        />

        <label htmlFor="publication_date">Date de publication</label>
        <input
          type="date"
          name="publication_date"
          id="publication_date"
          onChange={handleChange}
          value={newArticle.publication_date}
        />

        <input type="submit" value="Envoyer" />
      </form>
    </main>
  );
}
