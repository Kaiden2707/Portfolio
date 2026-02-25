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
    requireEmailVerification: true,
  },
  emailVerification: {
    sendOnSignUp: true,
    sendOnSignIn: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      const resendApiKey = process.env.RESEND_API_KEY;
      if (!resendApiKey) {
        console.error("RESEND_API_KEY is not set; skipping verification email.");
        return;
      }
      try {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev",
            to: user.email,
            subject: "Verify your email address",
            html: `Click the link to verify your email: <a href="${url}">${url}</a>`,
          }),
        });
        if (!res.ok) {
          const err = await res.text();
          console.error("Resend send failed:", res.status, err);
        }
      } catch (e) {
        console.error("Failed to send verification email:", e);
      }
    },
  },
  socialProviders: {
    ...(process.env.BETTER_AUTH_GOOGLE_CLIENT_ID && process.env.BETTER_AUTH_GOOGLE_CLIENT_SECRET
      ? {
          google: {
            clientId: process.env.BETTER_AUTH_GOOGLE_CLIENT_ID,
            clientSecret: process.env.BETTER_AUTH_GOOGLE_CLIENT_SECRET,
          },
        }
      : {}),
    ...(process.env.BETTER_AUTH_GITHUB_CLIENT_ID && process.env.BETTER_AUTH_GITHUB_CLIENT_SECRET
      ? {
          github: {
            clientId: process.env.BETTER_AUTH_GITHUB_CLIENT_ID,
            clientSecret: process.env.BETTER_AUTH_GITHUB_CLIENT_SECRET,
          },
        }
      : {}),
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
