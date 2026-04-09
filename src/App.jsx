import { useState, useEffect } from 'react';

function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll for navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const products = [
    {
      id: 1,
      name: 'Óleo Essencial de Eucalipto',
      description: 'Puro e natural, 100% orgânico para alívio respiratório.',
      price: 45.90,
      image: '/product_oil.png'
    },
    {
      id: 2,
      name: 'Chá Verde Artesanal',
      description: 'Folhas selecionadas a dedo, rico em antioxidantes.',
      price: 32.50,
      image: '/product_tea.png'
    },
    {
      id: 3,
      name: 'Matcha Cerimonial',
      description: 'Colheita da primeira safra, energia pura e foco.',
      price: 89.90,
      image: '/hero_background.png' // Using hero as fallback
    }
  ];

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen bg-surface-secondary text-text-primary overflow-x-hidden">
      {/* Navbar */}
      <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled ? 'glass py-2' : 'bg-transparent py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex-shrink-0 flex items-center">
              <span className={`font-bold text-2xl tracking-tight transition-colors ${isScrolled ? 'text-primary-dark' : 'text-white'}`}>CuraNatura</span>
            </div>
            <div className={`hidden md:flex space-x-8 ${isScrolled ? 'text-text-secondary' : 'text-white/90'}`}>
              <a href="#" className="hover:text-primary transition-colors font-medium">Início</a>
              <a href="#produtos" className="hover:text-primary transition-colors font-medium">Produtos</a>
              <a href="#sobre" className="hover:text-primary transition-colors font-medium">Sobre Nós</a>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setIsCartOpen(true)}
                className={`relative p-2 transition-colors ${isScrolled ? 'text-text-secondary hover:text-primary' : 'text-white/90 hover:text-white'}`}
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

      {/* Cart Drawer Overlay */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[100] overflow-hidden">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={() => setIsCartOpen(false)}></div>
          <div className="absolute inset-y-0 right-0 max-w-full flex">
            <div className="w-screen max-w-md">
              <div className="h-full flex flex-col bg-white shadow-xl animate-slide-in-right">
                <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                  <div className="flex items-start justify-between">
                    <h2 className="text-xl font-bold text-primary-dark">Seu Carrinho</h2>
                    <button onClick={() => setIsCartOpen(false)} className="text-text-tertiary hover:text-text-primary p-2">
                       <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>

                  <div className="mt-8">
                    {cart.length === 0 ? (
                      <div className="text-center py-12">
                         <div className="w-20 h-20 bg-surface-tertiary rounded-full flex items-center justify-center mx-auto mb-4 text-text-tertiary">
                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                         </div>
                         <p className="text-text-secondary">Seu carrinho está vazio.</p>
                         <button onClick={() => setIsCartOpen(false)} className="mt-6 text-primary font-semibold hover:underline">Continuar comprando</button>
                      </div>
                    ) : (
                      <ul className="space-y-6">
                        {cart.map((item) => (
                          <li key={item.id} className="flex py-6 border-b border-border">
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-border bg-surface-tertiary">
                              <img src={item.image} alt={item.name} className="h-full w-full object-cover object-center" />
                            </div>
                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-text-primary">
                                  <h3>{item.name}</h3>
                                  <p className="ml-4">R$ {item.price.toFixed(2)}</p>
                                </div>
                              </div>
                              <div className="flex flex-1 items-end justify-between text-sm">
                                <p className="text-text-secondary">Qtd {item.quantity}</p>
                                <button onClick={() => removeFromCart(item.id)} className="font-medium text-secondary hover:text-secondary-dark">Remover</button>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                <div className="border-t border-border py-6 px-4 sm:px-6">
                  <div className="flex justify-between text-base font-bold text-text-primary">
                    <p>Subtotal</p>
                    <p>R$ {cartTotal.toFixed(2)}</p>
                  </div>
                  <p className="mt-0.5 text-sm text-text-secondary">Frete calculado no próximo passo.</p>
                  <div className="mt-6">
                    <button className="flex w-full items-center justify-center rounded-xl bg-primary px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-primary-dark transition-colors">
                      Finalizar Compra
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-primary-dark">
        <div className="absolute inset-0 z-0">
          <img src="/hero_background.png" alt="Nature background" className="w-full h-full object-cover opacity-40 scale-105" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/30 via-transparent to-primary-dark/60"></div>
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white text-sm font-medium mb-6 animate-fade-in">
            🌿 100% Orgânico e Sustentável
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-[1.1] animate-slide-up">
            Equilíbrio e Saúde <br/> <span className="text-primary-light">Vem da Natureza.</span>
          </h1>
          <p className="mt-4 text-xl text-white/80 mx-auto mb-10 max-w-2xl animate-slide-up delay-100">
            Descubra uma linha exclusiva de produtos naturais criados para despertar o seu bem-estar mais profundo.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 animate-slide-up delay-200">
            <a href="#produtos" className="w-full sm:w-auto px-8 py-4 bg-secondary text-white rounded-xl font-bold text-lg hover:shadow-lg hover:scale-105 transition-all">
              Ver Produtos
            </a>
            <a href="#sobre" className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-xl font-bold text-lg hover:bg-white/20 transition-all">
              Nossa História
            </a>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
           <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7-7-7" /></svg>
        </div>
      </section>

      {/* Featured Products */}
      <section id="produtos" className="py-32 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 space-y-4 md:space-y-0 text-center md:text-left">
            <div>
              <h2 className="text-primary-dark text-4xl font-bold font-display">Mais Vendidos</h2>
              <p className="mt-4 text-text-secondary text-lg max-w-xl">Produtos selecionados para transformar o seu cuidado diário em um ritual de saúde.</p>
            </div>
            <a href="#" className="text-primary font-bold hover:underline flex items-center">
              Ver toda coleção <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {products.map(product => (
              <div key={product.id} className="group relative">
                <div className="relative aspect-square overflow-hidden rounded-3xl bg-surface-tertiary">
                   <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                   <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors"></div>
                   <button 
                    onClick={() => addToCart(product)}
                    className="absolute bottom-6 right-6 p-4 bg-white text-primary-dark rounded-2xl shadow-xl translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary-dark hover:text-white"
                   >
                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                   </button>
                </div>
                <div className="mt-6 flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-text-primary mb-1">{product.name}</h3>
                    <p className="text-text-secondary text-sm leading-relaxed">{product.description}</p>
                  </div>
                  <span className="text-lg font-bold text-primary-dark">R$ {product.price.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="sobre" className="py-32 bg-primary-dark text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
           <svg viewBox="0 0 500 500" className="w-full h-full"><path fill="currentColor" d="M410,250A160,160 0 1,1 90,250A160,160 0 1,1 410,250" /></svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
               <div className="relative z-10 rounded-[40px] overflow-hidden shadow-2xl skew-y-3">
                  <img src="/about_image.png" alt="Sobre CuraNatura" className="w-full" />
               </div>
               <div className="absolute -top-10 -left-10 w-40 h-40 bg-secondary/30 rounded-full blur-3xl animate-pulse"></div>
               <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary-light/30 rounded-full blur-3xl animate-pulse delay-700"></div>
            </div>
            
            <div className="text-center lg:text-left">
              <span className="text-secondary font-bold uppercase tracking-widest text-sm mb-4 block">Nossa Cura</span>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">Acreditamos na pureza da terra.</h2>
              <div className="space-y-6 text-white/80 text-lg leading-relaxed">
                 <p>Nascemos do desejo de reconectar as pessoas com a sabedoria ancestral da natureza. Cada produto que selecionamos passa por um rigoroso processo de curadoria ética.</p>
                 <p>Não somos apenas uma loja, somos uma ponte para um estilo de vida mais consciente, saudável e harmonioso com o planeta.</p>
              </div>
              
              <div className="grid grid-cols-2 gap-8 mt-12">
                 <div>
                    <h4 className="text-secondary text-3xl font-bold mb-1">5k+</h4>
                    <p className="text-sm text-white/60">Clientes Felizes</p>
                 </div>
                 <div>
                    <h4 className="text-secondary text-3xl font-bold mb-1">100%</h4>
                    <p className="text-sm text-white/60">Orgânico Certificado</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface py-20 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              <div className="col-span-1 md:col-span-1">
                 <span className="text-2xl font-bold text-primary-dark tracking-tight">CuraNatura</span>
                 <p className="mt-6 text-text-secondary leading-relaxed">Sua escolha consciente para saúde e bem-estar natural.</p>
                 <div className="flex space-x-4 mt-6 text-text-tertiary">
                    {/* Placeholder Icons */}
                    <div className="w-10 h-10 rounded-full bg-surface-tertiary flex items-center justify-center hover:bg-primary-dark hover:text-white transition-all cursor-pointer">
                       <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12s.014 3.667.072 4.947c.2 4.353 2.615 6.768 6.967 6.968 1.28.058 1.688.072 4.947.072s3.667-.014 4.947-.072c4.351-.2 6.785-2.615 6.968-6.967.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.2-4.353-2.615-6.77-6.968-6.968C15.667.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                    </div>
                 </div>
              </div>
              
              <div>
                 <h4 className="font-bold text-text-primary mb-6">Loja</h4>
                 <ul className="space-y-4 text-text-secondary">
                    <li><a href="#produtos" className="hover:text-primary transition-colors">Óleos Essenciais</a></li>
                    <li><a href="#produtos" className="hover:text-primary transition-colors">Chás Orgânicos</a></li>
                    <li><a href="#produtos" className="hover:text-primary transition-colors">Cosméticos</a></li>
                 </ul>
              </div>

              <div>
                 <h4 className="font-bold text-text-primary mb-6">Institucional</h4>
                 <ul className="space-y-4 text-text-secondary">
                    <li><a href="#sobre" className="hover:text-primary transition-colors">Quem Somos</a></li>
                    <li><a href="#" className="hover:text-primary transition-colors">Termos de Uso</a></li>
                    <li><a href="#" className="hover:text-primary transition-colors">Políticas</a></li>
                 </ul>
              </div>

              <div>
                 <h4 className="font-bold text-text-primary mb-6">Ajuda</h4>
                 <ul className="space-y-4 text-text-secondary">
                    <li><a href="#" className="hover:text-primary transition-colors">Suporte</a></li>
                    <li><a href="#" className="hover:text-primary transition-colors">Envios e Prazos</a></li>
                    <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
                 </ul>
              </div>
           </div>
           
           <div className="mt-20 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center text-sm text-text-tertiary">
              <p>© 2026 CuraNatura. Todos os direitos reservados.</p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                 <img src="https://img.shields.io/badge/VISA-%230E4595.svg?style=for-the-badge&logo=visa&logoColor=white" className="h-4" />
                 <img src="https://img.shields.io/badge/mastercard-%23EB001B.svg?style=for-the-badge&logo=mastercard&logoColor=white" className="h-4" />
              </div>
           </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

