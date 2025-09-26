"use client";

import { Order } from "@/app/types/order";
import { motion } from "framer-motion";
import { Badge } from "../ui/Badge";
import { useState } from "react";
import OrderDetailModal from "./OrderDetailModal";
import { format } from "date-fns";

type OrderTableProps = {
  orders: Order[];
};

export default function OrderTable({ orders }: OrderTableProps) {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const getStatusVariant = (status: Order["status"]) => {
    switch (status) {
      case "paid":
        return "jungle";
      case "pending":
        return "outline";
      case "cancelled":
        return "danger";
      default:
        return "default";
    }
  };

  return (
    // <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
    //   <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
    //     📦 Recent Orders
    //   </h2>

    <div className="overflow-x-auto dark:bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
      <table className="min-w-full text-sm text-left">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
            <th className="px-4 py-2">Customer</th>
            <th className="px-4 py-2">Items</th>
            <th className="px-4 py-2">Total</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, i) => (
            <motion.tr
              key={order.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            >
              <td className="px-4 py-2 font-medium text-gray-800 dark:text-white">
                {order.customerName}
              </td>
              <td className="px-4 py-2 text-gray-600 dark:text-gray-300">
                {order.items.map((item) => (
                  <div key={item.productId}>
                    {item.name} × {item.quantity}
                  </div>
                ))}
              </td>
              <td className="px-4 py-2 font-semibold text-green-600 dark:text-green-400">
                Rp{order.total.toLocaleString()}
              </td>
              <td className="px-4 py-2">
                <Badge variant={getStatusVariant(order.status)}>
                  {order.status}
                </Badge>
              </td>
              <td className="px-4 py-2 text-gray-500 dark:text-gray-400">
                {format(new Date(), "dd MMM yyyy")}
              </td>
              <td className="px-4 py-2">
                <button
                  className="text-sm text-blue-600 hover:underline"
                  onClick={() => setSelectedOrder(order)}
                >
                  View
                </button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>

      <OrderDetailModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </div>
    // </div>
  );
}
