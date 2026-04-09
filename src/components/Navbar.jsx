import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { cartCount, setIsCartOpen } = useCart();
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled || !isHome ? 'glass py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className={`font-bold text-2xl tracking-tight transition-colors ${isScrolled || !isHome ? 'text-primary-dark' : 'text-white'}`}>
              CuraNatura
            </Link>
          </div>
          <div className={`hidden md:flex space-x-8 ${isScrolled || !isHome ? 'text-text-secondary' : 'text-white/90'}`}>
            <Link to="/" className="hover:text-primary transition-colors font-medium">Início</Link>
            <a href="/#produtos" className="hover:text-primary transition-colors font-medium">Produtos</a>
            <a href="/#sobre" className="hover:text-primary transition-colors font-medium">Sobre Nós</a>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsCartOpen(true)}
              className={`relative p-2 transition-colors ${isScrolled || !isHome ? 'text-text-secondary hover:text-primary' : 'text-white/90 hover:text-white'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-secondary text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center animate-bounce shadow-md">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
