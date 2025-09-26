import { useEffect, useState } from "react";
import { Product } from "@/app/types/product";
import {
  ProductInput,
  productSchema,
} from "@/app/lib/validations/productSchema";
import { toast } from "sonner";
import { motion } from "framer-motion";

type Props = {
  product: Product;
  onSave: (updatedProduct: Product) => void;
  onClose: () => void;
};

export default function EditProductModal({ product, onSave, onClose }: Props) {
  const [form, setForm] = useState<ProductInput>(product);
  const [errors, setErrors] = useState<
    Partial<Record<keyof ProductInput, string>>
  >({});
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = productSchema.safeParse(form);
    if (!result.success) {
      const formattedErrors: Partial<Record<keyof ProductInput, string>> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof ProductInput;
        formattedErrors[field] = err.message;
      });
      setErrors(formattedErrors);
      toast.error("Please fix form errors");
      return;
    }

    try {
      setIsSaving(true);
      await onSave({ id: product.id, ...result.data });
      toast.success("Product updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while saving.");
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      className="p-6 rounded-lg shadow-md fixed inset-0 z-50 bg-opacity-50 flex items-center justify-center backdrop-blur-sm bg-black/10"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-md shadow-md w-full max-w-md animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4">Edit Product</h2>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="border p-2 mb-2 w-full rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        <input
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="border p-2 mb-2 w-full rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description}</p>
        )}
        <input
          name="price"
          value={form.price}
          type="number"
          onChange={handleChange}
          placeholder="Price"
          className="border p-2 mb-2 w-full rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
          className="border p-2 mb-4 w-full"
        />
        {errors.category && (
          <p className="text-red-500 text-sm">{errors.category}</p>
        )}

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 text-gray-500">
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            type="button"
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
