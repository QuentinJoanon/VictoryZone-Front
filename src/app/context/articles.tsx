'use client';

import { createContext, useContext, useState } from 'react';

const ArticlesContext = createContext({});

export const ArticlesContextProvider = ({ children }) => {
  const [articlesList, setArticlesList] = useState([]);

  return (
    <ArticlesContext.Provider value={{ articlesList, setArticlesList }}>
      {children}
    </ArticlesContext.Provider>
  );
};

export const useArticleContext = () => useContext(ArticlesContext);
