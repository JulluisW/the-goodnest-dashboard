export type OrderStatus = "pending" | "paid" | "cancelled";

export type OrderItem = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  subtotal: number;
};

export type Order = {
  id: string;
  customerName: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  customerId?: string;
  customerInfo?: {
    name?: string;
    phone?: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type NewOrder = {
  customerName: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
  customerId?: string;
  customerInfo?: {
    name?: string;
    phone?: string;
  };
};
