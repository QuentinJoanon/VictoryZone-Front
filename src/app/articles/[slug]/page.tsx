'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { ArticleData } from '@/app/context/Article';
import Image from 'next/image';

export default function Article({ params }: { params: { slug: string } }) {
  const [article, setArticle] = useState<ArticleData | any>({});

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}api/articles/${params.slug}`)
      .then((response) => {
        setArticle(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  const labels = Array.isArray(article.categories)
    ? article.categories.map((categorie: string | any) => categorie.label)
    : [];

  return (
    <div className="article">
      <h2 className="article__title">{article.title}</h2>
      <Image
        className="article__img"
        src={article.large_image}
        width={100}
        height={500}
        alt={article.figcaption}
      />
      <p className="article__category">{labels}</p>
      <p className="article__content">{article.content}</p>
      <p className="article__date">{article.created_at}</p>
      <p className="article__update">{article.updated_at}</p>
      <p className="article__author">{article.author}</p>
    </div>
  );
}
