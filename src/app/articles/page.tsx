'use client';

import { useEffect } from 'react';
import { useArticleContext } from '../context/Article';
import { AllArticles, fetchArticles } from '../components_api/ArticlesList';
import './index.scss';

export default function Articles() {
  const { setArticlesList } = useArticleContext();

  useEffect(() => {
    fetchArticles(setArticlesList);
  }, [setArticlesList]);

  const articles = AllArticles();

  return (
    <main>
      <h1>Articles</h1>
      <div>{articles}</div>
    </main>
  );
}
