import { db } from "@/app/lib/firebase";
import {
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const ref = doc(db, "finances", params.id);
  const snap = await getDoc(ref);
  if (!snap.exists())
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ id: snap.id, ...snap.data() });
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await req.json();
    const ref = doc(db, "finances", params.id);
    await updateDoc(ref, { ...data, updatedAt: serverTimestamp() });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("PUT error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  const ref = doc(db, "finances", params.id);
  await deleteDoc(ref);
  return NextResponse.json({ success: true });
}
