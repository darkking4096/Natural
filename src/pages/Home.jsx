import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const Home = () => {
  return (
    <div className="bg-surface-secondary">
      <Hero />

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
              <ProductCard key={product.id} product={product} />
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
    </div>
  );
};

export default Home;
