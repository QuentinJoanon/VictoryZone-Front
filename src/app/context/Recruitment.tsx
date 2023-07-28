'use client';

import { createContext, useContext, useState } from 'react';

export interface RecruitementData {
  map?: any;
  id?: number;
  email: string;
  first_name: string;
  last_name: string;
  message: string;
  external_link?: string;
  cv?: File | null;
  is_reviewed?: boolean;
  is_accepted?: boolean;
  reviewer_comment?: string;
  reviewer_comment_private?: string;
  created_at?: string;
  updated_at?: string;
}

// Define the type for the recruitment context
interface RecruitmentContextType {
  recruitmentList: RecruitementData[];
  setRecruitmentList: React.Dispatch<React.SetStateAction<RecruitementData[]>>;
}

// Create the context for recruitments
const RecruitmentContext = createContext<RecruitmentContextType>({
  recruitmentList: [],
  setRecruitmentList: () => {},
});

// Provider component for the recruitments context
export const RecruitmentContextProvider = ({ children }: any) => {
  const [recruitmentList, setRecruitmentList] = useState<RecruitementData[]>(
    []
  );

  return (
    <RecruitmentContext.Provider
      value={{ recruitmentList, setRecruitmentList }}
    >
      {children}
    </RecruitmentContext.Provider>
  );
};

// Custom hook to access the recruitments context
export const useRecruitmentContext = () => useContext(RecruitmentContext);
