'use client';

import { useEffect } from 'react';
import { useArticleContext } from '@/app/context/Article';
import {
  AllEditableArticles,
  fetchAdminArticles,
} from '@/app/components_api/ArticlesAdmin';
import Link from 'next/link';
// import './index.scss';
import { staatliches } from '@/styles/fonts/fonts';

export default function DashboardArticles() {
  const { setArticlesList } = useArticleContext();

  useEffect(() => {
    fetchAdminArticles(setArticlesList);
  }, [setArticlesList]);

  const articles = AllEditableArticles();

  return (
    <section className="articles">
      <h1 className={`articles__title ${staatliches.className}`}>Articles</h1>
      <div className="new">
      <div className="new__btn">
        <Link href="/dashboard/articles/create">
          <button className="new__btn__neon-btn">Ajouter un article</button>
        </Link>
        </div>
      </div>
      <h2 className={`articles__sub-title ${staatliches.className}`}>
        Tous les articles
      </h2>
      <div className="articles__dashboard">{articles}</div>
    </section>
  );
}
