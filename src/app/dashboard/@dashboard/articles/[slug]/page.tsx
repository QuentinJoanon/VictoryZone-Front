'use client';

import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { ArticleData } from '@/app/context/Article';
import { editArticle } from '@/app/components_api/ArticlesAdmin';
import { useRouter } from 'next/navigation';
import './index.scss';
import Image from 'next/image';
import { khand, staatliches, ysabeau } from '@/styles/fonts/fonts';

export default function EditArticle({ params }: { params: { slug: string } }) {
  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
  const [article, setArticle] = useState<ArticleData | any>({});

  const [fileName, setFileName] = useState('');
  const [message, setMessage] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [slug, setSlug] = useState('');
  const router = useRouter();

  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}api/articles/admin/${params.slug}`
      )
      .then((response) => {
        setArticle(response.data.data);
        setImagePreview(response.data.data.image);
        const name = response.data.data.image.split(
          'https://esport-website-backend-production.up.railway.app/public/article/'
        );
        setFileName(name);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [params.slug]);

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let { id, image, title, content, publication_date, figcaption } = article;

    const form = new FormData();
    if (typeof image === 'object') {
      form.append('image', image as File);
    }
    form.append('title', title);
    form.append('content', content);
    form.append('publication_date', publication_date);
    form.append('figcaption', figcaption);

    try {
      console.log(form);
      const statusCode = await editArticle(form, id);
      if (statusCode === 200) {
        setMessage('Article modifié avec succès.');
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
      setArticle({
        ...article,
        image: files && files.length > 0 ? files[0] : null,
      });
      setFileName(files && files.length > 0 ? files[0].name : '');
      setImagePreview(
        files && files.length > 0 ? URL.createObjectURL(files[0]) : ''
      );
    } else {
      setArticle({
        ...article,
        [name]: value,
      });
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setArticle({
      ...article,
      [name]: value,
    });
  };

  useEffect(() => {
    if (article.title) {
      setSlug(
        article.title
          .toLowerCase()
          .replace(/ /g, '-')
          .replace(/[^\w-]+/g, '')
      );
    }
  }, [article.title]);

  return (
    <section className="modify-article">
      <h1 className={`modify-article__title ${staatliches.className}`}>
        Modifier l &apos;article
      </h1>
      {message && (
        <p className={`modify-article__sub-description ${khand.className}`}>
          {message}
        </p>
      )}
      <div className="modify-article__form">
        <form onSubmit={handleSubmitForm}>
          <div className="modify-article__form__file__file-info">
            <label
              className="modify-article__form__file__label"
              htmlFor="image"
            >
              Modifier l &apos;image
              <input
                className="modify-article__form__file__input"
                type="file"
                name="image"
                id="image"
                accept=".webp, .png, .jpeg"
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="modify-article__form__image__info">
            <p>Taille maximum autorisée : 3 Mo</p>
            <p>Formats autorisés : .webp, .png, .jpeg, .jpg</p>
          </div>
          {imagePreview && (
            <div className="modify-article__form__image-preview">
              <Image
                src={imagePreview}
                fill={true}
                alt="Aperçu de l'image"
                className="modify-article__form__image-preview__image"
              />
              <p className="modify-article__form__image-preview__filename">
                {fileName}
              </p>
            </div>
          )}
          <label className="modify-article__form__label" htmlFor="figcaption">
            Légende de l &apos;image
          </label>
          <input
            className="modify-article__form__fields"
            type="text"
            name="figcaption"
            id="figcaption"
            onChange={handleChange}
            value={article.figcaption}
          />

          <label className="modify-article__form__label" htmlFor="title">
            Titre
          </label>
          <input
            className="modify-article__form__fields"
            type="text"
            name="title"
            id="title"
            onChange={handleChange}
            value={article.title}
          />
          <p className="modify-article__form__slug">Slug : {slug}</p>

          <label className="modify-article__form__label" htmlFor="content">
            Contenu
          </label>
          <textarea
            className="modify-article__form__fields"
            name="content"
            id="content"
            onChange={handleTextareaChange}
            value={article.content}
          />

          <label
            className="modify-article__form__label"
            htmlFor="publication_date"
          >
            Date de publication
          </label>
          <input
            className="modify-article__form__fields"
            type="date"
            name="publication_date"
            id="publication_date"
            onChange={handleChange}
          />

          <div className="modify-article__form__btn">
            <input
              type="submit"
              value="Envoyer"
              className="modify-article__form__btn__submit"
            />
          </div>
        </form>
      </div>
    </section>
  );
}
