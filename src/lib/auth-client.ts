import { createAuthClient } from "better-auth/react";

// In the browser, omit baseURL so requests use the current origin (no localhost in production).
// On the server (SSR/build), use env or localhost for any server-side auth calls.
function getAuthClientConfig(): { baseURL?: string } {
  if (typeof window === "undefined") {
    return { baseURL: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000" };
  }
  return {};
}

export const authClient = createAuthClient(getAuthClientConfig());

export const { signIn, signUp, signOut, useSession } = authClient;
