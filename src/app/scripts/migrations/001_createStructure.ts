import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import * as dotenv from "dotenv";
import readline from "readline";
import seedProducts from "../seeds/products";
import seedCustomers from "../seeds/customers";
import seedOrders from "../seeds/orders";

dotenv.config();

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

async function confirmDangerousAction(message: string): Promise<boolean> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(`${message} (y/n): `, (answer) => {
      rl.close();
      resolve(answer.toLowerCase() === "y");
    });
  });
}

const db = getFirestore();

// Utility: Reset (delete all documents in) a collection
async function resetCollection(collectionName: string) {
  const colRef = db.collection(collectionName);
  const snapshot = await colRef.get();

  const deletePromises = snapshot.docs.map((doc) => doc.ref.delete());

  await Promise.all(deletePromises);
  console.log(`✅ [${collectionName}] cleared.`);
}

// Full migration
async function migrate() {
  const confirmed = await confirmDangerousAction(
    "⚠️ Are you sure you want to reset ALL data? This cannot be undone!"
  );

  if (!confirmed) {
    console.log("❌ Migration cancelled.");
    process.exit(0);
  }

  console.log("🚀 Starting migration...");

  await resetCollection("products");
  await resetCollection("customers");
  await resetCollection("orders");

  await seedProducts(db);
  await seedCustomers(db);
  await seedOrders(db);

  console.log("🎉 Migration completed!");
}

// Run if direct
(async () => {
  await migrate();
})();
