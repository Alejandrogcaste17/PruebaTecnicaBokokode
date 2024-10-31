// components/Header.tsx
"use client";

import Image from 'next/image';
import { FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../components/cartContext';

const Header = () => {
  const { cartItems, clearCart, showCart, toggleCartVisibility } = useCart(); // Obtiene `showCart` y `toggleCartVisibility` del contexto

  return (
    <header className="flex justify-between items-center py-4 px-6 border-b border-gray-900 mb-8">
      {/* Logo de Bejamas */}
      <div className="flex items-center">
        <Image
          src="/Bejamas.jpg" // Ruta de la imagen
          alt="Bejamas Logo"
          width={100} 
          height={24} 
          className="mr-2"
        />
      </div>

      {/* Carrito de compras */}
      <div className="relative">
        <button onClick={toggleCartVisibility} className="text-black">
          <FiShoppingCart size={24} />
          {cartItems.length > 0 && (
            <span className="absolute top-0 right-0 bg-black text-white rounded-full px-2 py-1 text-xs">
              {cartItems.length}
            </span>
          )}
        </button>

        {showCart && (
          <div className="fixed right-16 top-16 z-50 w-80 sm:w-96 bg-white border rounded-lg shadow-lg p-4 max-w-xs md:max-w-md lg:max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Shopping Cart</h2>
              <button onClick={toggleCartVisibility} className="text-xl font-semibold">&times;</button>
            </div>

            {cartItems.length === 0 ? (
              <p className="text-gray-500">Your cart is empty.</p>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <Image src={item.image.src} alt={item.image.alt} width={60} height={60} className="rounded" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold">{item.name}</p>
                      <p className="text-gray-500">${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
                <button
                  onClick={clearCart}
                  className="w-full mt-4 px-4 py-2 bg-black text-white font-semibold rounded hover:bg-gray-800 transition duration-150"
                >
                  CLEAR
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
