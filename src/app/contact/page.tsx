import { Section } from "@/components/Section";
import { SiteShell } from "@/components/SiteShell";
import { ScrollFlowWrapper } from "@/components/ScrollFlowWrapper";
import { ContactPanel } from "@/components/contact/ContactPanel";
import { profile } from "@/content/profile";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-transparent">
      <SiteShell name={profile.name}>
        <div className="min-h-[2rem] sm:min-h-[3rem]" aria-hidden />
        <ScrollFlowWrapper>
          <Section id="contact" eyebrow="Connect" title="Contact" titleScrollFlow>
            <ContactPanel />
          </Section>
        </ScrollFlowWrapper>
      </SiteShell>
    </div>
  );
}
