import { NewProduct, Product } from "@/app/types/product";

const BASE_URL = "/api/products";

export const getProducts = async (): Promise<Product[]> => {
  const res = await fetch(BASE_URL);
  return res.json();
};

export const getProductById = async (id: string): Promise<Product> => {
  const res = await fetch(`${BASE_URL}/${id}`);
  return res.json();
};

export const createProduct = async (product: NewProduct): Promise<Product> => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  return res.json();
};

export const updateProduct = async (
  id: string,
  product: Product
): Promise<{ success: boolean }> => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  return res.json();
};

export const deleteProduct = async (
  id: string
): Promise<{ success: boolean }> => {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  return res.json();
};
