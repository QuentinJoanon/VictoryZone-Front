import { ReduxProvider } from '@/redux/provider';
import { Inter } from 'next/font/google';
import './globals.scss';
import Header from './components/header';
import Footer from './components/footer';

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
        <Header />
        <ReduxProvider>{children}</ReduxProvider>
        <Footer />
      </body>
    </html>
  );
}
