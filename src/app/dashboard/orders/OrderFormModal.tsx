import { Dialog } from "@/app/components/ui/Dialog";
import OrderForm from "./OrderForm";

interface OrderFormModalProps {
  open: boolean;
  onClose: () => void;
}

export default function OrderFormModal({ open, onClose }: OrderFormModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <h2 className="text-xl font-bold mb-4">Create New Order</h2>
      <OrderForm />
    </Dialog>
  );
}
