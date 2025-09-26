import { getDocs, collection } from "firebase/firestore";
import { db } from "@/app/lib/firebase"; // adjust path if needed

export async function generateNextOrderId() {
  const snapshot = await getDocs(collection(db, "orders"));

  const orderNumbers = snapshot.docs
    .map((doc) => doc.id.match(/ORD-(\d+)/)?.[1])
    .filter(Boolean)
    .map(Number)
    .sort((a, b) => b - a);

  const nextNumber = (orderNumbers[0] ?? 0) + 1;
  return `ORD-${String(nextNumber).padStart(4, "0")}`;
}
