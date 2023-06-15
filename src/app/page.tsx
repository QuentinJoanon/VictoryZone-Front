'use client';

import { useEffect } from 'react';
import { HomeArticles, fetchArticles } from './components_api/ArticlesList';
import { useArticleContext } from './context/Article';

export default function Home() {
  const { setArticlesList } = useArticleContext();

  useEffect(() => {
    fetchArticles(setArticlesList);
  });

  const articles = HomeArticles();
  return (
    <main>
      <h1>Accueil</h1>
      <div>{articles}</div>
    </main>
  );
}
