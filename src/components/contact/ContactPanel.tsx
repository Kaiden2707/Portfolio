"use client";

import { profile } from "@/content/profile";
import { useState } from "react";
import { techIconUrl } from "@/lib/techIcons";

function copyToClipboard(value: string) {
  if (typeof navigator === "undefined" || !navigator.clipboard) return;
  navigator.clipboard.writeText(value).catch(() => {});
}

/** Gmail's colourful M (blue, red, yellow, green) – official-style paths. */
const GmailIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 256 256"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path fill="#4285F4" d="M58.182 192.05V93.14L27.507 65.077 0 49.504v125.091c0 9.658 7.825 17.455 17.455 17.455h40.727Z" />
    <path fill="#EA4335" d="m58.182 93.14-4.174-38.647 4.174-36.989L128 69.868l69.818-52.364 4.67 34.992-4.67 40.644L128 145.504z" />
    <path fill="#FBBC04" d="M197.818 17.504V93.14L256 49.504V26.231c0-21.585-24.64-33.89-41.89-20.945l-16.292 12.218Z" />
    <path fill="#34A853" d="M197.818 192.05h40.727c9.659 0 17.455-7.826 17.455-17.455V49.505l-31.156 17.837-27.026 25.798v98.91Z" />
    <path fill="#C5221F" d="m0 49.504 26.759 20.07L58.182 93.14V17.504L41.89 5.286C24.61-7.66 0 4.646 0 26.23v23.273Z" />
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
      icon: GmailIcon,
      label: email,
      href: email ? `mailto:${email}` : undefined,
      handle: email,
      action: () => handleCopy("email"),
      showCopy: true,
    },
    {
      id: "phone",
      icon: PhoneIcon,
      iconClass: "text-emerald-500",
      label: phoneRevealed ? phone : "Reveal",
      href: phoneRevealed && phone ? `tel:${phone}` : undefined,
      handle: phoneRevealed ? phone : "Click to reveal",
      action: phoneRevealed ? () => handleCopy("phone") : showPhone,
      showCopy: phoneRevealed,
    },
    {
      id: "github",
      iconId: "github",
      invertDark: true,
      label: github,
      href: github ? `https://github.com/${github}` : undefined,
      handle: github,
      action: undefined,
      showCopy: false,
    },
    {
      id: "instagram",
      iconId: "instagram",
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
          const isHovered = hoveredIcon === item.id;
          const showHandle = isHovered && item.handle;
          const iconContent =
            "icon" in item && item.icon ? (
              <item.icon
                className={`h-8 w-8 sm:h-10 sm:w-10 ${"iconClass" in item ? item.iconClass ?? "" : ""}`}
              />
            ) : "iconId" in item && item.iconId ? (
              <img
                src={techIconUrl(item.iconId)}
                alt=""
                width={40}
                height={40}
                className={`h-8 w-8 sm:h-10 sm:w-10 shrink-0 object-contain ${item.invertDark ? "tech-logo-invert" : ""}`}
              />
            ) : null;

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
                  {iconContent}
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
                  {iconContent}
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
