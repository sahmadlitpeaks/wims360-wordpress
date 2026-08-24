import { ImageSlot } from "@/components/ui/ImageSlot";

/**
 * Full-bleed breather between the record and the four pillars: a wide clinic
 * interior with the one-record line sitting in the gradient at the bottom.
 */
export function ImageBand() {
  return (
    <section className="relative h-[380px] overflow-hidden bg-green-deep md:h-[420px]">
      <ImageSlot
        caption="Wide practice interior — consultation room, warm light"
        src="band-connected-record.svg"
        /* Bottom padding lifts the placeholder caption clear of the overlay copy. */
        className="absolute inset-0 h-full w-full pb-40 md:pb-44"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to top,rgba(7,41,30,.92) 0%,rgba(7,41,30,.35) 55%,rgba(7,41,30,.15) 100%)",
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0">
        <div className="container-site pb-10 md:pb-14">
          <p className="max-w-[760px] font-display text-[clamp(1.6rem,3.6vw,38px)] leading-[1.24] text-paper [text-wrap:pretty]">
            Everything comes together around one complete client story.
          </p>
          <p className="mt-[18px] font-mono text-[10.5px] uppercase leading-[1.7] tracking-[0.2em] text-brass">
            Modules switch on per package — the connected record underneath
            stays the same
          </p>
        </div>
      </div>
    </section>
  );
}

export default ImageBand;
