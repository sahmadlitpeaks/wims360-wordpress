import Image from "next/image";
import { cn } from "@/lib/cn";

/** Which edge the green-deep gradient falls from, matching the artboards. */
export type ImageSlotOverlay = "left" | "top" | "none";

export type ImageSlotProps = {
  /** Describes the intended shot, e.g. "Clinic portrait — practitioner with client". */
  caption: string;
  /**
   * File name inside `/public/images` once the real asset exists, e.g.
   * "contact-warm-light.png". While absent the slot renders its placeholder,
   * so the layout is identical before and after the photography lands.
   */
  src?: string;
  overlay?: ImageSlotOverlay;
  className?: string;
};

const OVERLAYS: Record<ImageSlotOverlay, string | null> = {
  left: "linear-gradient(to right,var(--green-deep) 0%,rgba(7,41,30,.55) 26%,rgba(7,41,30,.06) 62%)",
  top: "linear-gradient(to bottom,var(--green-deep) 0%,rgba(7,41,30,.45) 34%,rgba(7,41,30,.05) 72%)",
  none: null,
};

/**
 * Placeholder for photography the site does not have yet: a green-deep block
 * with a soft radial wash and the intended shot named in mono caps. Swap for a
 * real `<Image>` once assets land.
 */
export function ImageSlot({
  caption,
  src,
  overlay = "none",
  className,
}: ImageSlotProps) {
  const gradient = OVERLAYS[overlay];

  return (
    <div
      role="img"
      aria-label={caption}
      className={cn(
        "relative isolate flex min-h-[240px] items-center justify-center overflow-hidden bg-green-deep",
        className,
      )}
    >
      {src ? (
        src.endsWith(".svg") ? (
          /* Decorative vector art: a plain <img> keeps it un-rasterised. */
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`/images/${src}`}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <Image
            src={`/images/${src}`}
            alt=""
            fill
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="object-cover"
          />
        )
      ) : (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 90% at 30% 12%,rgba(14,107,78,.42),transparent 64%)",
          }}
        />
      )}
      {gradient ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background: gradient }}
        />
      ) : null}
      {src ? null : (
        <span className="relative z-10 max-w-[26ch] px-8 text-center font-semibold text-[12px] uppercase leading-[1.9] tracking-[0.06em] text-[rgba(242,239,230,.5)]">
          {caption}
        </span>
      )}
    </div>
  );
}

export default ImageSlot;
