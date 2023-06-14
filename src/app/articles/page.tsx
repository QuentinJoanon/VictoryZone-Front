'use client';

import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import Article from '../components/Article';

export interface ArticleData {
  id: number;
  title: string;
  content: string;
  author: string;
  large_image: string;
  created_at: string;
  categories?: string;
}

const API_URL =
  'https://projet-14-victory-zone-back-production.up.railway.app/';

export default function Articles() {
  const [articlesList, setArticlesList] = useState<ArticleData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}api/articles`);
        setArticlesList(response.data.data);
      } catch (error: AxiosError | any) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const articles = articlesList.map((article) => (
    <Article
      key={article.id}
      id={article.id}
      title={article.title}
      content={article.content}
      author={article.author}
      large_image={article.large_image}
      created_at={article.created_at}
      categories={article.categories?.map((category) => category.label)}
    />
  ));

  return (
    <main>
      <h1>Articles</h1>
      <div>{articles}</div>
    </main>
  );
}
