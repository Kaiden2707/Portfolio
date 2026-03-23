import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { SiteShell } from "@/components/SiteShell";
import { PageReveal } from "@/components/PageReveal";
import { ContactPanel } from "@/components/contact/ContactPanel";
import { profile } from "@/content/profile";
import { siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Kaiden McIntosh for frontend development opportunities, collaborations, and project discussions.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact | Kaiden McIntosh",
    description:
      "Contact Kaiden McIntosh for frontend development opportunities, collaborations, and project discussions.",
    url: `${siteConfig.siteUrl}/contact`,
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-transparent">
      <SiteShell name={profile.name}>
        <div className="min-h-[2rem] sm:min-h-[3rem]" aria-hidden />
        <PageReveal>
          <Section id="contact" eyebrow="Connect" title="Contact" headingLevel={1} titleScrollFlow>
            <ContactPanel />
          </Section>
        </PageReveal>
      </SiteShell>
    </div>
  );
}
