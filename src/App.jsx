import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import AdminDashboard from './pages/AdminDashboard';
import AuthModal from './components/AuthModal';
import './App.css';

const AppContent = () => {
  const { isAuthModalOpen, setIsAuthModalOpen } = useAuth();
  
  return (
    <div className="min-h-screen bg-surface-secondary text-text-primary overflow-x-hidden">
      <Navbar />
      <CartDrawer />
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produto/:id" element={<ProductDetail />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <AppContent />
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
