# WIMS 360 — Section image assets (spec)

Five background images. The site's headings and body copy are real HTML rendered
ON TOP of these, so **no text, logos or UI labels may be baked into the image**.
Anything written in the picture would duplicate the live text and cannot be
selected, translated, indexed by search engines or read by a screen reader.

Deliver as PNG (photographs may be JPG/WebP). Sizes below are the minimum;
double them if a retina-sharp result is wanted.

| # | File name | Section it fills | Size (min) | Ratio | Notes |
|---|---|---|---|---|---|
| 1 | `band-connected-record.png` | "Everything comes together around one complete client story" | 2400 x 840 | ~2.85:1 | Full-bleed behind the copy. The dark particle / wave field. Must stay dark and low-contrast on the LEFT half — headline sits there over it. |
| 2 | `platform-consultation-room.png` | "One client. One connected journey." (platform hero) | 1600 x 1120 | ~1.43:1 | The consultation room with the wall screen. Sits in the right column; the left ~30% is covered by a green gradient, so keep the subject right-of-centre. |
| 3 | `ecosystem-diagram.png` | "One platform. Your ecosystem." | 1600 x 900 | ~1.78:1 | The connected-services diagram. **Transparent background** (or the parchment `#F2EFE6`) — it sits on the light ground. No service labels baked in if avoidable; if labels are needed they must match the live list exactly. |
| 4 | `security-shield.png` | "Built into the platform." | 1600 x 900 | ~1.78:1 | The shield illustration. **Transparent background** or the deep green `#07291E` — it sits on the dark ground. |
| 5 | `contact-warm-light.png` | "See your practice through one complete client story" | 1600 x 900 | ~1.78:1 | The plant / warm-light photograph. Soft and out of focus; it sits beside the closing copy. |

## Palette to match
parchment `#F2EFE6` · deep green `#07291E` · mid green `#0C4633` · accent green
`#0E6B4E` · brass `#B08444`. Warm, calm, clinical. No blue-tinted "sci-fi" treatments.

## Also avoid
- Any lettering, including watermarks and UI chrome.
- Third-party supplier names or logos (Terra, OpenAI, Twilio and the rest are
  never shown). Device ecosystems — Apple Health, Samsung Health, Fitbit — are
  allowed if a device is pictured.
- Anything that reads as a real screenshot of the product with real client data.

## Dropping them in
Save into `public/images/` using the file names above. `ImageSlot` already accepts
an optional `src`, so each slot becomes a one-line change and the layout is
already proven by the placeholders.
