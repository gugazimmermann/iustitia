import './Layout.css';
import Nav from '../../components/nav/Nav';
import Footer from '../../components/footer/Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="leading-relaxed tracking-wide flex flex-col">
      <Nav />
      {children}
      <Footer />
    </div>
  );
}

export default Layout;
