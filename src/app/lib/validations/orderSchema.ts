import { z } from "zod";

const orderSchema = z.object({
  items: z.array(
    z.object({
      productId: z.string(),
      name: z.string(),
      price: z.number(),
      quantity: z.number(),
    })
  ),
  total: z.number(),
  createdAt: z.string(), // or z.date() depending on your usage
  customerInfo: z
    .object({
      name: z.string().optional(),
      phone: z.string().optional(),
    })
    .optional(),
});

export type Order = z.infer<typeof orderSchema>;
