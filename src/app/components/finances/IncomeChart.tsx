"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Order } from "@/app/types/order";
import { format } from "date-fns";

type IncomeChartProps = {
  orders: Order[];
};

type ChartData = {
  date: string;
  revenue: number;
};

export default function IncomeChart({ orders }: IncomeChartProps) {
  // Group revenue by date (you can change to by month)
  const dataMap = new Map<string, number>();

  orders.forEach((order) => {
    if (order.status !== "paid") return;

    const dateKey = format(new Date(order.createdAt), "dd MMM");
    dataMap.set(dateKey, (dataMap.get(dateKey) || 0) + order.total);
  });

  const chartData: ChartData[] = Array.from(dataMap.entries()).map(
    ([date, revenue]) => ({
      date,
      revenue,
    })
  );

  return (
    <div className="">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        📈 Income Over Time
      </h3>

      <div className="h-72 bg-white dark:bg-gray-900 rounded-xl shadow-md p-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis tickFormatter={(v) => `Rp${(v / 1000).toFixed(0)}k`} />
            <Tooltip
              formatter={(value: number) => `Rp${value.toLocaleString()}`}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#10b981"
              fill="url(#colorRevenue)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
