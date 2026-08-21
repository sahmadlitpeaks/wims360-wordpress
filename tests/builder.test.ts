import { describe, expect, it } from "vitest";
import {
  CUSTOMIZATIONS,
  decodeState,
  dependencyNote,
  encodeState,
  initialState,
  recommendedPackage,
  toggleModule,
  toLeadConfiguration,
  type BuilderState,
} from "@/lib/builder";
import { MODULES } from "@/content/modules";
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

  it("pre-checks precision's modules, including ai", () => {
    const state = initialState("precision");
    const precision = PACKAGES.find((p) => p.id === "precision")!;

    expect(state.modules).toContain("ai");
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
    const next = toggleModule(state, "labs");
    expect(next.modules).toContain("labs");
  });

  it("removes a module that is present", () => {
    const state = initialState("clinical");
    const next = toggleModule(state, "labs");
    expect(next.modules).not.toContain("labs");
  });

  it("enabling ai also adds assessments when missing", () => {
    const state = initialState("essentials");
    expect(state.modules).not.toContain("assessments");

    const next = toggleModule(state, "ai");
    expect(next.modules).toContain("ai");
    expect(next.modules).toContain("assessments");
  });

  it("enabling ai does not duplicate assessments when already present", () => {
    const state = initialState("clinical");
    const next = toggleModule(state, "ai");
    const assessmentsCount = next.modules.filter(
      (m) => m === "assessments"
    ).length;

    expect(assessmentsCount).toBe(1);
  });

  it("removing assessments while ai is enabled also removes ai", () => {
    const state = initialState("precision");
    expect(state.modules).toContain("ai");
    expect(state.modules).toContain("assessments");

    const next = toggleModule(state, "assessments");
    expect(next.modules).not.toContain("assessments");
    expect(next.modules).not.toContain("ai");
  });

  it("removing assessments when ai is not enabled only removes assessments", () => {
    const state = initialState("clinical");
    const next = toggleModule(state, "assessments");
    expect(next.modules).not.toContain("assessments");
  });

  it("does not mutate the original state", () => {
    const state = initialState("essentials");
    const originalModules = [...state.modules];
    toggleModule(state, "labs");
    expect(state.modules).toEqual(originalModules);
  });
});

describe("dependencyNote", () => {
  it("explains the ai -> assessments dependency when enabling ai", () => {
    expect(dependencyNote("ai", true)).toBe(
      "Dr.T reads Chex data — we've added Assessments."
    );
  });

  it("returns null when disabling ai", () => {
    expect(dependencyNote("ai", false)).toBeNull();
  });

  it("returns a note when removing assessments cascades to removing ai", () => {
    expect(dependencyNote("assessments", false)).not.toBeNull();
    expect(typeof dependencyNote("assessments", false)).toBe("string");
  });

  it("returns null for modules with no dependency effect", () => {
    expect(dependencyNote("bookings", true)).toBeNull();
    expect(dependencyNote("labs", false)).toBeNull();
    expect(dependencyNote("assessments", true)).toBeNull();
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
      modules: ["bookings", "portal", "assessments", "labs", "crm", "ai"],
      integrations: ["Terra", "Stripe"],
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
