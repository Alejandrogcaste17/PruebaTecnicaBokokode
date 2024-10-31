// components/ProductCard.tsx
"use client";

import Image from 'next/image';
import { useCart } from '../components/cartContext';

const ProductCard = ({ product }) => {
  const { addItemToCart } = useCart();

  return (
    <div className="relative group overflow-hidden">
      {/* Distintivo de Best Seller */}
      {product.bestseller && (
        <div className="absolute top-2 left-2 bg-white text-black text-xs font-semibold px-2 py-1 z-10">
          Best Seller
        </div>
      )}

      {/* Imagen del Producto */}
      <div className="relative">
        <Image
          src={product.image.src}
          alt={product.image.alt}
          width={400}
          height={400}
          className="w-[400px] h-[400px] object-cover"
        />

        {/* Botón "Add to Cart" en Hover */}
        <div className="absolute bottom-0 left-0 w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => addItemToCart(product)} 
            className="w-full py-2 bg-black text-white font-semibold"
          >
            ADD TO CART
          </button>
        </div>
      </div>

      {/* Información del Producto */}
      <div className="mt-4 text-left">
        <p className="text-sm text-gray-500 capitalize">{product.category}</p>
        <p className="text-lg font-bold">{product.name}</p>
        <p className="text-md text-gray-700">{product.currency} {product.price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ProductCard;
