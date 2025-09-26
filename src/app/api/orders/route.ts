import { generateNextOrderId } from "@/app/lib/firebase/orders";
import { db_client } from "@/app/lib/firebaseClient";
import { collection, getDocs, addDoc } from "firebase/firestore/lite";
import { NextResponse } from "next/server";

export async function GET() {
  const snapshot = await getDocs(collection(db_client, "orders"));
  const orders = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return NextResponse.json(orders);
}

export async function POST(req: Request) {
  const data = await req.json();

  const customId = await generateNextOrderId();
  const docRef = await addDoc(collection(db_client, "orders"), {
    ...data,
    oid: customId,
  });
  return NextResponse.json({ id: docRef.id });
}
