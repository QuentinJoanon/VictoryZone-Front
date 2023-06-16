'use client';

import { useEffect } from 'react';
import { useArticleContext, ArticleData } from '../context/Article';
import { AllArticles, fetchArticles } from '../components_api/ArticlesList';

const API_URL =
  'https://projet-14-victory-zone-back-production.up.railway.app/';

/**
 * Renders a list of articles fetched from the server and displays them on the screen.
 *
 * @return {JSX.Element} The main component with a list of articles.
 */
export default function Articles() {
  const { setArticlesList } = useArticleContext();

  useEffect(() => {
    fetchArticles(setArticlesList);
  }, [setArticlesList]);

  const articles = AllArticles();
  console.log(articles);

  return (
    <main>
      <h1>Articles</h1>
      <div>{articles}</div>
    </main>
  );
}
