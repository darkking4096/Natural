import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="group relative">
      <div className="relative aspect-square overflow-hidden rounded-3xl bg-surface-tertiary">
        <Link to={`/produto/${product.id}`}>
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
          />
        </Link>
        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors pointer-events-none"></div>
        <button 
          onClick={() => addToCart(product)}
          className="absolute bottom-6 right-6 p-4 bg-white text-primary-dark rounded-2xl shadow-xl translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary-dark hover:text-white z-10"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
      </div>
      <div className="mt-6 flex justify-between items-start">
        <Link to={`/produto/${product.id}`} className="block flex-1">
          <h3 className="text-xl font-bold text-text-primary mb-1 hover:text-primary transition-colors">{product.name}</h3>
          <p className="text-text-secondary text-sm leading-relaxed line-clamp-2">{product.description}</p>
        </Link>
        <span className="text-lg font-bold text-primary-dark ml-4">R$ {product.price.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default ProductCard;
