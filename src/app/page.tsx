'use client';

import { useEffect } from 'react';
import { AllArticles, fetchHomeArticles } from './components_api/ArticlesList';
import { useArticleContext } from './context/Article';
import './index.scss';

export default function Home() {
  const { setArticlesList } = useArticleContext();

  useEffect(() => {
    fetchHomeArticles(setArticlesList);
  });

  const articles = AllArticles();
  return (
    <main>
      <h1>Accueil</h1>
      <div>{articles}</div>
    </main>
  );
}
