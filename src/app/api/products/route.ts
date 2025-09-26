// import { db } from "@/app/lib/firebase";
import { db_client } from "@/app/lib/firebaseClient";
// import { serverTimestamp } from "firebase/firestore";
import { collection, getDocs, addDoc } from "firebase/firestore/lite";
import { NextResponse } from "next/server";

export async function GET() {
  const snapshot = await getDocs(collection(db_client, "products"));
  const products = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  const data = await req.json();
  const docRef = await addDoc(collection(db_client, "products"), {
    ...data,
    // createdAt: serverTimestamp(),
    // updatedAt: serverTimestamp(),
  });
  return NextResponse.json({ id: docRef.id });
}
