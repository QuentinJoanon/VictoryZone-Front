'use client';

import React, { createContext, useContext, useState } from 'react';

export interface TeamData {
  id: number;
  user_name: string;
  first_name: string;
  last_name: string;
  description: string;
  role: string;
  image: string;
  statistics: string;
  achievements: string;
  youtube_link: string;
  twitch_link: string;
  twitter_link: string;
  created_at: string;
  updated_at: string;
  setup: string;
}

interface TeamContextType {
  teamList: TeamData[];
  setTeamList: React.Dispatch<React.SetStateAction<TeamData[]>>;
}

const TeamContext = createContext<TeamContextType>({
  teamList: [],
  setTeamList: () => {},
});

export const TeamContextProvider = ({ children }: any) => {
  const [teamList, setTeamList] = useState<TeamData[]>([]);

  return (
    <TeamContext.Provider value={{ teamList, setTeamList }}>
      {children}
    </TeamContext.Provider>
  );
};

export const useTeamContext = () => useContext(TeamContext);
