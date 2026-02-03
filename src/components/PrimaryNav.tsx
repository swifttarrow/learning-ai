"use client";

import { usePathname, useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Overview", value: "overview" },
  { href: "/learn", label: "Learn", value: "learn" },
  { href: "/news", label: "AI News", value: "news" },
];

export default function PrimaryNav() {
  const pathname = usePathname();
  const router = useRouter();
  const activeValue =
    links.find((link) => link.href === pathname)?.value ?? "overview";

  return (
    <nav className="flex flex-wrap items-center justify-between gap-6">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[var(--accent)] text-sm font-semibold text-white shadow-[0_10px_24px_rgba(146,54,13,0.3)]">
          AE
        </span>
        <div>
          <Badge
            variant="outline"
            className="border-[var(--paper-edge)] bg-white/70 text-[10px] uppercase tracking-[0.3em] text-[var(--ink-subtle)]"
          >
            AI-native engineer
          </Badge>
          <p className="text-lg font-semibold text-[var(--foreground)]">
            Learning App
          </p>
        </div>
      </div>
      <Tabs
        value={activeValue}
        onValueChange={(value) => {
          const target = links.find((link) => link.value === value);
          if (target) router.push(target.href);
        }}
        className="w-auto"
      >
        <TabsList
          variant="line"
          className="h-auto rounded-full border border-[var(--paper-edge)] bg-[var(--surface)] p-1.5"
        >
          {links.map((link) => (
            <TabsTrigger
              key={link.value}
              value={link.value}
              className={cn(
                "rounded-full px-4 text-sm font-medium text-[var(--ink-muted)] hover:text-[var(--foreground)]",
                "data-[state=active]:bg-[var(--accent-soft)] data-[state=active]:text-[var(--accent-strong)] data-[state=active]:shadow-[inset_0_0_0_1px_rgba(194,73,20,0.25)]"
              )}
            >
              {link.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </nav>
  );
}
