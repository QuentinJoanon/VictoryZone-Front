'use client';

import { createContext, useContext, useState } from 'react';

// Define the type for the article context
interface MessageContextType {
  isFormSubmitted: boolean;
  setIsFormSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create the context for message
const MessageContext = createContext<MessageContextType>({
  isFormSubmitted: false,
  setIsFormSubmitted: () => {},
});

// Provider component for the articles context
export const MessageContextProvider = ({ children }: any) => {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  return (
    <MessageContext.Provider value={{ isFormSubmitted, setIsFormSubmitted }}>
      {children}
    </MessageContext.Provider>
  );
};

// Custom hook to access the articles context
export const useMessageContext = () => useContext(MessageContext);
