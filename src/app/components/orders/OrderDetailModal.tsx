import { useState } from "react";
import { Order } from "@/app/types/order";
import { format } from "date-fns";
import { Badge } from "../ui/Badge";
import { Dialog } from "../ui/Dialog";

interface OrderDetailModalProps {
  order: Order | null;
  onClose: () => void;
}

export default function OrderDetailModal({
  order,
  onClose,
}: OrderDetailModalProps) {
  if (!order) return null;

  return (
    <Dialog open={!!order} onOpenChange={onClose}>
      <div className="bg-white dark:bg-zinc-900 rounded-xl max-w-xl p-6 shadow-xl mx-auto">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white">
            🧾 Order Details
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 dark:hover:text-white"
          >
            ✖️
          </button>
        </div>

        <div className="space-y-2 text-sm text-gray-500">
          <div>
            <span className="font-semibold">Customer:</span>{" "}
            {order.customerName}
          </div>
          <div>
            <span className="font-semibold">Status:</span>{" "}
            <Badge
              variant={
                order.status === "paid"
                  ? "success"
                  : order.status === "pending"
                  ? "jungle"
                  : "danger"
              }
            >
              {order.status}
            </Badge>
          </div>
          <div>
            <span className="font-semibold">Date:</span>{" "}
            {format(new Date(), "dd MMM yyyy")}
          </div>
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Items:</h3>
            <ul className="pl-4 list-disc">
              {order.items.map((item) => (
                <li key={item.productId}>
                  {item.name} × {item.quantity} — Rp
                  {item.price.toLocaleString()}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4 font-bold text-green-600 dark:text-green-400">
            Total: Rp{order.total.toLocaleString()}
          </div>
        </div>
      </div>
    </Dialog>
  );
}
