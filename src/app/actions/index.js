"use server";

import { signIn, signOut } from "../../auth";
import crypto from "crypto";

export async function doSocialLogin(formData) {
  const action = formData.get("action");
  await signIn(action, { redirectTo: "/home" });
}

export async function doLogout() {
  await signOut({ redirectTo: "/" });
}

export async function doLogin(formData) {
  try {
    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
    return response;
  } catch (err) {
    throw err;
  }
}

export async function doRegister(formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  function generateToken() {
    return crypto.randomBytes(64).toString("hex");
  }
  const token = generateToken();
  try {
    const response = await fetch("http://localhost:3000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, token }),
    });
    return response.json();
  } catch (err) {
    throw err;
  }
}
