import { Order } from "@/app/types/order"; // adjust path based on your project
import { Badge } from "@/app/components/ui/Badge";
import { Card, CardContent } from "../ui/card";

type OrderCardProps = {
  order: Order;
  onClick: () => void;
};

export function OrderCard({ order, onClick }: OrderCardProps) {
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
    <Card
      onClick={onClick}
      className="rounded-2xl p-4 shadow-lg bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700"
    >
      <CardContent className="space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
              {order.customerName}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Order ID: {order.id}
            </p>
          </div>
          <Badge variant={getStatusVariant(order.status)}>{order.status}</Badge>
        </div>

        <ul className="text-sm text-gray-700 dark:text-gray-200 space-y-1">
          {order.items.map((item, index) => (
            <li key={index} className="flex justify-between">
              <span>
                {item.quantity} × {item.name}
              </span>
              <span>Rp{(item.price * item.quantity).toLocaleString()}</span>
            </li>
          ))}
        </ul>

        <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-700">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {new Date(order.createdAt).toLocaleString()}
          </span>
          <span className="font-semibold text-green-600 dark:text-green-400">
            Total: Rp{order.total.toLocaleString()}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
