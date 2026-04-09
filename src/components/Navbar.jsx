import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { User, LogOut, Settings, LogIn, ShoppingBag } from 'lucide-react';
import AuthModal from './AuthModal';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const { cartCount, setIsCartOpen } = useCart();
  const { user, profile, isAdmin, logout, setIsAuthModalOpen } = useAuth();
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navTextColor = isScrolled || !isHome ? 'text-text-secondary' : 'text-white/90';
  const navTitleColor = isScrolled || !isHome ? 'text-primary-dark' : 'text-white';

  return (
    <>
      <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled || !isHome ? 'glass py-2' : 'bg-transparent py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className={`font-bold text-2xl tracking-tight transition-colors ${navTitleColor}`}>
                CuraNatura
              </Link>
            </div>
            
            <div className={`hidden md:flex space-x-8 ${navTextColor}`}>
              <Link to="/" className="hover:text-primary transition-colors font-medium">Início</Link>
              <a href="/#produtos" className="hover:text-primary transition-colors font-medium">Produtos</a>
              <a href="/#sobre" className="hover:text-primary transition-colors font-medium">Sobre Nós</a>
            </div>

            <div className="flex items-center space-x-6">
              {/* Login/User Button */}
              {user ? (
                <div className="relative">
                  <button 
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className={`flex items-center gap-2 group transition-colors ${navTextColor} hover:text-primary`}
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center overflow-hidden">
                      <User size={18} className="text-primary" />
                    </div>
                    <span className="hidden sm:inline text-sm font-medium truncate max-w-[100px]">
                      {profile?.email?.split('@')[0] || 'Usuário'}
                    </span>
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-border py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                      {isAdmin && (
                        <Link 
                          to="/admin" 
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-text-secondary hover:bg-surface-secondary hover:text-primary transition-colors"
                        >
                          <Settings size={16} />
                          Painel Admin
                        </Link>
                      )}
                      <button 
                        onClick={() => { logout(); setShowUserMenu(false); }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <LogOut size={16} />
                        Sair
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button 
                  onClick={() => setIsAuthModalOpen(true)}
                  className={`flex items-center gap-2 font-medium transition-colors ${navTextColor} hover:text-primary`}
                >
                  <LogIn size={20} />
                  <span className="hidden sm:inline">Entrar</span>
                </button>
              )}

              {/* Cart Button */}
              <button 
                onClick={() => setIsCartOpen(true)}
                className={`relative p-2 transition-colors ${navTextColor} hover:text-primary`}
              >
                <ShoppingBag size={24} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-secondary text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center animate-bounce shadow-md">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
