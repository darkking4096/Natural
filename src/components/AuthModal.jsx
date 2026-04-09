import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Mail, Lock, User, Loader2, ArrowRight } from 'lucide-react';

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const { login, register } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(email, password);
      }
      onClose();
    } catch (err) {
      setError(err.message || 'Ocorreu um erro');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal content */}
      <div className="relative w-full max-w-md bg-surface rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 p-2 text-text-tertiary hover:text-text-primary transition-colors hover:bg-surface-tertiary rounded-full"
        >
          <X size={20} />
        </button>

        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-text-primary mb-2">
              {isLogin ? 'Bem-vindo de volta' : 'Crie sua conta'}
            </h2>
            <p className="text-text-secondary">
              {isLogin ? 'Acesse para finalizar suas compras' : 'Comece sua jornada natural hoje'}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100 animate-in slide-in-from-top-2">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-secondary px-1">E-mail</label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary group-focus-within:text-primary transition-colors" size={18} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-surface-secondary border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-text-primary"
                  placeholder="exemplo@email.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-text-secondary px-1">Senha</label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary group-focus-within:text-primary transition-colors" size={18} />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-surface-secondary border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-text-primary"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  {isLogin ? 'Entrar' : 'Cadastrar'}
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <footer className="mt-8 text-center pt-6 border-t border-border">
            <p className="text-text-secondary text-sm">
              {isLogin ? 'Ainda não tem uma conta?' : 'Já possui uma conta?'}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 text-primary font-semibold hover:underline"
              >
                {isLogin ? 'Cadastre-se' : 'Faça login'}
              </button>
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
