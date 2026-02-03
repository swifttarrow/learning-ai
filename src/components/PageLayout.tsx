import type { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import PrimaryNav from "./PrimaryNav";

type PageLayoutProps = {
  children: ReactNode;
};

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen px-6 pb-20 pt-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <header>
          <Card className="rounded-[32px] border-[var(--paper-edge)] bg-[var(--paper)] shadow-[var(--shadow)]">
            <CardContent className="p-6">
              <PrimaryNav />
            </CardContent>
          </Card>
        </header>
        {children}
      </div>
    </div>
  );
}
