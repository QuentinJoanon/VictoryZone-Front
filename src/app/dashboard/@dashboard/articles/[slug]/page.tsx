'use client';

import { use, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { ArticleData } from '@/app/context/Article';
import { editArticle } from '@/app/components_api/ArticlesAdmin';
import { useRouter } from 'next/navigation';
import './index.scss';
import Image from 'next/image';
import { sleep } from '../create/page';

export default function EditArticle({ params }: { params: { slug: string } }) {
  const [article, setArticle] = useState<ArticleData | any>({});

  const [fileName, setFileName] = useState('');
  const [message, setMessage] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [slug, setSlug] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);
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

    console.log(article);

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
    <main>
      <h1>Modifier l &apos;article</h1>
      {message && <p>{message}</p>}
      <div className="modify-article">
        <form className="modify-article__form" onSubmit={handleSubmitForm}>
          <div className="modify-article__form__image">
            <label className="modify-article__form__label" htmlFor="image">
              Modifier l &apos;image
            </label>
            <p className="new-article__form__image__info">
              Taille maximum autorisée : 3 Mo
            </p>
            <p className="new-article__form__image__info">
              Formats autorisés : .webp, .png, .jpeg, .jpg
            </p>
            <input
              className="modify-article__form__input"
              type="file"
              name="image"
              id="image"
              accept=".webp, .png, .jpeg"
              ref={fileInputRef}
              onChange={handleChange}
            />
          </div>
          {imagePreview && (
            <div className="modify-article__form__image-preview">
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
          <label className="modify-article__form__label" htmlFor="figcaption">
            Légende de l &apos;image
          </label>
          <input
            className="modify-article__form__input"
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
            className="modify-article__form__input"
            type="text"
            name="title"
            id="title"
            onChange={handleChange}
            value={article.title}
          />
          <p className="new-article__form__slug">Slug : {slug}</p>

          <label className="modify-article__form__label" htmlFor="content">
            Contenu
          </label>
          <textarea
            className="modify-article__form__input"
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
            className="modify-article__form__input"
            type="date"
            name="publication_date"
            id="publication_date"
            onChange={handleChange}
          />

          <input
            className="modify-article__form__input"
            type="submit"
            value="Envoyer"
          />
        </form>
      </div>
    </main>
  );
}
