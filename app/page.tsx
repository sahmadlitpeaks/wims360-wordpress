import { DrT } from "@/components/home/DrT";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { PackagesTeaser } from "@/components/home/PackagesTeaser";
import { Pillars } from "@/components/home/Pillars";
import { Problem } from "@/components/home/Problem";
import { CtaBand } from "@/components/ui/CtaBand";

/**
 * Seven sections, in the order a buyer actually asks the questions: what is it,
 * what's broken today, how the platform answers that, what the intelligence
 * adds, how you get started, what it costs to look at, and the next step.
 *
 * Depth deliberately lives elsewhere — the full module catalogue on /platform,
 * the AI detail on /ai, the posture on /security. The homepage is the narrative.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <Pillars />
      <DrT />
      <HowItWorks />
      <PackagesTeaser />
      <CtaBand
        title={
          <>
            See your practice as one complete{" "}
            <span className="text-teal-deep">client story</span>.
          </>
        }
        body="A 20-minute walkthrough against your own workflow. Bring one real client scenario and we'll show you the journey end to end."
        primary={{ label: "Book a demo", href: "/contact" }}
        secondary={{ label: "Build your configuration", href: "/build" }}
      />
    </>
  );
}
