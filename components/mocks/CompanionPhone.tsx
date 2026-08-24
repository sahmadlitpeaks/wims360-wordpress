const PLAN_ITEMS = [
  { label: "Morning", body: "Protein-forward breakfast · water before coffee" },
  { label: "Midday", body: "20-minute walk logged from your phone" },
  { label: "Evening", body: "Screens down 45 minutes before bed" },
];

const TABS = ["Today", "Plan", "Results", "Messages"];

/**
 * The client side, on a phone: today's plan, the meal log, a message from the
 * care team and the Wellness Companion nudge — all inside the frame the client
 * actually opens. Prop-less server component rendering a fixed scene.
 */
export function CompanionPhone() {
  return (
    <figure
      aria-label="WIMS 360 client app showing today's healing plan, a meal log, a message from the care team and a Wellness Companion prompt"
      className="relative m-0 mx-auto w-full max-w-[300px] border border-line bg-surface p-2.5 shadow-[0_40px_80px_-32px_rgba(20,30,26,.28),0_8px_20px_-10px_rgba(20,30,26,.12)]"
    >
      <div className="border border-line bg-bg">
        <div className="flex items-center justify-between gap-2 border-b border-line bg-green-deep px-4 py-3.5">
          <span className="font-display text-[15px] leading-none text-paper">
            Sarah L.
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-brass">
            Week 6
          </span>
        </div>

        <div className="flex border-b border-line">
          {TABS.map((tab, index) => (
            <span
              key={tab}
              className={`flex-1 px-1 py-2.5 text-center font-mono text-[8px] uppercase tracking-[0.1em] ${
                index === 0
                  ? "border-b border-brass text-green-deep"
                  : "text-muted"
              }`}
            >
              {tab}
            </span>
          ))}
        </div>

        <ul className="list-none bg-surface">
          {PLAN_ITEMS.map((item) => (
            <li key={item.label} className="border-b border-line px-4 py-3.5">
              <span className="block font-mono text-[8.5px] uppercase tracking-[0.16em] text-brass-deep">
                {item.label}
              </span>
              <span className="mt-1.5 block text-[12.5px] leading-[1.6] text-ink">
                {item.body}
              </span>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between gap-3 border-b border-line bg-surface px-4 py-3.5">
          <span className="font-mono text-[8.5px] uppercase tracking-[0.16em] text-muted">
            Log a meal
          </span>
          <span className="border border-line px-2.5 py-1 font-mono text-[8.5px] uppercase tracking-[0.14em] text-green">
            Photo
          </span>
        </div>

        <div className="border-b border-line bg-green-soft px-4 py-3.5">
          <span className="block font-mono text-[8.5px] uppercase tracking-[0.16em] text-green">
            Care team · secure message
          </span>
          <span className="mt-1.5 block text-[12.5px] leading-[1.6] text-green-deep">
            Your April results are shared — we&apos;ll walk through them on
            Thursday.
          </span>
        </div>

        <div className="px-4 py-3.5">
          <span className="block font-mono text-[8.5px] uppercase tracking-[0.16em] text-brass-deep">
            Wellness Companion
          </span>
          <span className="mt-1.5 block text-[12.5px] leading-[1.6] text-muted">
            Two habits left today. Anything about your plan you&apos;d like
            explained?
          </span>
        </div>
      </div>

      <figcaption className="px-1 pb-1 pt-3 text-center font-mono text-[8.5px] uppercase leading-[1.8] tracking-[0.14em] text-muted">
        Shared by the care team · consent active
      </figcaption>
    </figure>
  );
}

export default CompanionPhone;
