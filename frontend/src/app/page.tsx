// app/page.tsx
"use client";


import { useState } from 'react';
import FeaturedProduct from '../components/FeaturedProduct';
import ProductList from '../components/ProductList';
import Pagination from '../components/Pagination';
import Header from '../components/Header';
import { CartProvider } from '../components/cartContext';

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState(1); // Estado para la página actual
  const [totalPages, setTotalPages] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleTotalPagesChange = (pages) => {
    setTotalPages(pages); 
  };

  const resetToFirstPage = () => {
    setCurrentPage(1);
  };

  return (
    <CartProvider>

      <div>
        {/* Encabezado */}
        <Header />

        {/* Seccion del producto destacado */}
        <FeaturedProduct />

        {/* Seccion del listado de productos */}
        <ProductList 
          currentPage={currentPage } 
          onTotalPagesChange={handleTotalPagesChange}
          resetToFirstPage={resetToFirstPage}
        />
        
        {/* Paginación */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div> 
    
    </CartProvider>
  );
}

