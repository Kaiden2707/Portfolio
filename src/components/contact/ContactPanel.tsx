"use client";

import { profile } from "@/content/profile";
import { useState } from "react";

function copyToClipboard(value: string) {
  if (typeof navigator === "undefined" || !navigator.clipboard) return;
  navigator.clipboard.writeText(value).catch(() => {});
}

// SVG Icons
const EmailIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
    />
  </svg>
);

const PhoneIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
    />
  </svg>
);

const GitHubIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

export function ContactPanel() {
  const [phoneRevealed, setPhoneRevealed] = useState(false);
  const [copied, setCopied] = useState<"phone" | "email" | null>(null);
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

  const email = profile.contact.email;
  const phone = profile.contact.phone;
  const github = profile.contact.github;
  const instagram = profile.contact.instagram;

  const showPhone = () => setPhoneRevealed(true);

  const handleCopy = (type: "phone" | "email") => {
    if (type === "phone" && phone) copyToClipboard(phone);
    if (type === "email" && email) copyToClipboard(email);
    setCopied(type);
    window.setTimeout(() => setCopied(null), 1200);
  };

  const contactItems = [
    {
      id: "email",
      icon: EmailIcon,
      label: email,
      href: email ? `mailto:${email}` : undefined,
      handle: email,
      action: () => handleCopy("email"),
      showCopy: true,
    },
    {
      id: "phone",
      icon: PhoneIcon,
      label: phoneRevealed ? phone : "Reveal",
      href: phoneRevealed && phone ? `tel:${phone}` : undefined,
      handle: phoneRevealed ? phone : "Click to reveal",
      action: phoneRevealed ? () => handleCopy("phone") : showPhone,
      showCopy: phoneRevealed,
    },
    {
      id: "github",
      icon: GitHubIcon,
      label: github,
      href: github ? `https://github.com/${github}` : undefined,
      handle: github,
      action: undefined,
      showCopy: false,
    },
    {
      id: "instagram",
      icon: InstagramIcon,
      label: instagram,
      href: instagram ? `https://instagram.com/${instagram}` : undefined,
      handle: instagram,
      action: undefined,
      showCopy: false,
    },
  ];

  return (
    <div className="tile-spotlight rounded-2xl border border-border bg-surface p-10 transition hover:border-accent/25 hover:bg-surface-2 sm:p-12 md:p-14 dark:text-white">
      <p className="max-w-2xl text-sm leading-7 text-muted sm:text-base">
        Get in touch through any of these channels. Hover over the icons to see
        my handles.
      </p>

      <div className="mt-10 flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-12">
        {contactItems.map((item) => {
          const Icon = item.icon;
          const isHovered = hoveredIcon === item.id;
          const showHandle = isHovered && item.handle;

          return (
            <div
              key={item.id}
              className="group relative flex flex-col items-center"
              onMouseEnter={() => setHoveredIcon(item.id)}
              onMouseLeave={() => setHoveredIcon(null)}
            >
              {item.href ? (
                <a
                  href={item.href}
                  onClick={(e) => {
                    if (item.action) {
                      e.preventDefault();
                      item.action();
                    }
                  }}
                  className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-surface-2 text-foreground/70 transition-all duration-300 ease-out hover:scale-125 hover:border-accent/40 hover:bg-surface hover:text-foreground hover:shadow-[0_0_20px_rgba(var(--accent-rgb)/0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 sm:h-20 sm:w-20"
                >
                  <Icon className="h-8 w-8 sm:h-10 sm:w-10" />
                  {item.showCopy && copied === item.id && (
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-accent/40 bg-surface px-2 py-1 text-[10px] font-mono uppercase tracking-[0.16em] text-accent">
                      copied
                    </span>
                  )}
                </a>
              ) : (
                <button
                  type="button"
                  onClick={item.action}
                  className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-surface-2 text-foreground/70 transition-all duration-300 ease-out hover:scale-125 hover:border-accent/40 hover:bg-surface hover:text-foreground hover:shadow-[0_0_20px_rgba(var(--accent-rgb)/0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 sm:h-20 sm:w-20"
                >
                  <Icon className="h-8 w-8 sm:h-10 sm:w-10" />
                  {item.showCopy && copied === item.id && (
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-accent/40 bg-surface px-2 py-1 text-[10px] font-mono uppercase tracking-[0.16em] text-accent">
                      copied
                    </span>
                  )}
                </button>
              )}

              {/* Handle display on hover */}
              <div
                className={`absolute top-full mt-4 whitespace-nowrap rounded-full border border-border/50 bg-surface-2 px-4 py-2 text-sm text-muted transition-all duration-300 ease-out dark:text-white ${
                  showHandle
                    ? "translate-y-0 opacity-100"
                    : "translate-y-2 opacity-0"
                }`}
              >
                {item.handle}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
