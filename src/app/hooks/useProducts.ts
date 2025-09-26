import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/app/lib/api/products";
import { useCollection } from "./useCollection";
import { Product, NewProduct } from "@/app/types/product";

export const useProducts = () => {
  const {
    items: products,
    loading: productLoading,
    createItem,
    updateItem,
    deleteItem,
    refetch,
  } = useCollection<Product, NewProduct>(
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
  );

  return {
    products,
    productLoading,
    addProduct: createItem,
    editProduct: updateItem,
    removeProduct: deleteItem,
    refetch,
  };
};
