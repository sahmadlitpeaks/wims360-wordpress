import { INTEGRATION_SERVICES } from "@/content/integrations";
import {
  MODULES,
  SELECTABLE_MODULES,
  modulesByPillar,
  type Module,
  type ModuleId,
  type ModulePillar,
} from "@/content/modules";
import { PACKAGES, type PackageId } from "@/content/packages";
import { PILLARS } from "@/content/pillars";

export type OrgType =
  | "wellness-clinic"
  | "functional-medicine"
  | "lab"
  | "multi-center"
  | "other";

export type SiteBand = "1" | "2-3" | "4-10" | "10+";

export type PractitionerBand = "1-5" | "6-15" | "16-50" | "50+";

export interface BuilderState {
  step: 1 | 2 | 3 | 4 | 5;
  org: {
    type: OrgType | null;
    sites: SiteBand | null;
    practitioners: PractitionerBand | null;
    currentTools: string[];
  };
  modules: ModuleId[];
  integrations: string[];
  customizations: string[];
  otherSystems: string;
  notes: string;
}

/**
 * Optional add-on work a clinic may want alongside the standard packages.
 * Ids are stable identifiers used in `BuilderState.customizations` and
 * encoded into the shareable URL; labels are the human-readable copy shown
 * in the builder UI and the lead email.
 */
export const CUSTOMIZATIONS: { id: string; label: string }[] = [
  {
    id: "custom-chex",
    label: "Custom assessment forms for a protocol you already run on paper",
  },
  { id: "white-label", label: "White-label / embeddable wizards" },
  { id: "migration", label: "Data migration from your current tools" },
  { id: "custom-reports", label: "Custom report templates" },
  { id: "training", label: "Staff training" },
  { id: "hosting", label: "Specific hosting requirements" },
];

/**
 * One collapsible group of selectable modules in step 2. The four pillars in
 * their running order, then Intelligence — which sits across all four rather
 * than inside any one of them.
 */
export interface BuilderGroup {
  id: ModulePillar;
  /** '01'..'05' — the group's number in the running order. */
  number: string;
  name: string;
  /** The short promise line shown under the group name. */
  promise: string;
  /** Selectable modules only; the baseline is never togglable. */
  modules: Module[];
}

/**
 * Groups the 33 selectable modules for the builder's module step, so 33
 * checkboxes read as five short sections rather than one wall.
 */
export function builderGroups(): BuilderGroup[] {
  const pillarGroups: BuilderGroup[] = PILLARS.map((pillar) => ({
    id: pillar.id,
    number: pillar.number,
    name: pillar.name,
    promise: pillar.promise,
    modules: modulesByPillar(pillar.id).filter((module) => module.selectable),
  }));

  return [
    ...pillarGroups,
    {
      id: "intelligence",
      number: String(pillarGroups.length + 1).padStart(2, "0"),
      name: "Intelligence",
      promise: "Across the entire journey.",
      modules: modulesByPillar("intelligence").filter(
        (module) => module.selectable,
      ),
    },
  ];
}

const DEFAULT_START_PACKAGE: PackageId = "clinical";

export function packageModuleIds(id: PackageId): ModuleId[] {
  const pkg = PACKAGES.find((p) => p.id === id);
  return pkg ? [...pkg.moduleIds] : [];
}

/**
 * Builds the initial wizard state. With no argument, the builder starts
 * from Clinical's module set (the most common starting point) so the
 * modules step never opens empty.
 */
export function initialState(startPackage?: PackageId): BuilderState {
  return {
    step: 1,
    org: {
      type: null,
      sites: null,
      practitioners: null,
      currentTools: [],
    },
    modules: packageModuleIds(startPackage ?? DEFAULT_START_PACKAGE),
    integrations: [],
    customizations: [],
    otherSystems: "",
    notes: "",
  };
}

/**
 * Advisory package suggestion shown on Step 1 as the org fields are filled
 * in. Never authoritative — the clinician can still toggle any module by
 * hand in Step 2.
 */
export function recommendedPackage(org: BuilderState["org"]): PackageId {
  if (org.type === "lab" || org.type === "multi-center") {
    return "precision";
  }

  if (org.type === "functional-medicine") {
    return "clinical";
  }

  if (
    org.type === "wellness-clinic" &&
    org.sites === "1" &&
    org.practitioners === "1-5"
  ) {
    return "essentials";
  }

  return "clinical";
}

/**
 * Toggles a single module on or off, applying the one dependency rule the
 * builder enforces: Dr.T AI reads assessment data, so it cannot be enabled
 * without Assessment Forms, and dropping Assessment Forms while Dr.T is on
 * drops Dr.T too.
 */
export function toggleModule(state: BuilderState, id: ModuleId): BuilderState {
  const isEnabled = state.modules.includes(id);
  let modules: ModuleId[];

  if (isEnabled) {
    modules = state.modules.filter((moduleId) => moduleId !== id);

    if (id === "assessment-forms" && modules.includes("drt-ai")) {
      modules = modules.filter((moduleId) => moduleId !== "drt-ai");
    }
  } else {
    modules = [...state.modules, id];

    if (id === "drt-ai" && !modules.includes("assessment-forms")) {
      modules = [...modules, "assessment-forms"];
    }
  }

  return { ...state, modules };
}

/**
 * Friendly copy explaining a dependency side effect that just fired for
 * the module the clinician directly toggled. Returns null when toggling
 * `id` to `enabled` has no cascading effect on other modules.
 */
export function dependencyNote(id: ModuleId, enabled: boolean): string | null {
  if (id === "drt-ai" && enabled) {
    return "Dr.T reads assessment data — we've added Assessment Forms.";
  }

  if (id === "assessment-forms" && !enabled) {
    return "Dr.T AI depends on Assessment Forms — we've removed it too.";
  }

  return null;
}

function toBase64Url(input: string): string {
  const bytes = new TextEncoder().encode(input);
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function fromBase64Url(input: string): string {
  const base64 = input.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));

  return new TextDecoder().decode(bytes);
}

/**
 * Serializes builder state into a URL-safe base64 string so a
 * configuration can be shared as a query param (`?c=...`).
 */
export function encodeState(s: BuilderState): string {
  return toBase64Url(JSON.stringify(s));
}

const MODULE_IDS = new Set<ModuleId>(MODULES.map((m) => m.id));
const ORG_TYPES = new Set<OrgType>([
  "wellness-clinic",
  "functional-medicine",
  "lab",
  "multi-center",
  "other",
]);
const SITE_BANDS = new Set<SiteBand>(["1", "2-3", "4-10", "10+"]);
const PRACTITIONER_BANDS = new Set<PractitionerBand>([
  "1-5",
  "6-15",
  "16-50",
  "50+",
]);

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

/**
 * Validates that a parsed JSON value actually has the BuilderState shape,
 * rather than trusting whatever came back from an arbitrary URL.
 */
function isBuilderState(value: unknown): value is BuilderState {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  if (
    typeof candidate.step !== "number" ||
    !Number.isInteger(candidate.step) ||
    candidate.step < 1 ||
    candidate.step > 5
  ) {
    return false;
  }

  const org = candidate.org;
  if (typeof org !== "object" || org === null) {
    return false;
  }
  const orgCandidate = org as Record<string, unknown>;

  const typeValid =
    orgCandidate.type === null ||
    (typeof orgCandidate.type === "string" &&
      ORG_TYPES.has(orgCandidate.type as OrgType));
  const sitesValid =
    orgCandidate.sites === null ||
    (typeof orgCandidate.sites === "string" &&
      SITE_BANDS.has(orgCandidate.sites as SiteBand));
  const practitionersValid =
    orgCandidate.practitioners === null ||
    (typeof orgCandidate.practitioners === "string" &&
      PRACTITIONER_BANDS.has(orgCandidate.practitioners as PractitionerBand));

  if (
    !typeValid ||
    !sitesValid ||
    !practitionersValid ||
    !isStringArray(orgCandidate.currentTools)
  ) {
    return false;
  }

  // Shape only: a module id this build no longer knows about must not throw
  // away the whole shared configuration. `sanitizeState` drops it instead.
  if (!isStringArray(candidate.modules)) {
    return false;
  }

  if (!isStringArray(candidate.integrations)) {
    return false;
  }

  if (!isStringArray(candidate.customizations)) {
    return false;
  }

  if (
    typeof candidate.otherSystems !== "string" ||
    typeof candidate.notes !== "string"
  ) {
    return false;
  }

  return true;
}

/**
 * Inverse of `encodeState`. Returns null on any parse or shape failure so
 * callers can fall back to `initialState()` without a try/catch of their
 * own.
 */
export function decodeState(raw: string | null): BuilderState | null {
  if (!raw) {
    return null;
  }

  try {
    const json = fromBase64Url(raw);
    const parsed = JSON.parse(json) as unknown;

    return isBuilderState(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

const SELECTABLE_INTEGRATION_NAMES = new Set(
  INTEGRATION_SERVICES.filter((service) => service.builderSelectable).map(
    (service) => service.name,
  ),
);

const CUSTOMIZATION_IDS = new Set(CUSTOMIZATIONS.map((item) => item.id));

/**
 * Drops anything a shared link may carry that this build no longer knows
 * about — a module, connected service or customization that has since been
 * renamed or removed. `decodeState` validates shape; this validates
 * vocabulary, so a stale link still opens with everything we do recognise.
 */
export function sanitizeState(state: BuilderState): BuilderState {
  return {
    ...state,
    modules: state.modules.filter((id) => MODULE_IDS.has(id)),
    integrations: state.integrations.filter((name) =>
      SELECTABLE_INTEGRATION_NAMES.has(name),
    ),
    customizations: state.customizations.filter((id) =>
      CUSTOMIZATION_IDS.has(id),
    ),
  };
}

/** Selectable modules currently switched on, grouped for the summary rail. */
export function selectedCountsByGroup(
  state: BuilderState,
): { name: string; count: number }[] {
  const selected = new Set(state.modules);

  return builderGroups().map((group) => ({
    name: group.name,
    count: group.modules.filter((module) => selected.has(module.id)).length,
  }));
}

/** Total selectable modules switched on, baseline excluded. */
export function selectedSelectableCount(state: BuilderState): number {
  const selected = new Set(state.modules);

  return SELECTABLE_MODULES.filter((module) => selected.has(module.id)).length;
}

/**
 * Human-keyed summary of the configuration for the lead email / CRM
 * payload: module and customization ids are resolved to their display
 * names/labels so the summary reads naturally without a lookup table.
 */
export function toLeadConfiguration(s: BuilderState): object {
  const chosen = s.modules
    .map((id) => MODULES.find((m) => m.id === id))
    .filter((m): m is (typeof MODULES)[number] => Boolean(m));

  /* Baseline modules ship with every package, so listing them beside the
     customer's selections would inflate the count they saw while choosing. */
  const moduleNames = chosen.filter((m) => m.selectable).map((m) => m.name);
  const alwaysIncluded = chosen.filter((m) => !m.selectable).map((m) => m.name);

  const customizationLabels = s.customizations
    .map((id) => CUSTOMIZATIONS.find((c) => c.id === id)?.label)
    .filter((label): label is string => Boolean(label));

  return {
    organization: {
      type: s.org.type,
      sites: s.org.sites,
      practitioners: s.org.practitioners,
      currentTools: s.org.currentTools,
    },
    modules: moduleNames,
    alwaysIncluded,
    integrations: s.integrations,
    customizations: customizationLabels,
    otherSystems: s.otherSystems,
    notes: s.notes,
  };
}
