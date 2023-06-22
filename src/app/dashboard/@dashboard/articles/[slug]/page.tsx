'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { ArticleData } from '@/app/context/Article';
import { editArticle } from '@/app/components_api/ArticlesAdmin';
import { useRouter } from 'next/navigation';

export default function EditArticle({ params }: { params: { slug: string } }) {
  const [article, setArticle] = useState<ArticleData | any>({});
  const router = useRouter();

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}api/articles/${params.slug}`)
      .then((response) => {
        setArticle(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [params.slug]);

  /*   const [categorie1, setCategorie1] = useState('');
  const [categorie2, setCategorie2] = useState(''); */

  /*   const labels = Array.isArray(article.categories)
    ? article.categories.map((categorie: string | any) => categorie.label)
    : []; */

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
