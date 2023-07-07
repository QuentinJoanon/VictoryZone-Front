'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { ArticleData } from '@/app/context/Article';
import { editArticle } from '@/app/components_api/ArticlesAdmin';
import { useRouter } from 'next/navigation';
import './index.scss';

export default function EditArticle({ params }: { params: { slug: string } }) {
  const [article, setArticle] = useState<ArticleData | any>({});
  const router = useRouter();

  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}api/articles/admin/${params.slug}`
      )
      .then((response) => {
        setArticle(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [params.slug]);

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let articleId = article.id;
    delete article.id;
    delete article.created_at;
    delete article.updated_at;
    delete article.events;
    delete article.categories;
    article.publication_date = new Date(article.publication_date).toISOString();
    console.log(article);
    editArticle(article, articleId);
    router.push('/dashboard/articles');
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setArticle({
      ...article,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main>
      <h1>Nouvel article</h1>
      <div className="modify-article">
        <form className="modify-article__form" onSubmit={handleSubmitForm}>
          <label className="modify-article__form__label" htmlFor="image">
            Image
          </label>
          <input
            type="text"
            name="image"
            id="image"
            onChange={handleChange}
            value={article.image}
            required
          />

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
            required
          />

          <label className="modify-article__form__label" htmlFor="content">
            Contenu
          </label>
          <textarea
            className="modify-article__form__input"
            name="content"
            id="content"
            onChange={handleChange}
            value={article.content}
            required
          />

          <label className="modify-article__form__label" htmlFor="author">
            Auteur
          </label>
          <input
            className="modify-article__form__input"
            type="text"
            name="author"
            id="author"
            onChange={handleChange}
            value={article.author}
            required
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
