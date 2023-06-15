import { Inter } from 'next/font/google';
import './globals.scss';
import Header from './components/header';
import Footer from './components/footer';
import { ArticlesContextProvider } from './context/articles';

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
            <main className="content">{children}</main>
          </ArticlesContextProvider>
          <Footer />
        </div>
      </body>
    </html>
  );
}
