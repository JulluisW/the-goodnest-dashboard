import {
  getOrders,
  createOrder,
  updateOrder,
  deleteOrder,
} from "@/app/lib/api/orders";
import { useCollection } from "./useCollection";
import { Order, NewOrder } from "@/app/types/order";

export const useOrders = () => {
  const {
    items: orders,
    loading,
    createItem,
    updateItem,
    deleteItem,
    refetch,
  } = useCollection<Order, NewOrder>(
    getOrders,
    createOrder,
    updateOrder,
    deleteOrder
  );

  return {
    orders,
    loading,
    addProduct: createItem,
    editProduct: updateItem,
    removeProduct: deleteItem,
    refetch,
  };
};
