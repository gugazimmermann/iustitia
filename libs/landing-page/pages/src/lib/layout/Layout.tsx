import "./Layout.css";
import { Nav, Footer } from "@iustitia/landing-page/components";

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
