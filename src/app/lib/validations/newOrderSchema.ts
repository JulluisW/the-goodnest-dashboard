import { z } from "zod";

// Schema for creating a new order (without oid, which is added by backend)
export const newOrderSchema = z.object({
  items: z.array(
    z.object({
      productId: z.string(),
      name: z.string(),
      price: z.number(),
      quantity: z.number(),
    })
  ),
  total: z.number(),
  createdAt: z.string(),
  status: z.enum(["pending", "paid", "cancelled"]),
  customerName: z.string().optional(),
});

export type NewOrder = z.infer<typeof newOrderSchema>;
