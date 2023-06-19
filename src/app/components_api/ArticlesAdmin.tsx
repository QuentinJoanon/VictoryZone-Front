import { ArticleData, useArticleContext } from '../context/Article';
import CardEditableArticle from '../components/CardEditableArticle';
import axiosInstance from './axiosInstance';

export function fetchAdminArticles(
  setArticlesList: React.Dispatch<React.SetStateAction<ArticleData[]>>
) {
  axiosInstance
    .get(`${process.env.NEXT_PUBLIC_API_URL}api/articles/admin`)
    .then((response) => {
      setArticlesList(response.data.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

export function createNewArticle(newArticle: ArticleData) {
  axiosInstance({
    method: 'post',
    url: `${process.env.NEXT_PUBLIC_API_URL}api/articles`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      'Content-Type': 'application/json',
    },
    data: newArticle,
  })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
}

export function AllEditableArticles() {
  const { articlesList } = useArticleContext();
  const articles = articlesList.map((article: ArticleData) => (
    <CardEditableArticle
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
