import { MOCK_LABEL, MockFrame } from "@/components/mocks/parts";

type Slot = {
  time: string;
  title: string;
  meta: string;
  /** The booking that belongs to the client the rest of the mocks follow. */
  highlight?: boolean;
};

const SLOTS: Slot[] = [
  {
    time: "09:00",
    title: "Consultation · Room 2",
    meta: "Dr. Amina · 45 min",
  },
  {
    time: "10:30",
    title: "VO₂ Max examination · Lab",
    meta: "Sarah L. · analyser reserved",
    highlight: true,
  },
  {
    time: "12:00",
    title: "Therapy session · Room 4",
    meta: "Session 3 of 6 · credits applied",
  },
  {
    time: "14:15",
    title: "Online booking · new enquiry",
    meta: "From the website · assigned to client care",
  },
];

/**
 * The practice day as the calendar holds it: rooms, services and the
 * practitioner qualified to run the appointment, with the reminder that will
 * go out attached to the booking rather than to somebody's memory.
 */
export function BookingCalendar() {
  return (
    <MockFrame label="A WIMS 360 practice calendar for one day showing four bookings with their rooms, practitioners and services, and the reminder queued against them">
      <div
        className="flex items-center justify-between gap-3 border-b border-line px-[22px] py-[18px]"
        style={{ background: "linear-gradient(to bottom,#fff,#FBFAF6)" }}
      >
        <span className="min-w-0">
          <span className="block truncate font-display text-[17px] leading-[1.2] text-ink">
            Thursday 24 April
          </span>
          <span className={`block truncate ${MOCK_LABEL}`}>
            Practitioners · rooms · services
          </span>
        </span>
        <span className="shrink-0 border border-line px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-green">
          Online booking on
        </span>
      </div>

      <ul className="list-none">
        {SLOTS.map((slot) => (
          <li
            key={slot.time}
            className={`grid grid-cols-[54px_minmax(0,1fr)] gap-4 border-b border-line px-[22px] py-4 ${
              slot.highlight ? "bg-green-soft" : ""
            }`}
          >
            <span className="font-mono text-[11px] tracking-[0.06em] text-brass-deep">
              {slot.time}
            </span>
            <span className="min-w-0">
              <span
                className={`block font-display text-[17px] leading-[1.3] ${
                  slot.highlight ? "text-green-deep" : "text-ink"
                }`}
              >
                {slot.title}
              </span>
              <span className="mt-1 block text-[12.5px] leading-[1.6] text-muted">
                {slot.meta}
              </span>
            </span>
          </li>
        ))}
      </ul>

      <figcaption className="flex flex-wrap items-center justify-between gap-3 px-[22px] py-4">
        <span className={MOCK_LABEL}>Reminder queued · 24h before</span>
        <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-brass-deep">
          Email · SMS · WhatsApp where enabled
        </span>
      </figcaption>
    </MockFrame>
  );
}

export default BookingCalendar;
