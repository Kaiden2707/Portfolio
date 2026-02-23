import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db, user, session, account, verification } from "./db";

const baseURL = process.env.BETTER_AUTH_URL;
const vercelUrl = process.env.VERCEL_URL; // Set automatically on Vercel (e.g. "kaidensportfolio.vercel.app")

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: { user, session, account, verification },
  }),
  emailAndPassword: {
    enabled: true,
  },
  experimental: { joins: true },
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: baseURL ?? (vercelUrl ? `https://${vercelUrl}` : undefined),
  trustedOrigins: [
    "http://localhost:3000",
    ...(baseURL && baseURL !== "http://localhost:3000" ? [baseURL] : []),
    ...(vercelUrl ? [`https://${vercelUrl}`] : []),
  ],
});
