import { Capabilities } from "@/components/home/Capabilities";
import { ClientExperience } from "@/components/home/ClientExperience";
import { ComplianceGrid } from "@/components/home/ComplianceGrid";
import { Diamond } from "@/components/home/Diamond";
import { DrT } from "@/components/home/DrT";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { ImageBand } from "@/components/home/ImageBand";
import { JourneyFlow } from "@/components/home/JourneyFlow";
import { PackagesTeaser } from "@/components/home/PackagesTeaser";
import { Pillars } from "@/components/home/Pillars";
import { Problem } from "@/components/home/Problem";
import { RolesGrid } from "@/components/home/RolesGrid";
import { ServicesStrip } from "@/components/home/ServicesStrip";
import { StatsBand } from "@/components/home/StatsBand";
import { CtaBand } from "@/components/ui/CtaBand";

/**
 * The homepage runs the whole positioning in order: the problem, the four
 * pillars that answer it, the intelligence across them, the method, the full
 * capability breadth, the client side, the team, the security posture, the
 * packages and the journey itself.
 *
 * Title and description are inherited from the root layout defaults, which
 * already carry the homepage positioning line.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <ServicesStrip />
      <Problem />
      <Pillars />
      <DrT />
      <Diamond />
      <ImageBand />
      <Capabilities />
      <ClientExperience />
      <StatsBand />
      <RolesGrid />
      <ComplianceGrid />
      <PackagesTeaser />
      <HowItWorks />
      <JourneyFlow />
      <CtaBand
        title={
          <>
            See your practice through one complete{" "}
            <em className="italic text-green">client story</em>.
          </>
        }
        body="Bring your current workflow, your clinical services and the way you manage clients today. We'll show you how WIMS 360 can connect the journey from investigation to healing, from live data to communication, and from client engagement to practice growth. One platform. Every insight. Better outcomes."
        primary={{ label: "Book a demo", href: "/contact" }}
        secondary={{ label: "Explore the platform", href: "/platform" }}
        tertiary={{ label: "Build your configuration", href: "/build" }}
      />
    </>
  );
}
