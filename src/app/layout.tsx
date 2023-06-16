import './globals.scss';
import Header from './components/Header';
import Footer from './components/Footer';
import { ArticlesContextProvider } from './context/Article';
import { CalendarContextProvider } from './context/Calendar';

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
        <div className="wrapper">
          <Header />
          <ArticlesContextProvider>
            <CalendarContextProvider>
              <main className="content">{children}</main>
            </CalendarContextProvider>
          </ArticlesContextProvider>
          <Footer />
        </div>
      </body>
    </html>
  );
}
