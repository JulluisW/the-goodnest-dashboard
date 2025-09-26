export type Product = {
  id: string;
  pid: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
};

export type NewProduct = Omit<Product, "id">;
