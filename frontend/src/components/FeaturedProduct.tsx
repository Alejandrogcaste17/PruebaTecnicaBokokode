// components/FeaturedProduct.tsx
"use client";

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getFeaturedProduct } from '../services/productService';
import { useCart } from '../components/cartContext';

const FeaturedProduct = () => {
  const [product, setProduct] = useState(null);
  const { addItemToCart  } = useCart();

  useEffect(() => {
    const fetchFeaturedProduct = async () => {
      const data = await getFeaturedProduct();
      setProduct(data); 
    };
    fetchFeaturedProduct();
  }, []);

  if (!product) return null;

  return (
    <section className="mb-16">
      {/* Cabecera con título y botón */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">{product.name}</h2>
        <button onClick={() => addItemToCart(product)} className="px-6 py-2 bg-black text-white font-semibold">ADD TO CART</button>
      </div>

      {/* Imagen principal del producto */}
      <div className="relative mb-6">
        <Image
          src={product.image.src}
          alt={product.image.alt}
          width={800}
          height={600}
          className="w-full h-auto rounded"
        />
        <p className="absolute bottom-0 left-0 bg-white text-black px-8 py-4 text-m font-bold">Photo of the day</p>
      </div>

      {/* Sección de descripción y "People also buy" */}
      <div className="flex flex-col lg:flex-row gap-8 border-b border-gray-900 mb-8">
        {/* Descripción del producto */}
        <div className="lg:w-2/3">
          <h3 className="text-xl font-bold mb-2">About the {product.name}</h3>
          <p className="text-lg font-semibold text-gray-700 mb-2">{product.category}</p>
          <p className="text-gray-600 mb-4">
            {product.description} {product.description}
          </p>
        </div>

        {/* Sección "People also buy" */}
        <div className="lg:w-1/3">
          <h4 className="text-lg font-bold mb-2 text-right">People also buy</h4>
          <div className="flex justify-between space-x-4 mb-6">
            {product.people_also_buy.map((relatedProduct) => (
              <div key={relatedProduct._id} className="flex flex-col w-full max-w-[125px]">
                <Image
                  src={relatedProduct.image.src}
                  alt={relatedProduct.image.alt}
                  width={125}
                  height={175}
                  className="w-full h-[175px] object-cover rounded"
                />
                <p className="text-sm font-medium text-gray-700 mt-2 text-left">{relatedProduct.category}</p>
                <p className="text-sm font-bold text-left">{relatedProduct.name}</p>
                <p className="text-sm text-gray-600 text-left">{relatedProduct.currency} {relatedProduct.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProduct;
