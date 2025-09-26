"use client";

import { Order } from "@/app/types/order";
import { format } from "date-fns";
import { Badge } from "../ui/Badge";

type Props = {
  orders: Order[];
};

export default function TransactionHistory({ orders }: Props) {
  const transactions = orders
    .map((order) => ({
      id: order.id,
      customerName: order.customerName,
      amount: order.total,
      status: order.status,
      date: order.createdAt,
    }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Newest first

  return (
    <div className="">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        🧾 Transaction History
      </h3>

      <div className="overflow-x-auto bg-white dark:bg-gray-900 rounded-xl shadow-md">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
            <tr>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr
                key={tx.id}
                className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
              >
                <td className="px-4 py-2 font-medium">{tx.customerName}</td>
                <td
                  className={`px-4 py-2 font-semibold ${
                    tx.status === "cancelled"
                      ? "text-red-500 line-through"
                      : "text-green-600"
                  }`}
                >
                  Rp{tx.amount.toLocaleString()}
                </td>
                <td className="px-4 py-2">
                  <Badge
                    variant={
                      tx.status === "paid"
                        ? "success"
                        : tx.status === "pending"
                        ? "warning"
                        : "destructive"
                    }
                  >
                    {tx.status}
                  </Badge>
                </td>
                <td className="px-4 py-2 text-gray-500">
                  {/* {format(new Date(tx.date), "dd MMM yyyy")} */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
