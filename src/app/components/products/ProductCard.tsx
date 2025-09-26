import { Product } from "@/app/types/product";
import JuiceBubble from "./JuiceBubble";
import { toast } from "sonner";

type Props = {
  product: Product;
  onEditClick: (product: Product) => void;
  onDelete: (id: string) => void;
};

export default function ProductCard({ product, onEditClick, onDelete }: Props) {
  const handleDeleteProduct = async () => {
    try {
      await onDelete(product.id);
      toast.success("Product deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete product.");
    }
  };

  return (
    <div
      className="relative flex items-center gap-4
    
    rounded-md bg-white p-4 shadow transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
    >
      <JuiceBubble colors={["#d1fae5", "#6ee7b7", "#34d399"]} />
      <div>
        <h3 className="text-lg font-bold">{product.name}</h3>
        <p>{product.description}</p>
        <p className="text-sm text-gray-600">Rp{product.price}</p>
        <p className="text-xs text-gray-400">{product.category}</p>

        <div className="mt-4 flex gap-2">
          {/* <button
            onClick={() => onEditClick(product)}
            className="text-blue-500 hover:underline"
          >
            Edit
          </button>
          
          <button
            onClick={handleDeleteProduct}
            className="text-red-500 hover:underline"
          >
            Delete
          </button> */}

          <button
            onClick={() => onEditClick(product)}
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Edit
          </button>

          <button
            onClick={handleDeleteProduct}
            className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
