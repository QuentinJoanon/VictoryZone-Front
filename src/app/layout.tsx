import './globals.scss';
import Header from './components/Header';
import Footer from './components/Footer';
import { ArticlesContextProvider } from './context/Article';
import { CalendarContextProvider } from './context/Calendar';
import { TeamContextProvider } from './context/Team';
import { RecruitmentContextProvider } from './context/Recruitment';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
});

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
      <body className={roboto.className}>
        <div className="wrapper">
          <Header />
          <ArticlesContextProvider>
            <CalendarContextProvider>
              <TeamContextProvider>
                <RecruitmentContextProvider>
                  <main className="content">{children}</main>
                </RecruitmentContextProvider>
              </TeamContextProvider>
            </CalendarContextProvider>
          </ArticlesContextProvider>
          <Footer />
        </div>
      </body>
    </html>
  );
}
