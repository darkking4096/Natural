const Hero = () => {
  return (
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
          <a href="#produtos" className="w-full sm:w-auto px-8 py-4 bg-secondary text-white rounded-xl font-bold text-lg hover:shadow-lg hover:scale-105 transition-all text-center">
            Ver Produtos
          </a>
          <a href="#sobre" className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-xl font-bold text-lg hover:bg-white/20 transition-all text-center">
            Nossa História
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
         <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7-7-7" /></svg>
      </div>
    </section>
  );
};

export default Hero;
