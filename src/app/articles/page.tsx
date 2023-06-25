'use client';

import { useEffect } from 'react';
import { useArticleContext } from '../context/Article';
import { AllArticles, fetchArticles } from '../components_api/ArticlesList';
import './index.scss';

export default function Articles() {
  const { setArticlesList } = useArticleContext(); // Access the article context and retrieve the setArticlesList function

  useEffect(() => {
    fetchArticles(setArticlesList); // Fetch articles and update the articles list in the context
  }, [setArticlesList]);

  const articles = AllArticles(); // Get all articles from the context

  return (
    <main>
      <h1>Articles</h1>
      <div>{articles}</div>
    </main>
  );
}
