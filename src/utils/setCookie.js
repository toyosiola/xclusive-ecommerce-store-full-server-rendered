import "server-only";

import { devEnv } from "@/app/layout";
import { cookies } from "next/headers";
import createJWT from "./createJWT";

export default function setCookie(payload) {
  const token = createJWT(payload);

  cookies().set("session", token, {
    httpOnly: true,
    secure: !devEnv,
    maxAge: Number(process.env.SESSION_LIFETIME),
    sameSite: "lax",
    path: "/",
  });
}
