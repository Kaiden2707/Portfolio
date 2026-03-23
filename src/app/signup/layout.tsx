import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign up",
  description: "Create an account for protected areas of the Kaiden McIntosh portfolio.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

