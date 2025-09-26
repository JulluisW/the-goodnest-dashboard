import { Card, CardContent } from "../ui/card";

type SummaryProps = {
  totalOrders: number;
  totalRevenue: number;
  avgOrderValue: number;
};

export function FinanceSummary({
  totalOrders,
  totalRevenue,
  avgOrderValue,
}: SummaryProps) {
  const metrics = [
    {
      label: "Total Orders",
      value: totalOrders,
      icon: "📦",
    },
    {
      label: "Total Revenue",
      value: `Rp${totalRevenue.toLocaleString()}`,
      icon: "💰",
    },
    {
      label: "Avg. Order Value",
      value: `Rp${avgOrderValue.toLocaleString()}`,
      icon: "📊",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {metrics.map((metric) => (
        <Card key={metric.label}>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              {metric.label}
            </p>
            <div className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
              <span>{metric.icon}</span>
              <span>{metric.value}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
