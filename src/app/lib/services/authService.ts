"use client";

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { app_client } from "../firebaseClient";
import { setCookie, deleteCookie } from "cookies-next"; // install cookies-next

const auth = getAuth(app_client);

export async function login(email: string, password: string) {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  const token = await userCredential.user.getIdToken();
  setCookie("token", token); // set cookie
}

export async function register(email: string, password: string) {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const token = await userCredential.user.getIdToken();
  setCookie("token", token); // set cookie
}

export async function logout() {
  await auth.signOut();
  deleteCookie("token"); // remove cookie
}
