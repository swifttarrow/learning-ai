"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Overview" },
  { href: "/learn", label: "Learn" },
  { href: "/news", label: "AI News" },
];

export default function PrimaryNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap items-center justify-between gap-6">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[var(--accent)] text-sm font-semibold text-white shadow-[0_10px_24px_rgba(146,54,13,0.3)]">
          AE
        </span>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--ink-subtle)]">
            AI-native engineer
          </p>
          <p className="text-lg font-semibold text-[var(--foreground)]">
            Learning App
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 rounded-full bg-[var(--surface)] p-2 shadow-[inset_0_0_0_1px_rgba(74,54,40,0.08)]">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                active
                  ? "bg-[var(--accent-soft)] text-[var(--accent-strong)] shadow-[inset_0_0_0_1px_rgba(194,73,20,0.25)]"
                  : "text-[var(--ink-muted)] hover:text-[var(--foreground)]"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
