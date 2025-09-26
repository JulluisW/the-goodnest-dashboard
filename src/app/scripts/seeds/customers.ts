import { format } from "date-fns";
import { Firestore } from "firebase-admin/firestore";

export default async function seedCustomers(db: Firestore) {
  const customersRef = db.collection("customers");

  const customers = [
    {
      cid: "CUS-0001",
      name: "John Doe",
      email: "john@example.com",
      phone: "081234567890",
      address: "Jl. Sudirman No.10, Jakarta",
      createdAt: format(new Date(), "dd-mm-yyyy hh:mm"),
      updatedAt: format(new Date(), "dd-mm-yyyy hh:mm"),
    },
    {
      cid: "CUS-0002",
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "081298765432",
      address: "Jl. Thamrin No.20, Jakarta",
      createdAt: format(new Date(), "dd-mm-yyyy hh:mm"),
      updatedAt: format(new Date(), "dd-mm-yyyy hh:mm"),
    },
  ];

  const createPromises = customers.map((customer) =>
    customersRef.add(customer)
  );

  await Promise.all(createPromises);
  console.log(`✅ Customers seeded.`);
}
