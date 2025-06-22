
import React, { useContext, useState } from 'react';
import { CartContext } from '../../contexts/CartContext';
import { AuthContext } from '../../contexts/AuthContext';
import Button from '../ui/Button';
import { sendTelegramCartOrderNotification } from '../../services/telegramService';
import { TrashIcon } from '../icons/TrashIcon'; // Assuming you'll create this

interface CartModalProps {
  onClose: () => void;
  onLoginRedirect: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ onClose, onLoginRedirect }) => {
  const cartContext = useContext(CartContext);
  const authContext = useContext(AuthContext);
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);

  if (!cartContext || !authContext) return null;

  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart, loading: cartLoading } = cartContext;
  const { currentUser, loading: authLoading } = authContext;

  const handlePlaceOrder = async () => {
    if (!currentUser) {
      alert('Please login to place an order.');
      onClose();
      onLoginRedirect();
      return;
    }

    if (cartItems.length === 0) {
      alert('Your cart is empty.');
      return;
    }

    setIsProcessingOrder(true);
    try {
      // Simulate backend order processing
      console.log('Placing order for user:', currentUser.email, 'with items:', cartItems);
      // Store "order" in localStorage (simulated)
      const orders = JSON.parse(localStorage.getItem('floraModernOrders') || '[]');
      const newOrder = {
        orderId: Date.now().toString(),
        userId: currentUser.id,
        userEmail: currentUser.email,
        items: cartItems,
        total: getCartTotal(),
        date: new Date().toISOString(),
      };
      orders.push(newOrder);
      localStorage.setItem('floraModernOrders', JSON.stringify(orders));

      await sendTelegramCartOrderNotification(cartItems, currentUser);
      alert('Order placed successfully! A notification has been sent to the manager.');
      clearCart();
      onClose();
    } catch (error) {
      console.error('Failed to place order or send notification:', error);
      alert('There was an issue placing your order. Please try again or contact support.');
    } finally {
      setIsProcessingOrder(false);
    }
  };
  
  const isLoading = cartLoading || authLoading || isProcessingOrder;

  return (
    <div className="modal-overlay animate-fade-in" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="cart-modal-title">
      <div className="modal-content w-full max-w-lg animate-slide-in-up" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 id="cart-modal-title" className="text-2xl font-playfair font-bold text-brand-primary">Your Cart</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700" aria-label="Close cart modal">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {cartItems.length === 0 ? (
          <p className="text-brand-text-light text-center py-8">Your cart is empty.</p>
        ) : (
          <>
            <div className="max-h-[60vh] overflow-y-auto pr-2 mb-6">
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center justify-between py-4 border-b border-gray-200">
                  <div className="flex items-center">
                    <img src={item.imageUrl} alt={item.name} className="w-16 h-20 object-cover rounded mr-4"/>
                    <div>
                      <h3 className="font-semibold text-brand-text">{item.name}</h3>
                      <p className="text-sm text-brand-text-light">${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                      className="w-16 text-center border border-gray-300 rounded-md px-2 py-1 mx-2"
                      aria-label={`Quantity for ${item.name}`}
                    />
                    <p className="w-20 text-right font-semibold text-brand-text">${(item.price * item.quantity).toFixed(2)}</p>
                    <button onClick={() => removeFromCart(item.id)} className="ml-4 text-red-500 hover:text-red-700" aria-label={`Remove ${item.name} from cart`}>
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="py-4 border-t border-gray-300">
              <div className="flex justify-between items-center mb-4">
                <p className="text-xl font-semibold text-brand-text">Total:</p>
                <p className="text-xl font-playfair font-bold text-brand-primary">${getCartTotal().toFixed(2)}</p>
              </div>
              <Button
                variant="primary"
                className="w-full"
                onClick={handlePlaceOrder}
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : 'Place Order'}
              </Button>
               {!currentUser && (
                <p className="text-sm text-center mt-3 text-brand-text-light">
                  You'll need to <button onClick={() => { onClose(); onLoginRedirect(); }} className="text-brand-primary hover:underline">Login</button> to place an order.
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartModal;
