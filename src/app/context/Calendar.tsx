//  On commence toujours par definir le contexte des calendrier, cela servira de point central pour stocker et gerer les données des calendriers provenant de l'API
//  Ce fichier definit le contexte des articles en utilisant le hook 'createContext'.

'use client';

import { createContext, useContext, useState } from 'react';

export interface CalendarData {
  // Mettre ? pour les types facultatifs
  id: number;
  event_name: string;
  event_date: number;
  adversary_name: string;
  adversary_name_short: string;
  replay_link?: string;
  live_link?: string;
  score?: string;
  large_image: string;
  publication_date?: string;
  created_at?: string;
  updated_at?: string;
}

interface CalendarContextType {
  calendarList: CalendarData[];
  setCalendarList: React.Dispatch<React.SetStateAction<CalendarData[]>>;
}

const CalendarContext = createContext<CalendarContextType>({
  // Le contexte contient deux valeurs :
  calendarList: [], // calendarList : Qui represente la liste des evenements
  setCalendarList: () => {}, // setCalendarList: Fonction pour mettre à jour cette liste.
});

export const CalendarContextProvider = ({ children }: any) => {
  // Le composant 'CalendarContextProvider' va fournir le contexte des calendrier a ses composants enfants.
  const [calendarList, setCalendarList] = useState<CalendarData[]>([]); // Il utilise le hook 'useState' pour initialiser l'etat de 'calendarList' à un tableau vide.

  return (
    <CalendarContext.Provider value={{ calendarList, setCalendarList }}>
      {/*Ensuite il rend le contexte des calendriers avec les valeurs 'calendarList' et 'setCalendarList' fournis par le hook 'useState'*/}
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendarContext = () => useContext(CalendarContext); // Le hook 'useCalendarContext' permet d'acceder au contexte des calendriers depuis n'importe quel composants en utilisant le hook 'useContext' de React.

/* ------------------------------------------------
CODE WITHOUT TYPESCRIPT
------------------------------------------------
  
'use client';

import { createContext, useContext, useState } from 'react';

const CalendarContext = createContext({
  calendarList: [],
  setCalendarList: () => {},
});

export const CalendarContextProvider = ({ children }) => {
  const [calendarList, setCalendarList] = useState([]);

  return (
    <CalendarContext.Provider value={{ calendarList, setCalendarList }}>
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendarContext = () => useContext(CalendarContext);
*/
