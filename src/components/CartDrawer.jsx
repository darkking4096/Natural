import { useCart } from '../context/CartContext';

const CartDrawer = () => {
  const { cart, removeFromCart, cartTotal, isCartOpen, setIsCartOpen } = useCart();

  if (!isCartOpen) return null;

  return (
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
  );
};

export default CartDrawer;
