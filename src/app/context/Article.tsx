'use client';

import { createContext, useContext, useState } from 'react';

export interface ArticleData {
  id: number;
  title: string;
  content: string;
  author: string;
  large_image: string;
  created_at: string;
  categories?: any | string;
}

interface ArticleContextType {
  articlesList: ArticleData[];
  setArticlesList: React.Dispatch<React.SetStateAction<ArticleData[]>>;
}

const ArticlesContext = createContext<ArticleContextType>({
  articlesList: [],
  setArticlesList: () => {},
});

export const ArticlesContextProvider = ({ children }: any) => {
  const [articlesList, setArticlesList] = useState<ArticleData[]>([]);

  return (
    <ArticlesContext.Provider value={{ articlesList, setArticlesList }}>
      {children}
    </ArticlesContext.Provider>
  );
};

export const useArticleContext = () => useContext(ArticlesContext);
