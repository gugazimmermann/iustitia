/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from 'react-router-dom';
import { Routes } from '../../app/App';
import Header from '../../components/auth/header/Header';
import Footer from '../../components/auth/footer/Footer';
import './Auth.css';

interface AuthProps {
  children: React.ReactNode;
}

export function Auth({ children }: AuthProps) {
  return (
    <div className="body-bg min-h-screen pt-12 md:pt-20 pb-6 px-2 md:px-0">
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default Auth;
