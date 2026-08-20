import { Dot, FIGURE_CLASS, MockFrame, MockHeader, MonoLabel } from "./parts";

const DAY_HEADS = ["M", "T", "W", "T", "F", "S", "S"];

type Day = {
  date: number;
  count?: number;
  today?: boolean;
};

/** Three weeks of April, Monday-first. */
const DAYS: Day[] = [
  { date: 1 },
  { date: 2 },
  { date: 3, count: 3 },
  { date: 4 },
  { date: 5, count: 5 },
  { date: 6 },
  { date: 7 },
  { date: 8 },
  { date: 9, count: 8 },
  { date: 10 },
  { date: 11 },
  { date: 12, count: 2 },
  { date: 13 },
  { date: 14 },
  { date: 15 },
  { date: 16, count: 4, today: true },
  { date: 17 },
  { date: 18 },
  { date: 19, count: 6 },
  { date: 20 },
  { date: 21 },
];

/** Clinic booking grid: three weeks, per-day booking counts, today ringed. */
export function BookingCalendar() {
  return (
    <MockFrame label="The WIMS 360 booking calendar showing three weeks of April with the number of bookings on each day and today highlighted">
      <div className="flex min-h-[440px] flex-col">
        <MockHeader>
          <span className="text-[0.8125rem] font-semibold leading-4 text-ink">
            Bookings · April
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 text-[0.6875rem] leading-4 text-muted">
            <Dot tone="muted" />
            Dubai Science Park
          </span>
        </MockHeader>

        <div className="px-4 pt-4">
          <div className="grid grid-cols-7 gap-1">
            {DAY_HEADS.map((day, index) => (
              <MonoLabel
                key={`${day}-${index}`}
                className="block py-1 text-center"
              >
                {day}
              </MonoLabel>
            ))}
          </div>

          <ul className="mt-1 grid grid-cols-7 gap-1">
            {DAYS.map((day) => (
              <li
                key={day.date}
                className={`flex min-h-[3rem] flex-col items-start justify-between rounded-lg border p-1 sm:p-1.5 ${
                  day.today
                    ? "border-green bg-green-soft"
                    : "border-line bg-surface"
                }`}
              >
                <span
                  className={`text-[0.625rem] leading-4 ${FIGURE_CLASS} ${
                    day.today ? "font-semibold text-green-deep" : "text-muted"
                  }`}
                >
                  {day.date}
                </span>
                {day.count ? (
                  <span
                    className={`inline-flex min-w-[1.125rem] justify-center rounded-full px-1 py-0.5 text-[0.625rem] leading-3 ${FIGURE_CLASS} ${
                      day.today
                        ? "bg-green-deep text-white"
                        : "bg-green-soft text-green-deep"
                    }`}
                  >
                    {day.count}
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-line px-4 py-3">
          <span className="inline-flex items-center gap-1.5">
            <span
              aria-hidden="true"
              className="h-2.5 w-2.5 rounded-[3px] border border-green bg-green-soft"
            />
            <MonoLabel>Today</MonoLabel>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span
              aria-hidden="true"
              className="h-2.5 w-2.5 rounded-[3px] bg-green-deep"
            />
            <MonoLabel>Bookings</MonoLabel>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span
              aria-hidden="true"
              className="h-2.5 w-2.5 rounded-[3px] border border-line bg-surface"
            />
            <MonoLabel>Open</MonoLabel>
          </span>
        </div>
      </div>
    </MockFrame>
  );
}

export default BookingCalendar;
