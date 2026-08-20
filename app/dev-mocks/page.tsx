import type { Metadata } from "next";
import { BookingCalendar } from "@/components/mocks/BookingCalendar";
import { CompanionPhone } from "@/components/mocks/CompanionPhone";
import { CopilotChat } from "@/components/mocks/CopilotChat";
import { CrmFunnel } from "@/components/mocks/CrmFunnel";
import { DashboardMock } from "@/components/mocks/DashboardMock";
import { ExamCatalog } from "@/components/mocks/ExamCatalog";
import { LadderDiagram } from "@/components/mocks/LadderDiagram";
import { ReportCompare } from "@/components/mocks/ReportCompare";

/**
 * Scratch review route for the product mocks. Deleted in Task 15 — nothing
 * links to it.
 */
export const metadata: Metadata = {
  title: "Mock review",
  robots: { index: false, follow: false },
};

const MOCKS: Array<{ name: string; node: React.ReactNode }> = [
  { name: "DashboardMock", node: <DashboardMock /> },
  { name: "ExamCatalog", node: <ExamCatalog /> },
  { name: "LadderDiagram", node: <LadderDiagram /> },
  { name: "CopilotChat", node: <CopilotChat /> },
  { name: "CompanionPhone", node: <CompanionPhone /> },
  { name: "BookingCalendar", node: <BookingCalendar /> },
  { name: "CrmFunnel", node: <CrmFunnel /> },
  { name: "ReportCompare", node: <ReportCompare /> },
];

export default function DevMocksPage() {
  return (
    <div className="container-site py-16">
      <h1 className="font-display text-3xl font-semibold tracking-tight text-ink">
        Product mocks
      </h1>
      <p className="mt-2 text-sm text-muted">
        Scratch route for review at 560px and 320px. Removed before launch.
      </p>

      <div className="mt-10 flex flex-col gap-14">
        {MOCKS.map((mock) => (
          <section key={mock.name} data-mock={mock.name}>
            <p className="eyebrow">{mock.name}</p>
            <div className="mt-3 flex flex-col gap-6 lg:flex-row lg:items-start">
              <div
                data-width="560"
                className="w-full max-w-[560px] rounded-2xl border border-line bg-bg p-4"
              >
                {mock.node}
              </div>
              <div
                data-width="320"
                className="w-full max-w-[352px] rounded-2xl border border-line bg-bg p-4"
              >
                {mock.node}
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
