'use client';

import { useEffect } from 'react';
import axios from 'axios';
import Article from '../components/Article';
import { useArticleContext, ArticleData } from '../context/articles';

const API_URL =
  'https://projet-14-victory-zone-back-production.up.railway.app/';

export default function Articles() {
  // const [articlesList, setArticlesList] = useState<ArticleData[]>([]);
  const { articlesList, setArticlesList } = useArticleContext();

  useEffect(() => {
    axios
      .get(`${API_URL}api/articles`)
      .then((response) => {
        setArticlesList(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const articles = articlesList.map((article: ArticleData) => (
    <Article
      key={article.id}
      id={article.id}
      title={article.title}
      content={article.content}
      author={article.author}
      large_image={article.large_image}
      created_at={article.created_at}
      categories={
        Array.isArray(article.categories)
          ? article.categories.map((category) => category.label)
          : []
      }
    />
  ));

  return (
    <main>
      <h1>Articles</h1>
      <div>{articles}</div>
    </main>
  );
}
