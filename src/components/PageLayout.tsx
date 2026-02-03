import type { ReactNode } from "react";
import PrimaryNav from "./PrimaryNav";

type PageLayoutProps = {
  children: ReactNode;
};

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen px-6 pb-20 pt-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <header className="rounded-[32px] border border-(--paper-edge) bg-(--paper) p-6 shadow-(--shadow)">
          <PrimaryNav />
        </header>
        {children}
      </div>
    </div>
  );
}
