'use client';

import { useEffect } from 'react';
import { useArticleContext } from '@/app/context/Article';
import {
  AllEditableArticles,
  fetchAdminArticles,
} from '@/app/components_api/ArticlesAdmin';
import Link from 'next/link';
import './index.scss';

export default function DashboardArticles() {
  const { setArticlesList } = useArticleContext();

  useEffect(() => {
    fetchAdminArticles(setArticlesList);
  }, [setArticlesList]);

  const articles = AllEditableArticles();

  return (
    <main>
      <h1>Articles</h1>
      <div className="new-article">
        <Link href="/dashboard/articles/create">
          <button className="button">Ajouter un article</button>
        </Link>
      </div>
      <div className="articles__dashboard">{articles}</div>
    </main>
  );
}
