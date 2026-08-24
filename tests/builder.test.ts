import { describe, expect, it } from "vitest";
import {
  builderGroups,
  CUSTOMIZATIONS,
  decodeState,
  dependencyNote,
  encodeState,
  initialState,
  recommendedPackage,
  sanitizeState,
  toggleModule,
  toLeadConfiguration,
  type BuilderState,
} from "@/lib/builder";
import {
  BASELINE_MODULES,
  MODULES,
  SELECTABLE_MODULES,
  type ModuleId,
} from "@/content/modules";
import { INTEGRATION_SERVICES } from "@/content/integrations";
import { PACKAGES } from "@/content/packages";

describe("initialState", () => {
  it("defaults to clinical's modules, step 1, and empty org fields when no package given", () => {
    const state = initialState();
    const clinical = PACKAGES.find((p) => p.id === "clinical")!;

    expect(state.step).toBe(1);
    expect(state.modules).toEqual(clinical.moduleIds);
    expect(state.org).toEqual({
      type: null,
      sites: null,
      practitioners: null,
      currentTools: [],
    });
    expect(state.integrations).toEqual([]);
    expect(state.customizations).toEqual([]);
    expect(state.otherSystems).toBe("");
    expect(state.notes).toBe("");
  });

  it("pre-checks the modules for an explicit starting package", () => {
    const state = initialState("essentials");
    const essentials = PACKAGES.find((p) => p.id === "essentials")!;

    expect(state.modules).toEqual(essentials.moduleIds);
    expect(state.step).toBe(1);
  });

  it("pre-checks precision's modules, including drt-ai", () => {
    const state = initialState("precision");
    const precision = PACKAGES.find((p) => p.id === "precision")!;

    expect(state.modules).toContain("drt-ai");
    expect(state.modules).toEqual(precision.moduleIds);
  });
});

describe("recommendedPackage", () => {
  const baseOrg: BuilderState["org"] = {
    type: null,
    sites: null,
    practitioners: null,
    currentTools: [],
  };

  it("recommends precision for a lab", () => {
    expect(recommendedPackage({ ...baseOrg, type: "lab" })).toBe("precision");
  });

  it("recommends precision for a multi-center organization", () => {
    expect(recommendedPackage({ ...baseOrg, type: "multi-center" })).toBe(
      "precision"
    );
  });

  it("recommends clinical for functional medicine", () => {
    expect(
      recommendedPackage({ ...baseOrg, type: "functional-medicine" })
    ).toBe("clinical");
  });

  it("recommends essentials for a single-site wellness clinic with 1-5 practitioners", () => {
    expect(
      recommendedPackage({
        ...baseOrg,
        type: "wellness-clinic",
        sites: "1",
        practitioners: "1-5",
      })
    ).toBe("essentials");
  });

  it("recommends clinical for a wellness clinic with more than one site", () => {
    expect(
      recommendedPackage({
        ...baseOrg,
        type: "wellness-clinic",
        sites: "2-3",
        practitioners: "1-5",
      })
    ).toBe("clinical");
  });

  it("recommends clinical for a wellness clinic with a larger practitioner band", () => {
    expect(
      recommendedPackage({
        ...baseOrg,
        type: "wellness-clinic",
        sites: "1",
        practitioners: "6-15",
      })
    ).toBe("clinical");
  });

  it("falls back to clinical for 'other' org types", () => {
    expect(recommendedPackage({ ...baseOrg, type: "other" })).toBe(
      "clinical"
    );
  });

  it("falls back to clinical when nothing is selected yet", () => {
    expect(recommendedPackage(baseOrg)).toBe("clinical");
  });
});

describe("toggleModule", () => {
  it("adds a module that is not present", () => {
    const state = initialState("essentials");
    const next = toggleModule(state, "lab-orders");
    expect(next.modules).toContain("lab-orders");
  });

  it("removes a module that is present", () => {
    const state = initialState("clinical");
    const next = toggleModule(state, "lab-orders");
    expect(next.modules).not.toContain("lab-orders");
  });

  it("enabling drt-ai also adds assessment-forms when missing", () => {
    const base = initialState("essentials");
    const state: BuilderState = {
      ...base,
      modules: base.modules.filter((id) => id !== "assessment-forms"),
    };
    expect(state.modules).not.toContain("assessment-forms");

    const next = toggleModule(state, "drt-ai");
    expect(next.modules).toContain("drt-ai");
    expect(next.modules).toContain("assessment-forms");
  });

  it("enabling drt-ai does not duplicate assessment-forms when already present", () => {
    const state = initialState("clinical");
    const next = toggleModule(state, "drt-ai");
    const assessmentsCount = next.modules.filter(
      (m) => m === "assessment-forms"
    ).length;

    expect(assessmentsCount).toBe(1);
  });

  it("removing assessment-forms while drt-ai is enabled also removes drt-ai", () => {
    const state = initialState("precision");
    expect(state.modules).toContain("drt-ai");
    expect(state.modules).toContain("assessment-forms");

    const next = toggleModule(state, "assessment-forms");
    expect(next.modules).not.toContain("assessment-forms");
    expect(next.modules).not.toContain("drt-ai");
  });

  it("removing assessment-forms when drt-ai is not enabled only removes assessment-forms", () => {
    const state = initialState("clinical");
    const next = toggleModule(state, "assessment-forms");
    expect(next.modules).not.toContain("assessment-forms");
  });

  it("does not mutate the original state", () => {
    const state = initialState("essentials");
    const originalModules = [...state.modules];
    toggleModule(state, "lab-orders");
    expect(state.modules).toEqual(originalModules);
  });
});

describe("dependencyNote", () => {
  it("explains the drt-ai -> assessment-forms dependency when enabling drt-ai", () => {
    expect(dependencyNote("drt-ai", true)).toBe(
      "Dr.T reads assessment data — we've added Assessment Forms."
    );
  });

  it("returns null when disabling drt-ai", () => {
    expect(dependencyNote("drt-ai", false)).toBeNull();
  });

  it("returns a note when removing assessment-forms cascades to removing drt-ai", () => {
    expect(dependencyNote("assessment-forms", false)).not.toBeNull();
    expect(typeof dependencyNote("assessment-forms", false)).toBe("string");
  });

  it("returns null for modules with no dependency effect", () => {
    expect(dependencyNote("bookings", true)).toBeNull();
    expect(dependencyNote("lab-orders", false)).toBeNull();
    expect(dependencyNote("assessment-forms", true)).toBeNull();
  });
});

describe("encodeState / decodeState", () => {
  it("round-trips a default state", () => {
    const state = initialState();
    const decoded = decodeState(encodeState(state));
    expect(decoded).toEqual(state);
  });

  it("round-trips a fully populated state", () => {
    const state: BuilderState = {
      step: 4,
      org: {
        type: "multi-center",
        sites: "4-10",
        practitioners: "16-50",
        currentTools: ["Spreadsheets", "Calendly"],
      },
      modules: [
        "bookings",
        "client-portal",
        "assessment-forms",
        "lab-orders",
        "crm",
        "drt-ai",
      ],
      integrations: ["Wearables & Connected Health", "Payments"],
      customizations: ["custom-chex", "training"],
      otherSystems: "An in-house CRM",
      notes: "Please call after 3pm.",
    };

    const decoded = decodeState(encodeState(state));
    expect(decoded).toEqual(state);
  });

  it("produces a URL-safe base64 string (no +, / or = characters)", () => {
    const encoded = encodeState(initialState());
    expect(encoded).not.toMatch(/[+/=]/);
  });

  it("returns null for garbage input", () => {
    expect(decodeState("garbage")).toBeNull();
  });

  it("returns null for null input", () => {
    expect(decodeState(null)).toBeNull();
  });

  it("returns null for an empty string", () => {
    expect(decodeState("")).toBeNull();
  });

  it("returns null for well-formed base64url JSON that isn't a builder state shape", () => {
    const encoded = encodeState({ foo: "bar" } as unknown as BuilderState);
    expect(decodeState(encoded)).toBeNull();
  });
});

describe("toLeadConfiguration", () => {
  it("includes org bands and human-readable module names", () => {
    const state = initialState("clinical");
    state.org.type = "functional-medicine";
    state.org.sites = "2-3";
    state.org.practitioners = "6-15";

    const config = toLeadConfiguration(state);
    const configJson = JSON.stringify(config);

    expect(configJson).toContain("2-3");
    expect(configJson).toContain("6-15");
    expect(configJson).toContain("functional-medicine");

    for (const id of state.modules) {
      const module = MODULES.find((m) => m.id === id)!;
      expect(configJson).toContain(module.name);
    }
  });

  it("includes customization labels rather than raw ids", () => {
    const state = initialState("clinical");
    state.customizations = ["custom-chex"];

    const configJson = JSON.stringify(toLeadConfiguration(state));
    const label = CUSTOMIZATIONS.find((c) => c.id === "custom-chex")!.label;

    expect(configJson).toContain(label);
  });
});

describe("builderGroups", () => {
  const groups = builderGroups();

  it("returns the four pillars in order, then Intelligence", () => {
    expect(groups.map((group) => group.id)).toEqual([
      "investigations",
      "healing",
      "live",
      "communication",
      "intelligence",
    ]);
    expect(groups.map((group) => group.number)).toEqual([
      "01",
      "02",
      "03",
      "04",
      "05",
    ]);
  });

  it("covers every selectable module exactly once and no baseline module", () => {
    const grouped = groups.flatMap((group) => group.modules.map((m) => m.id));

    expect(grouped).toHaveLength(SELECTABLE_MODULES.length);
    expect(new Set(grouped).size).toBe(SELECTABLE_MODULES.length);

    for (const module of SELECTABLE_MODULES) {
      expect(grouped).toContain(module.id);
    }

    for (const module of BASELINE_MODULES) {
      expect(grouped).not.toContain(module.id);
    }
  });

  it("keeps every module inside the group matching its pillar", () => {
    for (const group of groups) {
      for (const module of group.modules) {
        expect(module.pillar).toBe(group.id);
        expect(module.selectable).toBe(true);
      }
    }
  });
});

describe("sanitizeState", () => {
  it("drops module ids this build does not know about", () => {
    const base = initialState("essentials");
    const state: BuilderState = {
      ...base,
      modules: [...base.modules, "not-a-real-module" as ModuleId],
    };

    const clean = sanitizeState(state);

    expect(clean.modules).not.toContain("not-a-real-module");
    expect(clean.modules).toEqual(base.modules);
  });

  it("keeps every known module id, baseline included", () => {
    const state = initialState("precision");
    expect(sanitizeState(state).modules).toEqual(state.modules);
  });

  it("drops connected services and customizations it does not recognise", () => {
    const known = INTEGRATION_SERVICES.find((s) => s.builderSelectable)!.name;
    const state: BuilderState = {
      ...initialState("clinical"),
      integrations: [known, "A Vendor We Removed"],
      customizations: ["training", "no-such-customization"],
    };

    const clean = sanitizeState(state);

    expect(clean.integrations).toEqual([known]);
    expect(clean.customizations).toEqual(["training"]);
  });

  it("survives a decode of a link carrying an unknown module id", () => {
    const base = initialState("clinical");
    const encoded = encodeState({
      ...base,
      modules: [...base.modules, "legacy-module" as ModuleId],
    });

    const decoded = decodeState(encoded);
    expect(decoded).not.toBeNull();
    expect(sanitizeState(decoded!).modules).toEqual(base.modules);
  });
});

describe("toLeadConfiguration — baseline split", () => {
  it("lists always-included modules separately from the customer's selections", () => {
    const state = initialState("clinical");
    const config = toLeadConfiguration(state) as {
      modules: string[];
      alwaysIncluded: string[];
    };

    const baselineNames = MODULES.filter((m) => !m.selectable).map((m) => m.name);
    const selectableNames = MODULES.filter((m) => m.selectable).map((m) => m.name);

    // Baseline modules appear only under alwaysIncluded.
    for (const name of baselineNames) {
      expect(config.alwaysIncluded).toContain(name);
      expect(config.modules).not.toContain(name);
    }

    // Every listed selection is a genuinely selectable module.
    for (const name of config.modules) {
      expect(selectableNames).toContain(name);
    }

    expect(config.alwaysIncluded.length).toBe(baselineNames.length);
  });
});
