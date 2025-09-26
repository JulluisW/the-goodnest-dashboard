import { format } from "date-fns";
import { Firestore } from "firebase-admin/firestore";

export default async function seedOrders(db: Firestore) {
  const ordersRef = db.collection("orders");

  const orders = [
    {
      oid: "ORD-00001",
      customerName: "John Doe",
      items: [
        {
          productId: "1",
          name: "Juice 1",
          price: 10000,
          quantity: 2,
          subtotal: 20000,
        },
        {
          productId: "4",
          name: "Juice 4",
          price: 10000,
          quantity: 4,
          subtotal: 40000,
        },
      ],
      total: 60000,
      status: "Completed",
      createdAt: format(new Date(), "dd-mm-yyyy hh:mm"),
      updatedAt: format(new Date(), "dd-mm-yyyy hh:mm"),
    },
  ];

  const createPromises = orders.map((order) => ordersRef.add(order));

  await Promise.all(createPromises);
  console.log(`✅ Orders seeded.`);
}
