import axios from 'axios';
import { ArticleData, useArticleContext } from '../context/Article';
import CardArticle from '../components/CardArticle';

export function fetchArticles(
  setArticlesList: React.Dispatch<React.SetStateAction<ArticleData[]>>
) {
  axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}api/articles`)
    .then((response) => {
      setArticlesList(response.data.data); // Set the fetched articles list in the state
    })
    .catch((error) => {
      console.log(error);
    });
}

export function fetchHomeArticles(
  setArticlesList: React.Dispatch<React.SetStateAction<ArticleData[]>>
) {
  axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}api/articles?home=true`)
    .then((response) => {
      setArticlesList(response.data.data); // Set the fetched home articles list in the state
    })
    .catch((error) => {
      console.log(error);
    });
}

export function AllArticles() {
  const { articlesList } = useArticleContext(); // Access the article context and retrieve the articles list
  const articles = articlesList.map((article: ArticleData) => (
    <CardArticle
      key={article.id}
      slug={article.slug}
      title={article.title}
      content={article.content}
      author={article.author}
      image={article.image}
      created_at={article.created_at}
      categories={
        Array.isArray(article.categories)
          ? article.categories.map((category) => category.label)
          : []
      }
    />
  ));
  return articles; // Return the rendered list of articles
}
