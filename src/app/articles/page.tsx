'use client';

import { useEffect } from 'react';
import { useArticleContext } from '../context/Article';
import { AllArticles, fetchArticles } from '../components_api/ArticlesList';
import './index.scss';

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
