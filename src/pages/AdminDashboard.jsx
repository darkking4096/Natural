import React, { useState, useRef } from 'react';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { Plus, Edit2, Trash2, X, Upload, Link as LinkIcon, Save, Loader2, Package, Check } from 'lucide-react';

const AdminDashboard = () => {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const { products, addProduct, updateProduct, deleteProduct, loading: productsLoading } = useProducts();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    fullDescription: '',
    price: '',
    category: '',
    image: '',
    benefits: ''
  });
  
  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef(null);

  if (authLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-primary" size={40} /></div>;
  if (!user || !isAdmin) return <Navigate to="/" />;

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      description: '',
      fullDescription: '',
      price: '',
      category: '',
      image: '',
      benefits: ''
    });
    setImageFile(null);
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      fullDescription: product.fullDescription,
      price: product.price.toString(),
      category: product.category,
      image: product.image,
      benefits: Array.isArray(product.benefits) ? product.benefits.join(', ') : ''
    });
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const data = {
        ...formData,
        price: parseFloat(formData.price),
        benefits: formData.benefits.split(',').map(b => b.trim()).filter(b => b !== '')
      };

      if (editingProduct) {
        await updateProduct(editingProduct.id, data, imageFile);
        showSuccess('Produto atualizado com sucesso!');
      } else {
        await addProduct(data, imageFile);
        showSuccess('Produto adicionado com sucesso!');
      }
      setIsModalOpen(false);
    } catch (err) {
      alert('Erro ao salvar produto: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      try {
        await deleteProduct(id);
        showSuccess('Produto excluído com sucesso!');
      } catch (err) {
        alert('Erro ao excluir produto: ' + err.message);
      }
    }
  };

  const showSuccess = (msg) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <div className="pt-24 pb-20 bg-surface-secondary min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-primary-dark">Painel Administrativo</h1>
            <p className="text-text-secondary mt-1">Gerencie seu inventário e produtos da loja.</p>
          </div>
          <button 
            onClick={openAddModal}
            className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl flex items-center gap-2 font-semibold shadow-lg shadow-primary/20 transition-all hover:-translate-y-1"
          >
            <Plus size={20} />
            Novo Produto
          </button>
        </div>

        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 text-green-600 rounded-xl border border-green-100 flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
            <Check size={20} />
            {successMessage}
          </div>
        )}

        {/* Dashboard Content */}
        {productsLoading ? (
            <div className="flex justify-center py-20"><Loader2 className="animate-spin text-primary" size={40} /></div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {products.length === 0 ? (
              <div className="bg-white rounded-2xl p-20 text-center border border-dashed border-border">
                <Package size={60} className="mx-auto text-text-tertiary mb-4 opacity-20" />
                <h3 className="text-xl font-semibold text-text-secondary">Nenhum produto cadastrado</h3>
                <p className="text-text-tertiary mt-2">Comece adicionando seu primeiro produto clicando no botão acima.</p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-surface-tertiary border-b border-border">
                    <tr>
                      <th className="px-6 py-4 text-sm font-semibold text-text-primary">Imagem</th>
                      <th className="px-6 py-4 text-sm font-semibold text-text-primary">Nome</th>
                      <th className="px-6 py-4 text-sm font-semibold text-text-primary">Categoria</th>
                      <th className="px-6 py-4 text-sm font-semibold text-text-primary">Preço</th>
                      <th className="px-6 py-4 text-sm font-semibold text-text-primary text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {products.map((product) => (
                      <tr key={product.id} className="hover:bg-surface-secondary transition-colors group">
                        <td className="px-6 py-4">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-12 h-12 object-cover rounded-lg border border-border" 
                          />
                        </td>
                        <td className="px-6 py-4 font-medium text-text-primary">{product.name}</td>
                        <td className="px-6 py-4 text-text-secondary">
                          <span className="bg-primary/10 text-primary text-xs font-semibold px-2 py-1 rounded-full uppercase tracking-wider">
                            {product.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-semibold text-text-primary">R$ {product.price.toFixed(2)}</td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                              onClick={() => openEditModal(product)}
                              className="p-2 text-text-secondary hover:text-primary transition-colors bg-white border border-border rounded-lg shadow-sm"
                            >
                              <Edit2 size={18} />
                            </button>
                            <button 
                              onClick={() => handleDelete(product.id)}
                              className="p-2 text-text-secondary hover:text-red-500 transition-colors bg-white border border-border rounded-lg shadow-sm"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

      </div>

      {/* Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => !isSubmitting && setIsModalOpen(false)} />
          
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in duration-300">
            <header className="p-6 border-b border-border flex justify-between items-center">
              <h2 className="text-xl font-bold text-primary-dark">
                {editingProduct ? 'Editar Produto' : 'Novo Produto'}
              </h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-text-tertiary hover:text-text-primary transition-all rounded-full hover:bg-surface-tertiary"
              >
                <X size={20} />
              </button>
            </header>

            <form onSubmit={handleSubmit} className="p-8 max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Basic Info */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-text-secondary mb-1">Nome do Produto</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 bg-surface-secondary border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                      placeholder="Ex: Óleo de Lavanda"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-text-secondary mb-1">Preço (R$)</label>
                    <input 
                      type="number" 
                      step="0.01"
                      required
                      value={formData.price}
                      onChange={e => setFormData({...formData, price: e.target.value})}
                      className="w-full px-4 py-3 bg-surface-secondary border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                      placeholder="45.90"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-text-secondary mb-1">Categoria</label>
                    <input 
                      type="text" 
                      required
                      value={formData.category}
                      onChange={e => setFormData({...formData, category: e.target.value})}
                      className="w-full px-4 py-3 bg-surface-secondary border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                      placeholder="Ex: Óleos Essenciais"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-4">
                   <div>
                    <label className="block text-sm font-semibold text-text-secondary mb-1">Descrição Curta</label>
                    <textarea 
                      required
                      rows="2"
                      value={formData.description}
                      onChange={e => setFormData({...formData, description: e.target.value})}
                      className="w-full px-4 py-3 bg-surface-secondary border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                      placeholder="Uma frase marcante..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-text-secondary mb-1">Descrição Completa</label>
                    <textarea 
                      required
                      rows="4"
                      value={formData.fullDescription}
                      onChange={e => setFormData({...formData, fullDescription: e.target.value})}
                      className="w-full px-4 py-3 bg-surface-secondary border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                      placeholder="Detalhes sobre benefícios, uso e origem..."
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                 <div>
                    <label className="block text-sm font-semibold text-text-secondary mb-1">Benefícios (separados por vírgula)</label>
                    <input 
                      type="text" 
                      value={formData.benefits}
                      onChange={e => setFormData({...formData, benefits: e.target.value})}
                      className="w-full px-4 py-3 bg-surface-secondary border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                      placeholder="Ex: 100% Puro, Orgânico, Energizante"
                    />
                  </div>

                  {/* Image Options */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-surface-tertiary rounded-2xl">
                    <div>
                      <label className="block text-sm font-semibold text-text-secondary mb-2 flex items-center gap-2">
                        <Upload size={16} /> Upload de Arquivo
                      </label>
                      <input 
                        type="file" 
                        ref={fileInputRef}
                        accept="image/*"
                        onChange={e => setImageFile(e.target.files[0])}
                        className="hidden"
                      />
                      <button 
                        type="button"
                        onClick={() => fileInputRef.current.click()}
                        className="w-full p-4 border-2 border-dashed border-border rounded-xl text-text-tertiary hover:border-primary hover:bg-white transition-all flex flex-col items-center gap-1"
                      >
                         <Upload size={24} />
                         <span className="text-xs font-medium">
                           {imageFile ? imageFile.name : 'Selecionar imagem do PC'}
                         </span>
                      </button>
                    </div>

                    <div className="relative">
                      <label className="block text-sm font-semibold text-text-secondary mb-2 flex items-center gap-2">
                         <LinkIcon size={16} /> Link Externo
                      </label>
                      <input 
                        type="text" 
                        value={formData.image}
                        onChange={e => setFormData({...formData, image: e.target.value})}
                        className="w-full px-4 py-3 bg-white border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                        placeholder="https://exemplo.com/imagem.png"
                      />
                      <p className="text-[10px] text-text-tertiary mt-2">Dica: Se você subir um arquivo, ele terá prioridade sobre o link.</p>
                    </div>
                  </div>
              </div>

              <footer className="mt-10 pt-6 border-t border-border flex justify-end gap-3">
                 <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-3 text-text-secondary font-semibold hover:bg-surface-secondary rounded-xl transition-all"
                 >
                   Cancelar
                 </button>
                 <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl shadow-lg shadow-primary/20 flex items-center gap-2 transition-all disabled:opacity-70"
                 >
                   {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                   {editingProduct ? 'Salvar Alterações' : 'Criar Produto'}
                 </button>
              </footer>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
