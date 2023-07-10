'use client';

import { useEffect, useRef, useState } from 'react';
import { createNewArticle } from '@/app/components_api/ArticlesAdmin';
import { useRouter } from 'next/navigation';
import './index.scss';
import Image from 'next/image';

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

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
  const [message, setMessage] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [slug, setSlug] = useState('');

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
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
    try {
      const statusCode = await createNewArticle(form);
      if (statusCode === 201) {
        setMessage('Article créé avec succès.');
      } else {
        setMessage('Erreur ' + statusCode);
      }
      await sleep(2000);
      router.push('/dashboard/articles');
    } catch (error) {
      setMessage('Erreur');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({
        ...formData,
        image: files && files.length > 0 ? files[0] : null,
      });
      setFileName(files && files.length > 0 ? files[0].name : '');
      setImagePreview(
        files && files.length > 0 ? URL.createObjectURL(files[0]) : ''
      );
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

  useEffect(() => {
    if (formData.title) {
      setSlug(
        formData.title
          .toLowerCase()
          .replace(/ /g, '-')
          .replace(/[^\w-]+/g, '')
      );
    }
  }, [formData.title]);

  return (
    <main>
      <h1>Nouvel article</h1>
      {message && <p>{message}</p>}
      <div className="new-article">
        <form className="new-article__form" onSubmit={handleSubmitForm}>
          <div className="new-article__form__image">
            <label className="new-article__form__label" htmlFor="image">
              Ajouter une image
            </label>
            <p className="new-article__form__image__info">
              Taille maximum autorisée : 3 Mo
            </p>
            <p className="new-article__form__image__info">
              Formats autorisés : .webp, .png, .jpeg, .jpg
            </p>
            <input
              className="new-article__form__input"
              type="file"
              name="image"
              id="image"
              onChange={handleChange}
              accept=".webp, .png, .jpeg, .jpg"
              required
            />
          </div>
          {imagePreview && (
            <div className="new-article__form__image-preview">
              <Image
                src={imagePreview}
                width={200}
                height={200}
                alt="Aperçu de l'image"
                className="new-article__form__image-preview__image"
              />
              <p className="new-article__form__image-preview__filename">
                {fileName}
              </p>
            </div>
          )}

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
            required
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
          <p className="new-article__form__slug">Slug : {slug}</p>

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
