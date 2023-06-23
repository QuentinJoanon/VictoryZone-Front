'use client';

import { useEffect } from 'react';
import { useArticleContext } from '@/app/context/Article';
import {
  AllEditableArticles,
  fetchAdminArticles,
} from '@/app/components_api/ArticlesAdmin';
import Link from 'next/link';

export default function DashboardArticles() {
  const { setArticlesList } = useArticleContext();

  useEffect(() => {
    fetchAdminArticles(setArticlesList);
  }, [setArticlesList]);

  const articles = AllEditableArticles();

  return (
    <main>
      <h1>Articles</h1>
      <Link href="/dashboard/articles/create">
        <button>Ajouter un article</button>
      </Link>

      <div>{articles}</div>
    </main>
  );
}
