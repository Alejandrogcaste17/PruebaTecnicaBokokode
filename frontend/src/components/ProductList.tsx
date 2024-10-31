// components/ProductList.tsx
"use client";

import { useEffect, useState } from 'react';
import { getProducts } from '../services/productService';
import ProductCard from './ProductCard';
import { FiFilter } from 'react-icons/fi';

const ProductList = ({ currentPage, onTotalPagesChange, resetToFirstPage }) => {
  const [products, setProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState('price');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategories, sortOrder, currentPage]);

  const fetchProducts = async () => {
    const sort = { key: sortOrder, type: "ASC" };
    const filters = {
      categories: selectedCategories.length ? selectedCategories : undefined,
      page: currentPage,
      sort: sort,
    };
    const data = await getProducts(filters);
    const filteredProducts = data.data.filter((product) => !product.featured);
    setProducts(filteredProducts.slice(0, 6));

    // Calculamos el número total de páginas y lo pasamos a page.tsx
    const totalItems = data.total;
    const itemsPerPage = 6;
    const calculatedTotalPages = Math.ceil(totalItems / itemsPerPage);
    onTotalPagesChange(calculatedTotalPages);
  };

  const handleCategoryChange = (category) => {
    const lowercaseCategory = category.toLowerCase();
    setSelectedCategories((prev) =>
      prev.includes(lowercaseCategory)
        ? prev.filter((c) => c !== lowercaseCategory)
        : [...prev, lowercaseCategory]
    );
    resetToFirstPage();
  };

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
    resetToFirstPage();
  };

  const toggleFilterPanel = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Photography / <span className="font-normal">Premium Photos</span></h1>
        <div className="flex items-center space-x-2">
          <span className="text-gray-600">Sort By</span>
          <select
            value={sortOrder}
            onChange={handleSortOrderChange}
            className="border border-gray-300 rounded px-2 py-1"
          >
            <option value="price">Price</option>
            <option value="name">Name</option>
          </select>
          {/* Botón de filtros en dispositivos móviles */}
          <button onClick={toggleFilterPanel} className="lg:hidden ml-4 text-black">
            <FiFilter size={24} />
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Panel lateral para filtros en dispositivos grandes */}
        <aside className="w-1/4 pr-8 hidden lg:block">
          <h2 className="text-lg font-bold mb-4">Category</h2>
          <div className="space-y-2">
            {['People', 'Premium', 'Pets', 'Food', 'Landmarks', 'Cities', 'Nature'].map((category) => (
              <div key={category} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category.toLowerCase())}
                  onChange={() => handleCategoryChange(category)}
                  className="mr-2"
                />
                <label className="text-gray-700">{category}</label>
              </div>
            ))}
          </div>
        </aside>

        {/* Panel de filtros en móvil */}
        {isFilterOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center lg:hidden z-50">
            <div className="bg-white p-6 w-80 h-full max-h-screen overflow-y-auto flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Filter</h2>
                <button onClick={toggleFilterPanel} className="text-xl font-semibold">&times;</button>
              </div>
              <div className="space-y-2 flex-grow">
                {['People', 'Premium', 'Pets', 'Food', 'Landmarks', 'Cities', 'Nature'].map((category) => (
                  <div key={category} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category.toLowerCase())}
                      onChange={() => handleCategoryChange(category)}
                      className="mr-2"
                    />
                    <label className="text-gray-700">{category}</label>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-6">
                <button
                  onClick={() => setSelectedCategories([])}
                  className="px-4 py-2 bg-gray-200 text-black rounded"
                >
                  CLEAR
                </button>
                <button
                  onClick={toggleFilterPanel}
                  className="px-4 py-2 bg-black text-white rounded"
                >
                  SAVE
                </button>
              </div>
            </div>
          </div>
        )}


        {/* Lista de productos */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
