import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service for the Kaiden McIntosh portfolio website.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#0b0d12] px-8 py-8 text-[#f5f5f5]">
      <div className="mx-auto w-full max-w-[600px]">
        <h1 className="mb-6 text-4xl font-semibold">Terms of Service</h1>
        <p className="mb-4 text-lg leading-8">
          By using this site, you agree to use it responsibly and respectfully.
        </p>
        <p className="mb-4 text-lg leading-8">
          Any data collected through sign-in is handled according to the Privacy Policy.
        </p>
        <p className="mb-4 text-lg leading-8">
          You may not use this site for illegal, harmful, or abusive activity.
        </p>
        <p className="text-lg leading-8">
          The site owner is not liable for misuse of the platform or its content.
        </p>
        <p className="mt-8 font-mono text-lg text-[#f5f5f5]/70">{'>>'}</p>
      </div>
    </main>
  );
}
