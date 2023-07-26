'use client';

import { useEffect } from 'react';
import { useArticleContext } from '../context/Article';
import { AllArticles, fetchArticles } from '../components_api/ArticlesList';
import './index.scss';
import { staatliches } from '@/styles/fonts/fonts';

export default function Articles() {
  const { setArticlesList } = useArticleContext(); // Access the article context and retrieve the setArticlesList function

  useEffect(() => {
    fetchArticles(setArticlesList); // Fetch articles and update the articles list in the context
  }, [setArticlesList]);

  const articles = AllArticles(); // Get all articles from the context

  return (
    <section className="articles">
      <h1 className={`articles__title ${staatliches.className}`}>Articles</h1>
      <h2 className={`articles__sub-title ${staatliches.className}`}>
        Tous les articles
      </h2>
      <div className="articles__home">{articles}</div>
    </section>
  );
}
