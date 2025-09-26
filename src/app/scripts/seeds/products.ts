import { format } from "date-fns";
import { Firestore } from "firebase-admin/firestore";

export default async function seedProducts(db: Firestore) {
  const productsRef = db.collection("products");
  const dummyProducts = Array.from({ length: 15 }, (_, i) => ({
    pid: `${i + 1}`,
    name: `Juice ${i + 1}`,
    description: `This is the description for product ${i + 1}`,
    // price: parseFloat((Math.random() * 100).toFixed(2)),
    price: 10000,
    category: ["Juice", "Smoothie", "Tea", "Milkshake"][i % 4],
    createdAt: format(new Date(), "dd-mm-yyyy hh:mm"),
    updatedAt: format(new Date(), "dd-mm-yyyy hh:mm"),
  }));

  const createPromises = dummyProducts.map((product) =>
    productsRef.add(product)
  );

  await Promise.all(createPromises);
  console.log(`✅ Products seeded.`);
}
