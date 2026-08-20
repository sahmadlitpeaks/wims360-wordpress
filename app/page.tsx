import { BookingCalendar } from "@/components/mocks/BookingCalendar";
import { CompanionPhone } from "@/components/mocks/CompanionPhone";
import { CopilotChat } from "@/components/mocks/CopilotChat";
import { CrmFunnel } from "@/components/mocks/CrmFunnel";
import { ExamCatalog } from "@/components/mocks/ExamCatalog";
import { ReportCompare } from "@/components/mocks/ReportCompare";
import { ClientExperience } from "@/components/home/ClientExperience";
import { ComplianceGrid } from "@/components/home/ComplianceGrid";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Methodology } from "@/components/home/Methodology";
import { ModuleShowcase } from "@/components/home/ModuleShowcase";
import { PackagesTeaser } from "@/components/home/PackagesTeaser";
import { Pillars } from "@/components/home/Pillars";
import { Problem } from "@/components/home/Problem";
import { ReplaceStack } from "@/components/home/ReplaceStack";
import { RolesGrid } from "@/components/home/RolesGrid";
import { StatsBand } from "@/components/home/StatsBand";
import { TrustStrip } from "@/components/home/TrustStrip";
import { CtaBand } from "@/components/ui/CtaBand";

/**
 * Title and description are inherited from the root layout defaults, which
 * already carry the homepage positioning line.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Problem />
      <ReplaceStack />
      <Pillars />
      <Methodology />
      <ModuleShowcase
        panels={{
          assessments: <ExamCatalog />,
          labs: <ReportCompare />,
          ai: <CopilotChat />,
          bookings: <BookingCalendar />,
          crm: <CrmFunnel />,
          portal: <CompanionPhone />,
        }}
      />
      <ClientExperience />
      <StatsBand />
      <RolesGrid />
      <ComplianceGrid />
      <PackagesTeaser />
      <HowItWorks />
      <CtaBand />
    </>
  );
}
