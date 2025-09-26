import { db_client } from "@/app/lib/firebaseClient";
import { collection, getDocs, addDoc } from "firebase/firestore/lite";
import { NextResponse } from "next/server";

export async function GET() {
  const snapshot = await getDocs(collection(db_client, "finances"));
  const finances = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return NextResponse.json(finances);
}

export async function POST(req: Request) {
  const data = await req.json();
  const docRef = await addDoc(collection(db_client, "finances"), {
    ...data,
  });
  return NextResponse.json({ id: docRef.id });
}
