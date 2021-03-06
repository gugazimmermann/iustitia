import { Footer, Header } from '../../components';
import './Layout.css';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="body-bg min-h-screen pt-12 pb-6 px-2 md:px-0">
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default Layout;
