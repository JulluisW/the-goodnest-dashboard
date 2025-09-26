"use client";

import { FinanceSummary } from "@/app/components/finances/FinancesSummary";
import IncomeChart from "@/app/components/finances/IncomeChart";
import TransactionHistory from "@/app/components/finances/TransactionHistory";
import { useOrders } from "@/app/hooks/useOrders";

export default function FinancesPage() {
  const { orders } = useOrders();

  const totalOrders = orders.length;
  const totalRevenue = orders.reduce(
    (sum, o) => (o.status === "paid" ? sum + o.total : sum),
    0
  );
  const avgOrderValue =
    totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
      <h1 className="text-2xl font-bold text-gray-800 col-span-3">
        💼 Finances Overview
      </h1>
      <div className="col-span-3">
        <FinanceSummary
          totalOrders={totalOrders}
          totalRevenue={totalRevenue}
          avgOrderValue={avgOrderValue}
        />
      </div>
      <div className="col-span-3">
        <IncomeChart orders={orders} />
      </div>
      <div className="col-span-3">
        <TransactionHistory orders={orders} />
      </div>
    </div>
  );
}
