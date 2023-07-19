'use client';

import React, { createContext, useContext, useState } from 'react';

export interface TeamData {
  map?: any;
  id?: number;
  user_name: string;
  first_name: string;
  last_name: string;
  description: string;
  role: string;
  image: string;
  statistics?: string;
  achievements?: string;
  youtube_link: string;
  twitch_link: string;
  twitter_link: string;
  created_at?: string;
  updated_at?: string;
  setup?: string;
}

// Define the type for the team context
interface TeamContextType {
  teamList: TeamData[];
  setTeamList: React.Dispatch<React.SetStateAction<TeamData[]>>;
}

// Create the context for the team
const TeamContext = createContext<TeamContextType>({
  teamList: [],
  setTeamList: () => {},
});

// Provider component for the team context
export const TeamContextProvider = ({ children }: any) => {
  const [teamList, setTeamList] = useState<TeamData[]>([]);

  return (
    <TeamContext.Provider value={{ teamList, setTeamList }}>
      {children}
    </TeamContext.Provider>
  );
};

// Custom hook to access the team context
export const useTeamContext = () => useContext(TeamContext);
