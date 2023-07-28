'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { ArticleData } from '@/app/context/Article';
import Image from 'next/image';
import './index.scss';
import TimeFormatter from '../../components/timeFormatter';
import { khand, staatliches } from '@/styles/fonts/fonts';

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
    <div className="article-container">
      <div className="article-container__img">
        <Image
          className="img"
          src={article.image} // {article.image}
          fill={true}
          alt="" // {article.figcaption}
          sizes="(max-width: 768px) 100vw, 700px"
        />
      </div>
      <div className="article-container__info">
        <div className="article-container__info__top-items">
          <div
            className={`article-container__info__top-items__category ${khand.className}`}
          >
            {labels}
          </div>
          <div
            className={`article-container__info__top-items__date ${khand.className}`}
          >
            {<TimeFormatter time={article.publication_date} />}
          </div>
          <div className="article-container__info__top-items__author">
            {article.author}
          </div>
        </div>
        <h1
          className={`article-container__info__title ${staatliches.className}`}
        >
          {article.title}
        </h1>
        <p className={`article-container__info__content ${khand.className}`}>
          {article.content}
        </p>
      </div>
    </div>
  );
}
