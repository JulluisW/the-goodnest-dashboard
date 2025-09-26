"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewOrder } from "@/app/types/order";
import { format } from "date-fns";
import { createOrder } from "@/app/lib/api/orders";
import { z } from "zod";
import { newOrderSchema } from "@/app/lib/validations/newOrderSchema";

export default function OrderForm() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<NewOrder>({
    resolver: zodResolver(newOrderSchema),
    defaultValues: {
      items: [{ name: "", price: 0, quantity: 1, productId: "" }],
      status: "pending",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const items = watch("items");
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const onSubmit = async (data: NewOrder) => {
    const formattedData: NewOrder = {
      ...data,
      total,
      createdAt: format(new Date(), "dd-MM-yyyy HH:mm"),
    };
    await createOrder(formattedData);
    alert("Order created!");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white">
      <div>
        <label className="block font-medium">Customer Name (optional)</label>
        <input {...register("customerName")} className="input" />
      </div>

      <div>
        <label className="block font-medium">Status</label>
        <select {...register("status")} className="input">
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div>
        <label className="block font-medium">Items</label>
        {fields.map((field, index) => (
          <div key={field.id} className="grid grid-cols-4 gap-2 mb-2">
            <input
              {...register(`items.${index}.name`)}
              placeholder="Product Name"
              className="input"
            />
            <input
              type="number"
              {...register(`items.${index}.price`, { valueAsNumber: true })}
              placeholder="Price"
              className="input"
            />
            <input
              type="number"
              {...register(`items.${index}.quantity`, { valueAsNumber: true })}
              placeholder="Qty"
              className="input"
            />
            <button
              type="button"
              onClick={() => remove(index)}
              className="text-red-500"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            append({ name: "", price: 0, quantity: 1, productId: "" })
          }
          className="text-blue-500"
        >
          ➕ Add Item
        </button>
      </div>

      <div className="font-bold">Total: {total}</div>

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Submit Order
      </button>
    </form>
  );
}
