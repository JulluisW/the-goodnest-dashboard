"use client";

import { useProducts } from "@/app/hooks/useProducts";
import ProductCard from "../../components/products/ProductCard";
import AddProductForm from "@/app/components/products/AddProductForm";
import EditProductModal from "@/app/components/products/EditProductModal";
import { useState } from "react";
import { Product } from "@/app/types/product";
import { toast } from "sonner";
import AdvancedFilter from "@/app/components/products/AdvancedFilter";

import { AnimatePresence, motion } from "framer-motion";

export default function ProductList() {
  const {
    products,
    productLoading,
    addProduct,
    refetch,
    removeProduct,
    editProduct,
  } = useProducts();

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);

  const [showFilters, setShowFilters] = useState(false);

  const [sortOption, setSortOption] = useState("");

  //PAGINATION

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;
  const [direction, setDirection] = useState<"next" | "prev">("next");

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
  };

  const handleSaveEdit = async (updatedProduct: Product) => {
    try {
      await editProduct(updatedProduct.id, updatedProduct);
      setEditingProduct(null);
      await refetch();
      toast.success("Product updated successfully!");
    } catch (error) {
      toast.error("Failed to update product.");

      console.error("Failed to update product:", error);
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory
      ? product.category.toLowerCase() === selectedCategory.toLowerCase()
      : true;

    const priceCheck =
      product.price >= minPrice &&
      (maxPrice === undefined || product.price <= maxPrice);

    return matchesSearch && matchesCategory && priceCheck;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "priceAsc") return a.price - b.price;
    if (sortOption === "priceDesc") return b.price - a.price;
    if (sortOption === "nameAsc") return a.name.localeCompare(b.name);
    if (sortOption === "nameDesc") return b.name.localeCompare(a.name);
    return 0;
  });

  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  if (productLoading) return <div>Loading...</div>;

  return (
    <div className="grid">
      {/* <AddProductForm onAddProduct={addProduct} refetch={refetch} /> */}

      <div className="mt-6 flex gap-2">
        <button
          onClick={() => setShowFilters((prev) => !prev)}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium px-6 py-2 rounded-full shadow-md transition-all duration-300"
        >
          {showFilters ? "Hide Filters" : "Show Filters"}
          <span className="text-xl">{showFilters ? "▲" : "▼"}</span>
        </button>

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="border p-2 rounded bg-white shadow-sm"
        >
          <option value="">Sort by</option>
          <option value="priceAsc">Price: Low to High</option>
          <option value="priceDesc">Price: High to Low</option>
          <option value="nameAsc">Name: A-Z</option>
          <option value="nameDesc">Name: Z-A</option>
        </select>
      </div>
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          showFilters
            ? "max-h-screen opacity-100 scale-100 mt-6"
            : "max-h-0 opacity-0 scale-95"
        }`}
      >
        <AdvancedFilter
          minPrice={minPrice}
          maxPrice={maxPrice}
          onMinChange={setMinPrice}
          onMaxChange={setMaxPrice}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ x: direction === "next" ? 1500 : -1500, opacity: 1 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: direction === "next" ? -1500 : 1500, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"
        >
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"> */}
          {currentProducts.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onEditClick={handleEditClick}
              onDelete={removeProduct}
            />
          ))}
          {/* </div> */}
        </motion.div>
      </AnimatePresence>

      {editingProduct && (
        <EditProductModal
          product={editingProduct}
          onSave={handleSaveEdit}
          onClose={() => setEditingProduct(null)}
        />
      )}

      <div className="flex justify-center items-center mt-6 gap-2">
        <button
          onClick={async () => {
            await setDirection("prev");
            setCurrentPage((p) => Math.max(p - 1, 1));
          }}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => setCurrentPage(num)}
            className={`px-3 py-1 rounded ${
              num === currentPage
                ? "bg-blue-600 text-white"
                : "bg-gray-100 hover:bg-gray-300"
            }`}
          >
            {num}
          </button>
        ))}

        <button
          onClick={async () => {
            await setDirection("next");
            setCurrentPage((p) => Math.min(p + 1, totalPages));
          }}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
