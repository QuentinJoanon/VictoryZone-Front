'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { ArticleData } from '@/app/context/Article';
import Image from 'next/image';
import './index.scss';
import TimeFormatter from '../../components/timeFormatter';

export default function Article({ params }: { params: { slug: string } }) {
  const [article, setArticle] = useState<ArticleData | any>({});

  useEffect(() => {
    // Fetch article data from the server using the provided slug parameter
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}api/articles/${params.slug}`)
      .then((response) => {
        setArticle(response.data.data); // Set the fetched article data to the state
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setArticle, params.slug]);

  const labels = Array.isArray(article.categories)
    ? article.categories.map((categorie: string | any) => categorie.label)
    : [];

  return (
    <div className="article container">
      <div className="article__img banner-image">
        <Image
          className="img"
          src={article.image} // {article.image}
          fill={true}
          alt="" // {article.figcaption}
        />
      </div>
      <div className="wrapper">
        <h2 className="article__title">{article.title}</h2>
        <p className="article__category">{labels}</p>
        <p className="article__content">{article.content}</p>
        <p className="article__date">{<TimeFormatter time={article.publication_date} />}</p>
        <p className="article__update">{article.updated_at}</p>
        <p className="article__author">{article.author}</p>
      </div>
    </div>
  );
}
