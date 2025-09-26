import { useState } from "react";
import { Product } from "@/app/types/product";
import { toast } from "sonner";
import {
  ProductInput,
  productSchema,
} from "@/app/lib/validations/productSchema";

type Props = {
  onAddProduct: (product: Omit<Product, "id">) => Promise<any>;
  refetch: () => Promise<void>;
};

export default function AddProductForm({ onAddProduct, refetch }: Props) {
  const [form, setForm] = useState<ProductInput>({
    name: "",
    description: "",
    price: 0,
    category: "",
    imageUrl: "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof ProductInput, string>>
  >({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
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

      await onAddProduct(form);
      await refetch();
      toast.success("Product added successfully!");
      setForm({
        name: "",
        description: "",
        price: 0,
        category: "",
        imageUrl: "",
      });
    } catch (error) {
      toast.error("Failed to add product.");
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-md shadow-sm grid gap-4"
    >
      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        className="border p-2"
      />
      {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

      <input
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="border p-2"
      />
      {errors.description && (
        <p className="text-red-500 text-sm">{errors.description}</p>
      )}

      <input
        name="price"
        placeholder="Price"
        type="number"
        value={form.price}
        onChange={handleChange}
        className="border p-2"
      />
      {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}

      <input
        name="category"
        placeholder="Category"
        value={form.category}
        onChange={handleChange}
        className="border p-2"
      />
      {errors.category && (
        <p className="text-red-500 text-sm">{errors.category}</p>
      )}

      {/* <input
        name="imageUrl"
        placeholder="Image URL (optional)"
        value={form.imageUrl}
        onChange={handleChange}
        className="border p-2"
      />
      {errors.imageUrl && (
        <p className="text-red-500 text-sm">{errors.imageUrl}</p>
      )} */}
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Add Product
      </button>
    </form>
  );
}
