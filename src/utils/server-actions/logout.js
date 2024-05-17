"use server";

const { cookies } = require("next/headers");
const { redirect } = require("next/navigation");

export default async function logout() {
  cookies().delete("session");
  redirect("/");
}
