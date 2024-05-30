"use server";

import { cookies } from "next/headers";

export default async function deleteSession() {
  cookies().delete("session");
}
