'use client';

import { useEffect } from 'react';
import { useArticleContext } from '@/app/context/Article';
import { AllArticles, fetchArticles } from '@/app/components_api/ArticlesList';

/**
 * Renders a list of articles fetched from the server and displays them on the screen.
 *
 * @return {JSX.Element} The main component with a list of articles.
 */
export default function DashboardArticles() {
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
