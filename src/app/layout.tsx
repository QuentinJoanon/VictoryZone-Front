import { ReduxProvider } from '@/redux/provider';
import { Inter } from 'next/font/google';
import './globals.scss';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'VictoryZone',
  description: "Bienvenue sur le site de l'équipe VictoryZone",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <header>
          <div>
            {/*           <img src="" alt="logo" srcset="" /> */}
            <button>BurgerMenu</button>
          </div>
          <div className="menu">
            <ul>
              <li>Team</li>
              <li>Articles</li>
              <li>Calendrier</li>
              <li>Recrutement</li>
            </ul>
          </div>
        </header>
        <ReduxProvider>{children}</ReduxProvider>
        <footer>
          {/*         <img src="" alt="logo" srcset="" /> */}
          <div>
            <ul>
              <li>Team</li>
              <li>Articles</li>
              <li>Calendrier</li>
              <li>Recrutement</li>
              <li>Tableau de bord</li>
              <li>CGU</li>
            </ul>
          </div>
        </footer>
      </body>
    </html>
  );
}
