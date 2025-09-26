"use client";

import OrderTable from "@/app/components/orders/OrderTable";
import OrderThumbnail from "@/app/components/orders/OrderThumbnail";
import { useOrders } from "@/app/hooks/useOrders";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/app/lib/utils";
import OrderFormModal from "./OrderFormModal";

export default function OrderList() {
  const { orders } = useOrders();
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          📦 Recent Orders
        </h2>
      </div>

      <OrderFormModal open={dialogOpen} onClose={() => setDialogOpen(false)} />

      {/* Toggle Switch */}
      <div className="w-full flex justify-between mb-6">
        <div className="inline-flex border border-gray-300 dark:border-gray-600 rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-sm">
          {["table", "grid"].map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode as "table" | "grid")}
              className={cn(
                "px-4 py-2 text-sm font-medium transition-all duration-200",
                viewMode === mode
                  ? "bg-green-500 text-white"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              )}
            >
              {mode === "table" ? "📊 Table" : "🖼️ Grid"}
            </button>
          ))}
        </div>

        <button
          onClick={() => setDialogOpen(true)} // You'll implement the modal soon
          className="bg-green-600 text-white text-sm px-4 py-2 rounded-lg shadow hover:bg-green-700 transition"
        >
          + Add New Order
        </button>
      </div>

      {/* View Transitions */}
      <AnimatePresence mode="wait">
        {viewMode === "table" ? (
          <motion.div
            key="table"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <OrderTable orders={orders} />
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <OrderThumbnail orders={orders} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
