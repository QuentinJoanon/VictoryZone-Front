'use client';

import { useRef, useState } from 'react';
import { createNewArticle } from '@/app/components_api/ArticlesAdmin';
import { useRouter } from 'next/navigation';
import './index.scss';

export default function NewArticle() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    image: null as File | null,
    title: '',
    content: '',
    publication_date: '',
    figcaption: '',
  });

  const [fileName, setFileName] = useState('');

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let { image, title, content, publication_date, figcaption } = formData;

    if (publication_date === '') {
      publication_date = new Date().toISOString();
    } else {
      publication_date = new Date(publication_date).toISOString();
    }

    const form = new FormData();
    form.append('image', image as File);
    form.append('title', title);
    form.append('content', content);
    form.append('publication_date', publication_date);
    form.append('figcaption', figcaption);
    console.log(form);
    createNewArticle(form);
    router.push('/dashboard/articles');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({
        ...formData,
        image: files && files.length > 0 ? files[0] : null,
      });
      setFileName(files && files.length > 0 ? files[0].name : '');
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <main>
      <h1>Nouvel article</h1>
      <div className="new-article">
        <form
          className="new-article__form"
          onSubmit={handleSubmitForm}
          action={`${process.env.NEXT_PUBLIC_API_URL}api/recruitment`} // | ACTION = L'url vers laquelle le form sera envoyé lors de la soumission du forn.
          encType="multipart/form-data" //                                                          | indique que le form contient des données binaires telles que des fichiers.
          method="post"
        >
          <label className="new-article__form__label" htmlFor="image">
            Image
          </label>
          <input
            className="new-article__form__input"
            type="file"
            name="image"
            id="image"
            onChange={handleChange}
            accept=".webp, .png, .jpeg"
            ref={fileInputRef}
            required
          />

          <label className="new-article__form__label" htmlFor="figcaption">
            Légende de l &apos;image
          </label>
          <input
            className="new-article__form__input"
            type="text"
            name="figcaption"
            id="figcaption"
            onChange={handleChange}
            value={formData.figcaption}
          />

          <label className="new-article__form__label" htmlFor="title">
            Titre
          </label>
          <input
            className="new-article__form__input"
            type="text"
            name="title"
            id="title"
            onChange={handleChange}
            value={formData.title}
            required
          />

          <label className="new-article__form__label" htmlFor="content">
            Contenu
          </label>
          <textarea
            className="new-article__form__input"
            name="content"
            id="content"
            onChange={handleTextareaChange}
            value={formData.content}
            required
          />

          <label
            className="new-article__form__label"
            htmlFor="publication_date"
          >
            Date de publication
          </label>
          <input
            className="new-article__form__input"
            type="date"
            name="publication_date"
            id="publication_date"
            onChange={handleChange}
            value={formData.publication_date}
          />

          <input
            className="new-article__form__input"
            type="submit"
            value="Envoyer"
          />
        </form>
      </div>
    </main>
  );
}
