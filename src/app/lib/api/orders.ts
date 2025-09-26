import { NewOrder, Order } from "@/app/types/order";

const BASE_URL = "/api/orders";

export const getOrders = async (): Promise<Order[]> => {
  const res = await fetch(BASE_URL);
  return res.json();
};

export const getOrderById = async (id: string): Promise<Order> => {
  const res = await fetch(`${BASE_URL}/${id}`);
  return res.json();
};

export const createOrder = async (order: NewOrder): Promise<Order> => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });
  return res.json();
};

export const updateOrder = async (
  id: string,
  order: Order
): Promise<{ success: boolean }> => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });
  return res.json();
};

export const deleteOrder = async (
  id: string
): Promise<{ success: boolean }> => {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  return res.json();
};
