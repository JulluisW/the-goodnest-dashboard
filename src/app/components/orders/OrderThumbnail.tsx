"use client";
import { useOrders } from "@/app/hooks/useOrders";
import { OrderCard } from "./OrderCard";
import { Order } from "@/app/types/order";
import { useState } from "react";
import OrderDetailModal from "./OrderDetailModal";

type OrderThumbnailProps = {
  orders: Order[];
};

export default function OrderThumbnail({ orders }: OrderThumbnailProps) {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {orders.map((order) => (
        <OrderCard
          key={order.id}
          order={order}
          onClick={() => setSelectedOrder(order)}
        />
      ))}
      <OrderDetailModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </div>
  );
}
