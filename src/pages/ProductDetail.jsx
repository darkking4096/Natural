import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';
import { Loader2 } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { products, loading } = useProducts();
  const { user, setIsAuthModalOpen } = useAuth();
  
  const product = products.find(p => p.id === parseInt(id));

  const handleAddToCart = () => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    addToCart(product);
  };

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-secondary">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold text-primary-dark mb-4">Produto não encontrado</h2>
        <Link to="/" className="text-primary hover:underline">Voltar para a loja</Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 bg-surface-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8 text-sm text-text-tertiary">
          <Link to="/" className="hover:text-primary transition-colors">Início</Link>
          <span className="mx-2">/</span>
          <span className="text-text-secondary">{product.category}</span>
          <span className="mx-2">/</span>
          <span className="text-primary font-medium">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Image Gallery Placeholder */}
          <div className="relative">
            <div className="aspect-square rounded-[40px] overflow-hidden bg-white shadow-xl ring-1 ring-border">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Badges */}
            <div className="absolute top-6 left-6 flex flex-col gap-2">
              {product.benefits.map((benefit, index) => (
                <span key={index} className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold text-primary uppercase tracking-wider shadow-sm">
                  {benefit}
                </span>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <span className="text-secondary font-bold uppercase tracking-widest text-sm mb-2">
              {product.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-dark mb-6 leading-tight">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-4 mb-8">
              <span className="text-3xl font-bold text-primary">
                R$ {product.price.toFixed(2)}
              </span>
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded uppercase">
                Em Estoque
              </span>
            </div>

            <p className="text-lg text-text-secondary mb-10 leading-relaxed">
              {product.fullDescription}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button 
                onClick={handleAddToCart}
                className="flex-1 px-8 py-4 bg-primary text-white rounded-2xl font-bold text-lg hover:bg-primary-dark transition-all transform hover:scale-[1.02] shadow-lg shadow-primary/20"
              >
                Adicionar ao Carrinho
              </button>
              <button className="px-8 py-4 border-2 border-border rounded-2xl font-bold text-lg text-text-primary hover:bg-surface-tertiary transition-all">
                Favoritar
              </button>
            </div>

            {/* Features Info */}
            <div className="grid grid-cols-2 gap-6 border-t border-border pt-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                </div>
                <div>
                  <h4 className="font-bold text-sm">Origem Ética</h4>
                  <p className="text-xs text-text-tertiary">Sustentável e justo</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                </div>
                <div>
                  <h4 className="font-bold text-sm">Entrega Rápida</h4>
                  <p className="text-xs text-text-tertiary">Para todo o Brasil</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
