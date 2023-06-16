import axios from 'axios';
import { ArticleData, useArticleContext } from '../context/Article';
import CardArticle from '../components/CardArticle';

/**
 * Fetches articles from the API and updates the state with the response data.
 *
 * @param {React.Dispatch<React.SetStateAction<ArticleData[]>>} setArticlesList - A React state setter function that updates the articles list.
 */
export function fetchArticles(
  setArticlesList: React.Dispatch<React.SetStateAction<ArticleData[]>>
) {
  axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}api/articles`)
    .then((response) => {
      setArticlesList(response.data.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

export function AllArticles() {
  const { articlesList } = useArticleContext();
  const articles = articlesList.map((article: ArticleData) => (
    <CardArticle
      key={article.id}
      slug={article.slug}
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
  return articles;
}

export function HomeArticles() {
  const { articlesList } = useArticleContext();
  const articles = articlesList
    .slice(0, 4)
    .map((article: ArticleData) => (
      <CardArticle
        key={article.id}
        slug={article.slug}
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
  return articles;
}
