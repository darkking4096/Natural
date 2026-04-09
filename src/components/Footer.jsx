import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-surface py-20 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="text-2xl font-bold text-primary-dark tracking-tight">CuraNatura</Link>
            <p className="mt-6 text-text-secondary leading-relaxed">Sua escolha consciente para saúde e bem-estar natural.</p>
            <div className="flex space-x-4 mt-6 text-text-tertiary">
              <div className="w-10 h-10 rounded-full bg-surface-tertiary flex items-center justify-center hover:bg-primary-dark hover:text-white transition-all cursor-pointer">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12s.014 3.667.072 4.947c.2 4.353 2.615 6.768 6.967 6.968 1.28.058 1.688.072 4.947.072s3.667-.014 4.947-.072c4.351-.2 6.785-2.615 6.968-6.967.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.2-4.353-2.615-6.77-6.968-6.968C15.667.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-text-primary mb-6">Loja</h4>
            <ul className="space-y-4 text-text-secondary">
              <li><a href="/#produtos" className="hover:text-primary transition-colors">Óleos Essenciais</a></li>
              <li><a href="/#produtos" className="hover:text-primary transition-colors">Chás Orgânicos</a></li>
              <li><a href="/#produtos" className="hover:text-primary transition-colors">Cosméticos</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-text-primary mb-6">Institucional</h4>
            <ul className="space-y-4 text-text-secondary">
              <li><a href="/#sobre" className="hover:text-primary transition-colors">Quem Somos</a></li>
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
            <img src="https://img.shields.io/badge/VISA-%230E4595.svg?style=for-the-badge&logo=visa&logoColor=white" className="h-4" alt="Visa" />
            <img src="https://img.shields.io/badge/mastercard-%23EB001B.svg?style=for-the-badge&logo=mastercard&logoColor=white" className="h-4" alt="Mastercard" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
