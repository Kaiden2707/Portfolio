import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for the Kaiden McIntosh portfolio website.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#0b0d12] px-8 py-8 text-[#f5f5f5]">
      <div className="mx-auto w-full max-w-[600px]">
        <h1 className="mb-6 text-4xl font-semibold">Privacy Policy</h1>
        <p className="mb-4 text-lg leading-8">
          This site uses Better Auth to let users sign in with Google or GitHub.
        </p>
        <p className="mb-4 text-lg leading-8">
          Sign-in exists mainly to demonstrate authentication implementation to potential employers.
        </p>
        <p className="mb-4 text-lg leading-8">
          The practical reason to sign in is to access private blog content or personal demo projects.
        </p>
        <p className="mb-4 text-lg leading-8">
          When you sign in, basic account information such as your email and profile details is collected. This
          information is stored securely and is not sold or shared with third parties.
        </p>
        <p className="text-lg leading-8">
          If you have questions about this policy, contact: Kaidenmcintosh27@gmail.com
        </p>
        <p className="mt-8 font-mono text-lg text-[#f5f5f5]/70">{'>>'}</p>
      </div>
    </main>
  );
}
