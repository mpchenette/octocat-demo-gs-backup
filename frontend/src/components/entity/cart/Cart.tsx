import { useCart } from '../../../context/CartContext';
import { useTheme } from '../../../context/ThemeContext';

export default function Cart() {
  const { items, updateQuantity, removeFromCart, getTotalItems, getTotalPrice, clearCart } = useCart();
  const { darkMode } = useTheme();

  const handleQuantityChange = (productId: number, change: number) => {
    const item = items.find(item => item.productId === productId);
    if (item) {
      const newQuantity = item.quantity + change;
      if (newQuantity <= 0) {
        removeFromCart(productId);
      } else {
        updateQuantity(productId, newQuantity);
      }
    }
  };

  if (items.length === 0) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-dark' : 'bg-gray-100'} pt-20 pb-16 px-4 transition-colors duration-300`}>
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center justify-center h-64 space-y-4">
            <h1 className={`text-3xl font-bold ${darkMode ? 'text-light' : 'text-gray-800'} transition-colors duration-300`}>Your Cart</h1>
            <div className={`text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'} transition-colors duration-300`}>
              <p className="text-lg mb-4">Your cart is empty</p>
              <p>Add some smart cat products to get started!</p>
            </div>
            <a 
              href="/products" 
              className="bg-primary hover:bg-accent text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Browse Products
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-dark' : 'bg-gray-100'} pt-20 pb-16 px-4 transition-colors duration-300`}>
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col space-y-6">
          <div className="flex items-center justify-between">
            <h1 className={`text-3xl font-bold ${darkMode ? 'text-light' : 'text-gray-800'} transition-colors duration-300`}>
              Your Cart ({getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'})
            </h1>
            <button
              onClick={clearCart}
              className={`text-sm ${darkMode ? 'text-gray-400 hover:text-light' : 'text-gray-600 hover:text-gray-800'} transition-colors`}
            >
              Clear Cart
            </button>
          </div>

          <div className="space-y-4">
            {items.map(item => {
              const itemPrice = item.discount ? item.price * (1 - item.discount) : item.price;
              const totalItemPrice = itemPrice * item.quantity;
              
              return (
                <div 
                  key={item.productId} 
                  className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 shadow-lg transition-colors duration-300`}
                >
                  <div className="flex items-center space-x-6">
                    <div className="flex-shrink-0">
                      <img 
                        src={`/${item.imgName}`} 
                        alt={item.name}
                        className="w-20 h-20 object-contain rounded-lg"
                      />
                    </div>
                    
                    <div className="flex-grow">
                      <h3 className={`text-lg font-semibold ${darkMode ? 'text-light' : 'text-gray-800'} mb-1 transition-colors duration-300`}>
                        {item.name}
                      </h3>
                      <div className="flex items-center space-x-2">
                        {item.discount ? (
                          <>
                            <span className="text-gray-500 line-through text-sm">${item.price.toFixed(2)}</span>
                            <span className="text-primary font-medium">${itemPrice.toFixed(2)}</span>
                            <span className="bg-primary text-white text-xs px-2 py-1 rounded">
                              {Math.round(item.discount * 100)}% OFF
                            </span>
                          </>
                        ) : (
                          <span className="text-primary font-medium">${itemPrice.toFixed(2)}</span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className={`flex items-center space-x-3 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-lg p-2 transition-colors duration-300`}>
                        <button 
                          onClick={() => handleQuantityChange(item.productId, -1)}
                          className={`w-8 h-8 flex items-center justify-center ${darkMode ? 'text-light' : 'text-gray-700'} hover:text-primary transition-colors duration-300`}
                          aria-label={`Decrease quantity of ${item.name}`}
                        >
                          -
                        </button>
                        <span 
                          className={`${darkMode ? 'text-light' : 'text-gray-800'} min-w-[2rem] text-center font-medium transition-colors duration-300`}
                          aria-label={`Quantity of ${item.name}`}
                        >
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => handleQuantityChange(item.productId, 1)}
                          className={`w-8 h-8 flex items-center justify-center ${darkMode ? 'text-light' : 'text-gray-700'} hover:text-primary transition-colors duration-300`}
                          aria-label={`Increase quantity of ${item.name}`}
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right">
                        <div className={`text-lg font-bold ${darkMode ? 'text-light' : 'text-gray-800'} transition-colors duration-300`}>
                          ${totalItemPrice.toFixed(2)}
                        </div>
                        <button
                          onClick={() => removeFromCart(item.productId)}
                          className={`text-sm ${darkMode ? 'text-gray-400 hover:text-red-400' : 'text-gray-600 hover:text-red-600'} transition-colors`}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Cart Summary */}
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 shadow-lg transition-colors duration-300`}>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className={`text-lg font-medium ${darkMode ? 'text-light' : 'text-gray-800'} transition-colors duration-300`}>
                  Total ({getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'})
                </span>
                <span className={`text-2xl font-bold text-primary`}>
                  ${getTotalPrice().toFixed(2)}
                </span>
              </div>
              
              <div className="flex space-x-4">
                <a 
                  href="/products" 
                  className={`flex-1 ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-light' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'} py-3 px-6 rounded-lg font-medium text-center transition-colors`}
                >
                  Continue Shopping
                </a>
                <button className="flex-1 bg-primary hover:bg-accent text-white py-3 px-6 rounded-lg font-medium transition-colors">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}