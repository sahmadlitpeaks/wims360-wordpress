import {
  Citation,
  ClientBadge,
  MOCK_LABEL,
  MockFrame,
} from "@/components/mocks/parts";

/**
 * Sources Dr.T names when it answers. Each one is the KIND of information it
 * read — an assessment, a laboratory panel, a wearable stream — with the date
 * or window it covers. Never the supplier behind the connection.
 */
const CITATIONS = [
  "Assessment · 12 Mar",
  "Laboratory panel · 04 Apr",
  "Wearable · 28-day stream",
];

/**
 * Dr.T Copilot answering a practitioner's question about one client: the
 * question, the drafted answer, the sources it cites, and the line that says
 * nothing has been saved. The citation pattern is the point of the mock.
 */
export function CopilotChat() {
  return (
    <MockFrame label="Dr.T Copilot answering a practitioner's question about a client, citing the assessment, laboratory panel and wearable stream it read, with the answer held as a draft for professional review">
      <div
        className="flex items-center justify-between gap-3 border-b border-line px-[22px] py-[18px]"
        style={{ background: "linear-gradient(to bottom,#fff,#FBFAF6)" }}
      >
        <ClientBadge note="Case review · 20 Apr" />
        <span className="shrink-0 font-mono text-[9.5px] uppercase tracking-[0.16em] text-brass-deep">
          Dr.T Copilot
        </span>
      </div>

      <div className="px-[22px] py-6">
        <p className={MOCK_LABEL}>Practitioner</p>
        <p className="mt-3 border-l border-line pl-4 text-[15px] leading-[1.75] text-ink">
          Recovery has been drifting since March. What in her record moves in
          the same direction?
        </p>
      </div>

      <div className="border-t border-line bg-[#FBFAF6] px-[22px] py-6">
        <p className={MOCK_LABEL}>Dr.T · reading the client record</p>
        <p className="mt-3 text-[15px] leading-[1.8] text-muted">
          Three sources move together from the second week of March. Perceived
          stress rose in the March assessment, the April panel shows the same
          direction of travel, and sleep duration in the wearable stream has
          shortened over the same window. Worth reviewing together before the
          next appointment.
        </p>
      </div>

      <figcaption className="border-t border-line bg-green-deep p-[22px]">
        <span className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className="inline-block h-1 w-1 shrink-0 rounded-full bg-brass"
          />
          <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-brass">
            Cited from the client record
          </span>
        </span>
        <span className="mt-3.5 flex flex-wrap gap-2">
          {CITATIONS.map((citation) => (
            <Citation key={citation}>{citation}</Citation>
          ))}
        </span>
        <p className="mt-[18px] font-mono text-[9.5px] uppercase leading-[1.8] tracking-[0.14em] text-[rgba(242,239,230,.5)]">
          Draft only · nothing is saved to the record until a practitioner
          approves it
        </p>
      </figcaption>
    </MockFrame>
  );
}

export default CopilotChat;
